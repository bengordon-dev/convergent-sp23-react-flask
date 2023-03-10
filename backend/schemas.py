from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from bson import ObjectId


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return PydanticObjectId(v)

class Thread(BaseModel):
    _id: Optional[PydanticObjectId]
    category: Optional[str]
    title: str
    posts: int 
    creatorID: PydanticObjectId
    creationTimestamp: datetime
    lastPost: Optional[datetime]

class Post(BaseModel):
    _id: Optional[PydanticObjectId]
    threadID: PydanticObjectId
    content: str
    creatorID: PydanticObjectId
    creationTimestamp: datetime

class User(BaseModel):
    username: str
    joined: datetime
    _id: Optional[PydanticObjectId]

