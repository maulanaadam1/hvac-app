from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.models.user import Role, Permission, RolePermission, User

router = APIRouter()

class RoleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    is_system: bool = False
    permission_ids: List[str] = []

@router.post("/")
def create_role(role_in: RoleCreate, db: Session = Depends(get_db)):
    """Create a new role with specific permissions."""
    existing = db.query(Role).filter(Role.name == role_in.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role name already exists")
        
    new_role = Role(
        name=role_in.name,
        description=role_in.description,
        is_system=role_in.is_system,
    )
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    
    # Add permissions
    for pid in role_in.permission_ids:
        # Verify permission exists
        perm = db.query(Permission).filter(Permission.id == pid).first()
        if perm:
            rp = RolePermission(role_id=new_role.id, permission_id=pid)
            db.add(rp)
            
    db.commit()
    return {"id": new_role.id, "message": "Role created successfully"}


@router.get("/")
def get_roles(db: Session = Depends(get_db)):
    """Get all roles with user count and permission count."""
    roles = db.query(Role).all()
    
    result = []
    for role in roles:
        user_count = len(role.users)
        permission_count = len(role.permissions)
        
        result.append({
            "id": role.id,
            "name": role.name,
            "description": role.description,
            "is_system": role.is_system,
            "user_count": user_count,
            "permission_count": permission_count,
            "updated_at": role.updated_at.strftime("%d %b %Y") if role.updated_at else "Unknown",
        })
    return result

@router.get("/{role_id}")
def get_role_detail(role_id: str, db: Session = Depends(get_db)):
    """Get detailed information for a specific role including all permissions."""
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
        
    # Get all available permissions grouped by module
    all_perms = db.query(Permission).all()
    
    # We will format permissions by module, e.g., 'Operations', 'Inventory'
    modules = {}
    for p in all_perms:
        if p.module not in modules:
            modules[p.module] = []
            
        # Check if this role has this permission
        has_access = any(rp.id == p.id for rp in role.permissions)
        
        modules[p.module].append({
            "id": p.id,
            "name": p.action,
            "description": p.description,
            "has_access": has_access
        })
        
    # Format the modules into a list
    formatted_modules = []
    for module_name, perms in modules.items():
        formatted_modules.append({
            "module": module_name,
            "permissions": perms
        })
        
    return {
        "id": role.id,
        "name": role.name,
        "description": role.description,
        "is_system": role.is_system,
        "user_count": len(role.users),
        "created_at": role.created_at.strftime("%d %b %Y") if role.created_at else "Unknown",
        "modules": formatted_modules
    }
