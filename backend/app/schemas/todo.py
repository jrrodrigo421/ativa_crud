from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# Shared properties
class TodoBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = False


# Properties to receive on todo creation
class TodoCreate(TodoBase):
    title: str


# Properties to receive on todo update
class TodoUpdate(TodoBase):
    pass


# Properties shared by models stored in DB
class TodoInDBBase(TodoBase):
    id: int
    title: str
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# Properties to return to client
class Todo(TodoInDBBase):
    pass


# Properties stored in DB
class TodoInDB(TodoInDBBase):
    pass 