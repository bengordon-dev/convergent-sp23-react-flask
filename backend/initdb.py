#!/usr/bin/env python3
import pymongo
from schemas import Thread, Post, User
from datetime import datetime
myclient = pymongo.MongoClient('mongodb://localhost:27017/')
db = myclient['forum']
users = db["users"]
threads = db["threads"]
posts = db["posts"]


sample_user = {
    "username": "sampleuser",
    "joined": datetime.now()
}
new_user = User(**sample_user)
user_insert_result = users.insert_one(new_user.__dict__)
print(f'user id: {user_insert_result.inserted_id}')

sample_thread = {
    "creatorID": user_insert_result.inserted_id,
    "creationTimestamp": datetime.now(),
    "category": "clubs",
    "title": "how do I join Convergent",
    "posts": 0,
}
new_thread = Thread(**sample_thread)
thread_insert_result = threads.insert_one(new_thread.__dict__)
print(f'thread id: {thread_insert_result.inserted_id}')

sample_post = {
    "threadID": thread_insert_result.inserted_id,
    "creationTimestamp": datetime.now(),  
    "creatorID": user_insert_result.inserted_id,
    "content": "where do I find the form"
}
new_post = Post(**sample_post)
post_insert_result = posts.insert_one(new_post.__dict__)
print(f'post id: {post_insert_result.inserted_id}')