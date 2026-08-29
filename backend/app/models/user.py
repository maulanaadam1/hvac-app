from typing import List, Optional
from datetime import datetime
from sqlalchemy import String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel

class Role(BaseModel):
    __tablename__ = "roles"

    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String(255))
    is_system: Mapped[bool] = mapped_column(Boolean, default=False)
    
    users: Mapped[List["User"]] = relationship(
        secondary="user_roles", back_populates="roles"
    )
    permissions: Mapped[List["Permission"]] = relationship(
        secondary="role_permissions", back_populates="roles"
    )

class Permission(BaseModel):
    __tablename__ = "permissions"

    module: Mapped[str] = mapped_column(String(100), nullable=False) # e.g., 'Assets', 'Dashboard'
    action: Mapped[str] = mapped_column(String(100), nullable=False) # e.g., 'View', 'Create'
    description: Mapped[Optional[str]] = mapped_column(String(255))

    roles: Mapped[List["Role"]] = relationship(
        secondary="role_permissions", back_populates="permissions"
    )

class UserRole(BaseModel):
    __tablename__ = "user_roles"

    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    role_id: Mapped[str] = mapped_column(ForeignKey("roles.id"))

class RolePermission(BaseModel):
    __tablename__ = "role_permissions"

    role_id: Mapped[str] = mapped_column(ForeignKey("roles.id"))
    permission_id: Mapped[str] = mapped_column(ForeignKey("permissions.id"))

class User(BaseModel):
    __tablename__ = "users"

    user_id_string: Mapped[str] = mapped_column(String(50), nullable=False, unique=True) # e.g. USR-00027
    username: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(50))
    department: Mapped[Optional[str]] = mapped_column(String(100))
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_locked: Mapped[bool] = mapped_column(Boolean, default=False)
    two_factor_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    
    last_login: Mapped[Optional[datetime]] = mapped_column(DateTime)
    password_last_changed: Mapped[Optional[datetime]] = mapped_column(DateTime)
    
    # Relationships
    roles: Mapped[List["Role"]] = relationship(
        secondary="user_roles", back_populates="users"
    )
    scopes: Mapped[List["UserScope"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

class UserScope(BaseModel):
    __tablename__ = "user_scopes"

    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    site_id: Mapped[str] = mapped_column(ForeignKey("sites.id")) # Assuming Site is the level of scope
    access_level: Mapped[str] = mapped_column(String(50), default="Read Only") # 'Full Access', 'Read Only'
    
    user: Mapped["User"] = relationship(back_populates="scopes")
    site: Mapped["Site"] = relationship()

class ActivityLog(BaseModel):
    __tablename__ = "activity_logs"

    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"))
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(500))
    ip_address: Mapped[Optional[str]] = mapped_column(String(50))
    user_agent: Mapped[Optional[str]] = mapped_column(String(255))
    
    # Optional relationship
    user: Mapped["User"] = relationship()
