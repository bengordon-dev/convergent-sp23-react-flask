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
    "username": "bengordon",
    "joined": datetime.now()
}
new_user = User(**sample_user)
x = users.insert_one(new_user.__dict__)

print(x.inserted_id)
