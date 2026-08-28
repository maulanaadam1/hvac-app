import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.location import Organization, Site, Building, Floor, Location
from app.models.equipment import EquipmentType, Equipment

def seed_db():
    db = SessionLocal()
    try:
        # Create Org, Site, Building, Floor, Location
        org = Organization(name="HVAC Corp")
        db.add(org)
        db.commit()
        db.refresh(org)

        site = Site(name="Main Campus", organization_id=org.id)
        db.add(site)
        db.commit()
        db.refresh(site)

        building = Building(name="Building A", site_id=site.id)
        db.add(building)
        db.commit()
        db.refresh(building)

        floor = Floor(name="Floor 1", building_id=building.id)
        db.add(floor)
        db.commit()
        db.refresh(floor)

        location = Location(name="Lobby", floor_id=floor.id)
        db.add(location)
        db.commit()
        db.refresh(location)

        # Create Equipment Types
        type_ahu = EquipmentType(name="Air Handling Unit", code="AHU")
        type_chiller = EquipmentType(name="Chiller", code="CH")
        type_fcu = EquipmentType(name="Fan Coil Unit", code="FCU")
        
        db.add_all([type_ahu, type_chiller, type_fcu])
        db.commit()
        db.refresh(type_ahu)

        # Create Equipment
        ahu1 = Equipment(
            equipment_id="AHU-001",
            name="Air Handling Unit 1",
            equipment_type_id=type_ahu.id,
            location_id=location.id,
            manufacturer="Daikin",
            model_number="D-AHU-20",
            serial_number="DAIKIN-20-001",
            criticality="High",
            status="Running"
        )
        db.add(ahu1)
        db.commit()

        # --- NEW: User & Role Seeding ---
        from app.models.user import Role, User, UserScope
        from datetime import datetime

        # Create Roles
        role_super_admin = Role(name="Super Admin", description="Full access to all features.", is_system=True)
        role_facility_manager = Role(name="Facility Manager", description="Manage assets, work orders.", is_system=True)
        role_lead_tech = Role(name="Lead Technician", description="Manage and execute work orders.", is_system=True)
        
        db.add_all([role_super_admin, role_facility_manager, role_lead_tech])
        db.commit()
        db.refresh(role_super_admin)
        db.refresh(role_facility_manager)
        db.refresh(role_lead_tech)

        from app.core.config import settings

        # Create Users
        # Super Admin User from Env
        user_admin = User(
            user_id_string="USR-00000",
            username=settings.FIRST_SUPERUSER,
            email=f"{settings.FIRST_SUPERUSER}@hvac.com",
            password_hash=settings.FIRST_SUPERUSER_PASSWORD, # in prod: get_password_hash(settings.FIRST_SUPERUSER_PASSWORD)
            first_name="System",
            last_name="Administrator",
            phone_number="+62 811 0000 000",
            department="IT",
            is_active=True,
            last_login=datetime.utcnow()
        )
        user_admin.roles.append(role_super_admin)

        user_adam = User(
            user_id_string="USR-00001",
            username="maulana.adam",
            email="maulana.adam@hvac.com",
            password_hash="mock_hash_123",
            first_name="Maulana",
            last_name="Adam",
            phone_number="+62 811 1111 111",
            department="Management",
            is_active=True,
            last_login=datetime.utcnow()
        )
        user_adam.roles.append(role_facility_manager)

        user_satria = User(
            user_id_string="USR-00027",
            username="satria.w",
            email="satria.w@hvac.com",
            password_hash="mock_hash_456",
            first_name="Satria",
            last_name="Wibowo",
            phone_number="+62 812 3456 7890",
            department="Maintenance",
            is_active=True,
            last_login=datetime.utcnow(),
            two_factor_enabled=True,
            password_last_changed=datetime.utcnow()
        )
        user_satria.roles.append(role_lead_tech)

        db.add_all([user_admin, user_adam, user_satria])
        db.commit()
        db.refresh(user_satria)

        # Create Scope
        scope = UserScope(user_id=user_satria.id, site_id=site.id, access_level="Full Access")
        db.add(scope)
        db.commit()

        print("Database seeded successfully with initial dummy data!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
