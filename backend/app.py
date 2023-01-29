#!/usr/bin/env python3

from flask import Flask, request, jsonify, abort
import json
from flask_pymongo import PyMongo
from datetime import datetime
from schemas import Thread, Post, User
from bson import json_util, ObjectId

app = Flask("Forum")
app.config["MONGO_URI"] = "mongodb://localhost:27017/forum"
mongo = PyMongo(app)

users = mongo.db.users
threads = mongo.db.threads
posts = mongo.db.posts


# data must be a dictionary 
def flatten_ids_dates(data):
    if not isinstance(data, dict):
        raise ValueError("Data must be a dictionary")
    for x in data: # iterating through keys of a dictionary
        if isinstance(data[x], dict):
            if "$oid" in data[x]:
                data[x] = data[x]["$oid"]
            elif "$date" in data[x]:
                data[x] = data[x]["$date"]

# cleans up dates and ids
def to_json(data):
    out = json.loads(json_util.dumps(data, default=json_util.default))
    if isinstance(out, list):
        for x in out:
            flatten_ids_dates(x)
    if isinstance(out, dict):
        flatten_ids_dates(out)
    return out

def set_creator_info(data):
    data["creator"] = to_json(users.find_one({"_id": ObjectId(data["creatorID"])}))
    del data["creatorID"]
    if "threadID" in data:
        del data["threadID"]
    return data

def corsify(res_data):
    res = jsonify(res_data)
    res.headers.add('Access-Control-Allow-Origin', '*')
    res.headers.add("Access-Control-Allow-Credentials", "true")
    return res

# body data required: username
# returns a user object
@app.route("/createAccount", methods=["POST"])
def create_account():
    data = json.loads(request.data)
    user_dict = {"username": data["username"], "joined": datetime.now()}
    user_obj = User(**user_dict)
    users.insert_one(user_obj.__dict__)
    return corsify(to_json(user_obj.__dict__))


@app.route("/userInfo/<id>", methods=["GET"])
def user_info(id):
    user = users.find_one({"_id": ObjectId(id)})
    if user == None:
        abort(404)
    return corsify(to_json(user))

@app.route("/changeUsername", methods=["PUT"])
def change_username():
    data = json.loads(request.data)
    old_user = users.find_one({"_id": ObjectId(data["_id"])})
    if old_user == None:
        abort(404)
    users.update_one({"_id": ObjectId(data["_id"])}, {"$set": {"username": data["username"]}})
    return corsify({"success": True})


# body data required: creatorID, category, title
# returns a thread object 
@app.route("/createThread", methods=["POST"])
def create_thread():
    data = json.loads(request.data)
    needed_keys = ["creatorID", "category", "title"]
    dict_thread = {
        **{x:data[x] for x in needed_keys},
        "creationTimestamp": datetime.now(),
        "posts": 0
    }
    new_thread = Thread(**dict_thread)
    threads.insert_one(new_thread.__dict__)
    return corsify(to_json(set_creator_info(new_thread.__dict__)))

@app.route("/getAllThreads/", methods=["GET"])
@app.route("/getAllThreads/<category>", methods=["GET"])
def get_all_threads(category=""):
    thread_list = []
    if category.lower() == "all" or category == "":
        thread_list = to_json(threads.find())
    else:
        thread_list = to_json(threads.find({"category": category}))
    for thread in thread_list:
        set_creator_info(thread)
    return corsify({"threads": thread_list})

@app.route("/listCategories", methods=["GET"])
def list_categories():
    cats = threads.distinct("category")
    return corsify({"categories": cats})
   
@app.route("/getAllPosts/<thread>", methods=["GET"])
def get_all_posts(thread):
    post_list = to_json(posts.find({"threadID": ObjectId(thread)}))
    for post in post_list:
        set_creator_info(post)
    return corsify({"posts": post_list})

# body data required: creatorID, content
# returns a post object
@app.route("/reply/<thread>", methods=["POST"])
def post_on_thread(thread):
    data = json.loads(request.data)
    needed_keys = ["creatorID", "content"]
    dict_post = {
        "threadID": ObjectId(thread),
        "creationTimestamp": datetime.now(),  
        **{x:data[x] for x in needed_keys},
    }
    new_post = Post(**dict_post)
    posts.insert_one(new_post.__dict__)
    old_post_count = threads.find_one({"_id": ObjectId(thread)})["posts"]
    threads.update_one({"_id": ObjectId(thread)}, 
        {"$set": {"posts": old_post_count + 1, "lastPost": new_post.creationTimestamp}}
    )
    return corsify(to_json(set_creator_info(new_post.__dict__)))

# body data required: "creatorID", "newContent"
@app.route("/editPost/<post>", methods=["PUT"])
def edit_post(post):
    # requires checking user ID
    data = json.loads(request.data)
    old_post = posts.find_one({"_id": ObjectId(post)})
    changed = False
    if old_post != None and "creatorID" in data and str(old_post["creatorID"]) == data["creatorID"]:
        posts.update_one({"_id": ObjectId(post)}, {"$set": {"content": data["newContent"]}})
        changed = True
    return corsify({"changed": changed})

@app.route("/deletePost/<post>", methods=["POST"])
def delete_post(post): 
    # requires checking user ID
    data = json.loads(request.data)
    old_post = posts.find_one({"_id": ObjectId(post)})
    success = False
    if old_post != None and "creatorID" in data and str(old_post["creatorID"]) == data["creatorID"]:
        posts.delete_one({"_id": ObjectId(post)})
        success = True
    return corsify({"success": success})

# body data required: "creatorID", 1+ of "newTitle", "newCategory"
@app.route("/editThread/<thread>", methods=["PUT"])
def edit_thread(thread):
    # requires checking user ID
    data = json.loads(request.data)
    old_thread = threads.find_one({"_id": ObjectId(thread)})
    changed = False
    valid_uid = "creatorID" in data and str(old_thread["creatorID"]) == data["creatorID"]
    if old_thread != None and valid_uid and ("newTitle" in data or "newCategory" in data):
        fields = {
            **({"title": data["newTitle"]} if "newTitle" in data else {}), 
            **({"category": data["newCategory"]} if "newCategory" in data else {})
        }
        threads.update_one({"_id": ObjectId(thread)}, {"$set": fields})
        changed = True
    return corsify({"changed": changed})

@app.route("/deleteThread/<thread>", methods=["POST"])
def delete_thread(thread):
    # requires checking user ID
    data = json.loads(request.data)
    old_thread = threads.find_one({"_id": ObjectId(thread)})
    success = False
    if old_thread != None and "creatorID" in data and str(old_thread["creatorID"]) == data["creatorID"]:
        threads.delete_one({"_id": ObjectId(thread)})
        posts.delete_many({"threadID": ObjectId(thread)})
        success = True
    return corsify({"success": success})