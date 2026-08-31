from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from app.core.database import get_db
from app.models.location import Site, Building, Floor
from app.models.equipment import EquipmentType
from app.models.user import ActivityLog, User

router = APIRouter()

# --- Pydantic Schemas ---
class SiteCreate(BaseModel):
    name: str

class BuildingCreate(BaseModel):
    name: str
    site_id: str

class FloorCreate(BaseModel):
    name: str
    building_id: str

class EquipmentTypeCreate(BaseModel):
    name: str
    code: str
    description: str = None

# --- Sites ---
@router.get("/sites")
def get_sites(db: Session = Depends(get_db)):
    return db.query(Site).all()

@router.post("/sites")
def create_site(site: SiteCreate, db: Session = Depends(get_db)):
    from app.models.location import Organization
    org = db.query(Organization).first()
    if not org:
        org = Organization(name="Default Org")
        db.add(org)
        db.commit()
        db.refresh(org)
        
    new_site = Site(name=site.name, organization_id=org.id)
    db.add(new_site)
    db.commit()
    db.refresh(new_site)
    return new_site

@router.delete("/sites/{site_id}")
def delete_site(site_id: str, db: Session = Depends(get_db)):
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    db.delete(site)
    db.commit()
    return {"message": "Deleted successfully"}

@router.put("/sites/{site_id}")
def update_site(site_id: str, site_data: SiteCreate, db: Session = Depends(get_db)):
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    site.name = site_data.name
    db.commit()
    db.refresh(site)
    return site

# --- Buildings ---
@router.get("/buildings")
def get_buildings(db: Session = Depends(get_db)):
    return db.query(Building).all()

@router.post("/buildings")
def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    new_building = Building(name=building.name, site_id=building.site_id)
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building

@router.delete("/buildings/{building_id}")
def delete_building(building_id: str, db: Session = Depends(get_db)):
    building = db.query(Building).filter(Building.id == building_id).first()
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    db.delete(building)
    db.commit()
    return {"message": "Deleted successfully"}

@router.put("/buildings/{building_id}")
def update_building(building_id: str, b_data: BuildingCreate, db: Session = Depends(get_db)):
    building = db.query(Building).filter(Building.id == building_id).first()
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    building.name = b_data.name
    building.site_id = b_data.site_id
    db.commit()
    db.refresh(building)
    return building

# --- Floors ---
@router.get("/floors")
def get_floors(db: Session = Depends(get_db)):
    return db.query(Floor).all()

@router.post("/floors")
def create_floor(floor: FloorCreate, db: Session = Depends(get_db)):
    new_floor = Floor(name=floor.name, building_id=floor.building_id)
    db.add(new_floor)
    db.commit()
    db.refresh(new_floor)
    return new_floor

@router.delete("/floors/{floor_id}")
def delete_floor(floor_id: str, db: Session = Depends(get_db)):
    floor = db.query(Floor).filter(Floor.id == floor_id).first()
    if not floor:
        raise HTTPException(status_code=404, detail="Floor not found")
    db.delete(floor)
    db.commit()
    return {"message": "Deleted successfully"}

@router.put("/floors/{floor_id}")
def update_floor(floor_id: str, f_data: FloorCreate, db: Session = Depends(get_db)):
    floor = db.query(Floor).filter(Floor.id == floor_id).first()
    if not floor:
        raise HTTPException(status_code=404, detail="Floor not found")
    floor.name = f_data.name
    floor.building_id = f_data.building_id
    db.commit()
    db.refresh(floor)
    return floor

# --- Equipment Types (Asset Categories) ---
@router.get("/equipment-types")
def get_equipment_types(db: Session = Depends(get_db)):
    return db.query(EquipmentType).all()

@router.post("/equipment-types")
def create_equipment_type(eq_type: EquipmentTypeCreate, db: Session = Depends(get_db)):
    new_eq = EquipmentType(name=eq_type.name, code=eq_type.code, description=eq_type.description)
    db.add(new_eq)
    db.commit()
    db.refresh(new_eq)
    return new_eq

@router.delete("/equipment-types/{type_id}")
def delete_equipment_type(type_id: str, db: Session = Depends(get_db)):
    eq = db.query(EquipmentType).filter(EquipmentType.id == type_id).first()
    if not eq:
        raise HTTPException(status_code=404, detail="Equipment type not found")
    db.delete(eq)
    db.commit()
    return {"message": "Deleted successfully"}

@router.put("/equipment-types/{type_id}")
def update_equipment_type(type_id: str, eq_data: EquipmentTypeCreate, db: Session = Depends(get_db)):
    eq = db.query(EquipmentType).filter(EquipmentType.id == type_id).first()
    if not eq:
        raise HTTPException(status_code=404, detail="Equipment type not found")
    eq.name = eq_data.name
    eq.code = eq_data.code
    if eq_data.description:
        eq.description = eq_data.description
    db.commit()
    db.refresh(eq)
    return eq
