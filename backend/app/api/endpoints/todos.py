from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.todo import Todo
from app.models.user import User
from app.schemas.todo import Todo as TodoSchema
from app.schemas.todo import TodoCreate, TodoUpdate

router = APIRouter()


@router.get("/", response_model=List[TodoSchema])
def read_todos(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve todos for current user.
    """
    todos = db.query(Todo).filter(Todo.user_id == current_user.id).offset(skip).limit(limit).all()
    return todos


@router.post("/", response_model=TodoSchema)
def create_todo(
    *,
    db: Session = Depends(get_db),
    todo_in: TodoCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new todo.
    """
    todo = Todo(
        title=todo_in.title,
        description=todo_in.description,
        completed=todo_in.completed,
        user_id=current_user.id
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@router.get("/{todo_id}", response_model=TodoSchema)
def read_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get todo by ID.
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.put("/{todo_id}", response_model=TodoSchema)
def update_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    todo_in: TodoUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a todo.
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    update_data = todo_in.dict(exclude_unset=True)
    for field in update_data:
        setattr(todo, field, update_data[field])
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@router.delete("/{todo_id}", response_model=TodoSchema)
def delete_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a todo.
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(todo)
    db.commit()
    return todo 