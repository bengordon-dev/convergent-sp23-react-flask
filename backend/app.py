#!/usr/bin/env python3

from flask import Flask, request
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

@app.route("/createThread", methods=["POST"])
def create_thread():
    needed_keys = ["creatorID", "category", "title"]
    dict_thread = {
        **{x:request.form[x] for x in needed_keys},
        "creationTimestamp": datetime.now(),
        "posts": 0
    }
    new_thread = Thread(**dict_thread)
    threads.insert_one(new_thread.__dict__)
    return to_json(set_creator_info(new_thread.__dict__))

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
    return {"threads": thread_list}
    

@app.route("/getAllPosts/<thread>", methods=["GET"])
def get_all_posts(thread):
    post_list = to_json(posts.find({"threadID": ObjectId(thread)}))
    for post in post_list:
        set_creator_info(post)
    return {"posts": post_list}

@app.route("/reply/<thread>", methods=["POST"])
def post_on_thread(thread):
    needed_keys = ["creatorID", "content"]
    dict_post = {
        "threadID": ObjectId(thread),
        "creationTimestamp": datetime.now(),  
        **{x:request.form[x] for x in needed_keys},
    }
    new_post = Post(**dict_post)
    posts.insert_one(new_post.__dict__)
    old_post_count = threads.find_one({"_id": ObjectId(thread)})["posts"]
    threads.update_one({"_id": ObjectId(thread)}, 
        {"$set": {"posts": old_post_count + 1, "lastPost": new_post.creationTimestamp}}
    )
    return to_json(set_creator_info(new_post.__dict__))

@app.route("/edit/<post>", methods=["PUT"])
def edit_post(post):
    # requires checking user ID
    pass

@app.route("/deletePost/<post>", methods=["DELETE"])
def delete_post(post): 
    # requires checking user ID
    pass

@app.route("/deleteThread/<thread>", methods=["DELETE"])
def delete_thread(thread):
    # requires checking user ID
    pass

@app.route("/createAccount/<username>", methods=["POST"])
def create_account(username):
    user_dict = {"username": username, "joined": datetime.now()}
    user_obj = User(**user_dict)
    users.insert_one(user_obj.__dict__)
    return to_json(user_obj.__dict__)