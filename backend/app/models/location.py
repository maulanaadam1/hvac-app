from typing import List, Optional
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel

class Organization(BaseModel):
    __tablename__ = "organizations"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    sites: Mapped[List["Site"]] = relationship(back_populates="organization", cascade="all, delete-orphan")


class Site(BaseModel):
    __tablename__ = "sites"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"))
    
    organization: Mapped["Organization"] = relationship(back_populates="sites")
    buildings: Mapped[List["Building"]] = relationship(back_populates="site", cascade="all, delete-orphan")


class Building(BaseModel):
    __tablename__ = "buildings"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    site_id: Mapped[str] = mapped_column(ForeignKey("sites.id"))
    
    site: Mapped["Site"] = relationship(back_populates="buildings")
    floors: Mapped[List["Floor"]] = relationship(back_populates="building", cascade="all, delete-orphan")


class Floor(BaseModel):
    __tablename__ = "floors"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    building_id: Mapped[str] = mapped_column(ForeignKey("buildings.id"))
    
    building: Mapped["Building"] = relationship(back_populates="floors")
    locations: Mapped[List["Location"]] = relationship(back_populates="floor", cascade="all, delete-orphan")


class Location(BaseModel):
    __tablename__ = "locations"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    floor_id: Mapped[str] = mapped_column(ForeignKey("floors.id"))
    
    floor: Mapped["Floor"] = relationship(back_populates="locations")
    equipment: Mapped[List["Equipment"]] = relationship(back_populates="location")
