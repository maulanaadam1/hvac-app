from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from app.core.database import get_db
from app.models.user import Permission, Role

router = APIRouter()

class PermissionGroupCreate(BaseModel):
    group_name: str
    module: str
    description: Optional[str] = None
    actions: List[str] = [] # e.g. ["View", "Create", "Update", "Delete", "Export"]

@router.post("/")
def create_permission_group(group_in: PermissionGroupCreate, db: Session = Depends(get_db)):
    """Create a group of permissions (actions) for a module."""
    if not group_in.module:
        raise HTTPException(status_code=400, detail="Module is required")
        
    created_perms = []
    
    # Standardize actions to capitalized (View, Create, etc.)
    actions = [a.capitalize() for a in group_in.actions]
    
    for action in actions:
        # Check if permission already exists
        # e.g., action="View", module="Work Orders"
        # Or format as "View Work Orders"
        action_name = f"{action} {group_in.group_name}" if action not in ["Manage Stock", "View Transactions"] else action
        
        existing = db.query(Permission).filter(
            Permission.module == group_in.module,
            Permission.action == action_name
        ).first()
        
        if not existing:
            new_perm = Permission(
                module=group_in.module,
                action=action_name,
                description=f"{action} access for {group_in.group_name}. {group_in.description or ''}"
            )
            db.add(new_perm)
            created_perms.append(new_perm)
            
    db.commit()
    return {"message": f"Successfully created {len(created_perms)} permissions"}

@router.get("/")
def get_permissions(db: Session = Depends(get_db)):
    """Get all permissions and their details."""
    permissions = db.query(Permission).all()
    
    result = []
    for p in permissions:
        # Mocking resource, code, type, status based on our current data structure
        module = p.module
        action = p.action
        
        # Derive resource from action or module
        resource = module
        if "Assets" in module:
            resource = "Asset"
        elif "Work Orders" in module:
            resource = "Work Order"
        elif "Preventive Maintenance" in module:
            resource = "PM"
        
        # Format code
        code = f"{module.lower().replace(' ', '_')}.{action.lower().replace(' ', '_')}"
        
        assigned_roles = [
            {
                "id": r.id, 
                "name": r.name, 
                "is_system": r.is_system
            } 
            for r in p.roles
        ]
        
        result.append({
            "id": p.id,
            "name": f"{action} {module}" if action not in ["View KPI", "Export Data", "Manage Stock"] else action,
            "description": p.description,
            "module": module,
            "resource": resource,
            "action": action,
            "code": code,
            "type": "System",
            "status": "Active",
            "assigned_roles": assigned_roles,
            "created_at": p.created_at.strftime("%d %b %Y %H:%M") if p.created_at else "Unknown",
            "updated_at": p.updated_at.strftime("%d %b %Y %H:%M") if p.updated_at else "Unknown"
        })
        
    return result
