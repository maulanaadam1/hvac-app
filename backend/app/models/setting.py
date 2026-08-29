from sqlalchemy import String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import BaseModel

class SystemSetting(BaseModel):
    __tablename__ = "system_settings"

    setting_id: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, default="general")
    
    system_name: Mapped[str] = mapped_column(String(255), default="HVAC Management System")
    system_logo: Mapped[str] = mapped_column(String(500), default="logo_hvac.png")
    timezone: Mapped[str] = mapped_column(String(100), default="Asia/Jakarta")
    date_format: Mapped[str] = mapped_column(String(50), default="DD MMM YYYY")
    time_format: Mapped[str] = mapped_column(String(50), default="24-Hour")
    language: Mapped[str] = mapped_column(String(50), default="English")
    currency: Mapped[str] = mapped_column(String(50), default="IDR")
    unit_system: Mapped[str] = mapped_column(String(50), default="Metric")
    items_per_page: Mapped[int] = mapped_column(Integer, default=20)
    week_starts_on: Mapped[str] = mapped_column(String(50), default="Monday")
    automatic_logout: Mapped[int] = mapped_column(Integer, default=30)
    maintenance_mode: Mapped[bool] = mapped_column(Boolean, default=False)
