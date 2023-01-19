#!/usr/bin/env python3

import flask
from flask import Flask, request, url_for, jsonify
import json
import os
from flask_pymongo import PyMongo
from pymongo.collection import Collection, ReturnDocument
from datetime import datetime
from schemas import Thread, Post, User



app = Flask("Forum")
app.config["MONGO_URI"] = "mongodb://localhost:27017/forum"
mongo = PyMongo(app)

@app.route("/createThread", methods=["POST"])
def create_thread():
    print(f'title: {request.form["title"]}')
    print(f'category: {request.form["category"]}')
    print(f'post body: {request.form["postContents"]}')
    return "got em"

@app.route("/getAllThreads/<category>", methods=["GET"])
def get_all_threads(category):
    # category can be ALL 
    pass

@app.route("/fetchAllPosts/<thread>", methods=["GET"])
def fetch_all_posts(thread):
    pass

@app.route("/reply/<thread>", methods=["POST"])
def post_on_thread(thread):
    pass

@app.route("/edit/<post>", methods=["PUT"])
def edit_post(post):
    # requires checking username
    pass

@app.route("/deletePost/<post>", methods=["DELETE"])
def delete_post(post): 
    # requires checking username
    pass

@app.route("/deleteThread/<thread>", methods=["DELETE"])
def delete_thread(thread):
    # requires checking username
    pass

@app.route("/createAccount/<username>", methods=["POST"])
def create_username(username):
    user_dict = {"username": username, "joined": datetime.now()}
    user_obj = User(**user_dict)
    insert_response = mongo.db.users.insert_one(user_obj.__dict__)
    return {"id": str(insert_response.inserted_id)}




