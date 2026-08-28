from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.equipment import Equipment, EquipmentType
from app.models.location import Location, Floor, Building

router = APIRouter()

@router.get("/assets")
def get_assets(db: Session = Depends(get_db)):
    """Get all assets (equipment)"""
    assets = db.query(Equipment).all()
    
    result = []
    for asset in assets:
        # Build location string
        loc_str = ""
        if asset.location:
            loc = asset.location
            flr = loc.floor
            bldg = flr.building if flr else None
            parts = []
            if bldg: parts.append(bldg.name)
            if flr: parts.append(flr.name)
            parts.append(loc.name)
            loc_str = " / ".join(parts)
            
        result.append({
            "id": asset.equipment_id,
            "name": asset.name,
            "type": asset.equipment_type.code if asset.equipment_type else "Unknown",
            "equipment": asset.equipment_type.name if asset.equipment_type else "Unknown",
            "location": loc_str,
            "status": asset.status,
            "criticality": asset.criticality,
            "manufacturer": asset.manufacturer or "Unknown",
            "lastMaintenance": "24 Apr 2026", # Mock data
            "lastMaintenanceAgo": "2 days ago" # Mock data
        })
    return result

@router.get("/assets/{equipment_id}")
def get_asset(equipment_id: str, db: Session = Depends(get_db)):
    """Get a single asset by equipment_id"""
    asset = db.query(Equipment).filter(Equipment.equipment_id == equipment_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    loc_str = ""
    if asset.location:
        loc = asset.location
        flr = loc.floor
        bldg = flr.building if flr else None
        parts = []
        if bldg: parts.append(bldg.name)
        if flr: parts.append(flr.name)
        parts.append(loc.name)
        loc_str = " / ".join(parts)

    return {
        "id": asset.equipment_id,
        "name": asset.name,
        "type": asset.equipment_type.name if asset.equipment_type else "Unknown",
        "manufacturer": asset.manufacturer,
        "model_number": asset.model_number,
        "serial_number": asset.serial_number,
        "installation_date": str(asset.installation_date) if asset.installation_date else "Unknown",
        "warranty_until": str(asset.warranty_until) if asset.warranty_until else "Unknown",
        "location": loc_str,
        "status": asset.status,
        "criticality": asset.criticality
    }
