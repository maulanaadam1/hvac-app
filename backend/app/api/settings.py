from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.core.database import get_db
from app.models.setting import SystemSetting
from app.models.user import ActivityLog, User

router = APIRouter()

class GeneralSettingsUpdate(BaseModel):
    system_name: Optional[str] = None
    system_logo: Optional[str] = None
    timezone: Optional[str] = None
    date_format: Optional[str] = None
    time_format: Optional[str] = None
    language: Optional[str] = None
    currency: Optional[str] = None
    unit_system: Optional[str] = None
    items_per_page: Optional[int] = None
    week_starts_on: Optional[str] = None
    automatic_logout: Optional[int] = None
    maintenance_mode: Optional[bool] = None

@router.get("/general")
def get_general_settings(db: Session = Depends(get_db)):
    setting = db.query(SystemSetting).filter(SystemSetting.setting_id == "general").first()
    if not setting:
        setting = SystemSetting(setting_id="general")
        db.add(setting)
        db.commit()
        db.refresh(setting)
    return setting

@router.patch("/general")
def update_general_settings(settings_in: GeneralSettingsUpdate, db: Session = Depends(get_db)):
    setting = db.query(SystemSetting).filter(SystemSetting.setting_id == "general").first()
    if not setting:
        setting = SystemSetting(setting_id="general")
        db.add(setting)
        
    for key, value in settings_in.dict(exclude_unset=True).items():
        setattr(setting, key, value)
        
    admin = db.query(User).filter(User.username == "admin").first() or db.query(User).first()
    if admin:
        act = ActivityLog(user_id=admin.id, action="Updated Settings", description="System general settings were updated")
        db.add(act)
        
    db.commit()
    db.refresh(setting)
    return setting
