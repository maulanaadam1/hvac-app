from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime

from app.core.database import get_db
from app.models.user import User, Role

router = APIRouter()

# --- Pydantic Schemas ---
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    phone_number: Optional[str] = None
    department: str
    job_title: Optional[str] = None
    status: str
    language: Optional[str] = "en"
    password: str
    role_name: str

@router.post("/")
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if email or username exists
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.username == user_in.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
        
    # Find role
    role = db.query(Role).filter(Role.name == user_in.role_name).first()
    if not role:
        raise HTTPException(status_code=400, detail=f"Role '{user_in.role_name}' not found")
        
    # Create new user
    # Note: In production, hash the password! Here we use a dummy hash for brevity.
    new_user = User(
        user_id_string=f"USR-{str(uuid.uuid4().hex[:5]).upper()}",
        username=user_in.username,
        email=user_in.email,
        password_hash=f"hashed_{user_in.password}", 
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        phone_number=user_in.phone_number,
        department=user_in.department,
        is_active=(user_in.status.lower() == "active"),
        last_login=None
    )
    
    new_user.roles.append(role)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully", "user_id": new_user.user_id_string}

@router.put("/{user_id_string}")
def update_user(user_id_string: str, user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id_string == user_id_string).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Check email and username conflicts
    existing_email = db.query(User).filter(User.email == user_in.email, User.id != user.id).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already taken by another user")
        
    existing_username = db.query(User).filter(User.username == user_in.username, User.id != user.id).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken by another user")

    role = db.query(Role).filter(Role.name == user_in.role_name).first()
    if not role:
        raise HTTPException(status_code=400, detail=f"Role '{user_in.role_name}' not found")
        
    user.first_name = user_in.first_name
    user.last_name = user_in.last_name
    user.email = user_in.email
    user.username = user_in.username
    user.phone_number = user_in.phone_number
    user.department = user_in.department
    user.is_active = (user_in.status.lower() == "active")
    
    if user_in.password: # Only update password if provided
        user.password_hash = f"hashed_{user_in.password}"
        
    user.roles = [role]
    
    db.commit()
    db.refresh(user)
    return {"message": "User updated successfully"}

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    """Get all users with their roles and scopes."""
    users = db.query(User).all()
    
    result = []
    for user in users:
        # Determine primary role
        primary_role = "None"
        if user.roles:
            primary_role = user.roles[0].name
            
        # Determine primary site scope
        primary_site = "None"
        if user.scopes and user.scopes[0].site:
            primary_site = user.scopes[0].site.name
            
        # Determine status string
        status = "Active"
        if user.is_locked:
            status = "Locked"
        elif not user.is_active:
            status = "Inactive"
            
        # Format dates
        last_login_date = ""
        last_login_time = ""
        if user.last_login:
            last_login_date = user.last_login.strftime("%d %b %Y")
            last_login_time = user.last_login.strftime("%H:%M")
            
        result.append({
            "id": user.user_id_string,
            "name": user.full_name,
            "email": user.email,
            "role": primary_role,
            "site": primary_site,
            "status": status,
            "date": last_login_date,
            "time": last_login_time
        })
    return result

@router.get("/{user_id_string}")
def get_user_detail(user_id_string: str, db: Session = Depends(get_db)):
    """Get detailed information for a specific user."""
    user = db.query(User).filter(User.user_id_string == user_id_string).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    status = "Active"
    if user.is_locked:
        status = "Locked"
    elif not user.is_active:
        status = "Inactive"
        
    # Gather roles
    roles = [role.name for role in user.roles]
    primary_role = roles[0] if roles else "None"
    
    # Gather scopes
    scopes = []
    for scope in user.scopes:
        site_name = scope.site.name if scope.site else "Unknown"
        scopes.append({
            "site": site_name,
            "access": scope.access_level
        })
        
    return {
        "id": user.user_id_string,
        "username": user.username,
        "name": user.full_name,
        "email": user.email,
        "phone": user.phone_number,
        "department": user.department,
        "role": primary_role,
        "roles": roles,
        "scopes": scopes,
        "status": status,
        "joined_date": user.created_at.strftime("%d %b %Y") if user.created_at else "Unknown",
        "last_login": user.last_login.strftime("%d %b %Y %H:%M") if user.last_login else "Never",
        "password_changed": user.password_last_changed.strftime("%d %b %Y %H:%M") if user.password_last_changed else "Unknown",
        "two_factor_enabled": user.two_factor_enabled
    }

class UserStatusUpdate(BaseModel):
    is_active: Optional[bool] = None
    is_locked: Optional[bool] = None

@router.patch("/{user_id_string}/status")
def update_user_status(user_id_string: str, status_in: UserStatusUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id_string == user_id_string).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if status_in.is_active is not None:
        user.is_active = status_in.is_active
    if status_in.is_locked is not None:
        user.is_locked = status_in.is_locked
        
    db.commit()
    db.refresh(user)
    return {"message": "User status updated successfully"}

@router.delete("/{user_id_string}")
def delete_user(user_id_string: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id_string == user_id_string).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
