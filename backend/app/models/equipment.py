from typing import List, Optional
from datetime import date
from sqlalchemy import String, ForeignKey, Date, Boolean, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel

class EquipmentType(BaseModel):
    __tablename__ = "equipment_types"

    name: Mapped[str] = mapped_column(String(255), nullable=False) # e.g. "Air Handling Unit"
    code: Mapped[str] = mapped_column(String(50), nullable=False)  # e.g. "AHU"
    
    equipment: Mapped[List["Equipment"]] = relationship(back_populates="equipment_type")


class Equipment(BaseModel):
    __tablename__ = "equipment"

    equipment_id: Mapped[str] = mapped_column(String(100), nullable=False, unique=True) # e.g. "AHU-001"
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    equipment_type_id: Mapped[str] = mapped_column(ForeignKey("equipment_types.id"))
    location_id: Mapped[str] = mapped_column(ForeignKey("locations.id"))
    
    manufacturer: Mapped[Optional[str]] = mapped_column(String(255))
    model_number: Mapped[Optional[str]] = mapped_column(String(255))
    serial_number: Mapped[Optional[str]] = mapped_column(String(255))
    
    installation_date: Mapped[Optional[date]] = mapped_column(Date)
    warranty_until: Mapped[Optional[date]] = mapped_column(Date)
    
    criticality: Mapped[str] = mapped_column(String(50), default="Medium") # High, Medium, Low
    status: Mapped[str] = mapped_column(String(50), default="Running") # Running, Warning, Critical, Offline
    
    # Relationships
    equipment_type: Mapped["EquipmentType"] = relationship(back_populates="equipment")
    location: Mapped["Location"] = relationship(back_populates="equipment")
    
    # For self-referencing Parent/Child equipment (e.g. Compressor inside Chiller)
    parent_id: Mapped[Optional[str]] = mapped_column(ForeignKey("equipment.id"))
    parent: Mapped[Optional["Equipment"]] = relationship(back_populates="children", remote_side="Equipment.id")
    children: Mapped[List["Equipment"]] = relationship(back_populates="parent")

    parameters: Mapped[List["EquipmentParameterValue"]] = relationship(back_populates="equipment", cascade="all, delete-orphan")


class EquipmentParameter(BaseModel):
    __tablename__ = "equipment_parameters"

    name: Mapped[str] = mapped_column(String(255), nullable=False) # e.g. "Supply Temperature"
    unit: Mapped[Optional[str]] = mapped_column(String(50)) # e.g. "°C"
    data_type: Mapped[str] = mapped_column(String(50), default="Numeric") # Numeric, Boolean, Text, Enum
    
    values: Mapped[List["EquipmentParameterValue"]] = relationship(back_populates="parameter")


class EquipmentParameterValue(BaseModel):
    __tablename__ = "equipment_parameter_values"

    equipment_id: Mapped[str] = mapped_column(ForeignKey("equipment.id"))
    parameter_id: Mapped[str] = mapped_column(ForeignKey("equipment_parameters.id"))
    
    # We can store values as string for flexibility, or have specific columns
    value_string: Mapped[Optional[str]] = mapped_column(String(255))
    value_numeric: Mapped[Optional[float]] = mapped_column(Float)
    
    # Thresholds
    min_threshold: Mapped[Optional[float]] = mapped_column(Float)
    max_threshold: Mapped[Optional[float]] = mapped_column(Float)
    warning_threshold: Mapped[Optional[float]] = mapped_column(Float)
    critical_threshold: Mapped[Optional[float]] = mapped_column(Float)

    equipment: Mapped["Equipment"] = relationship(back_populates="parameters")
    parameter: Mapped["EquipmentParameter"] = relationship(back_populates="values")
