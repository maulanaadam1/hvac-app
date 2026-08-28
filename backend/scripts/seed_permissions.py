import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.user import Role, Permission, RolePermission

def seed_permissions():
    db = SessionLocal()
    try:
        # Check if permissions exist
        if db.query(Permission).count() > 0:
            print("Permissions already exist in the database. Skipping...")
            return

        print("Seeding permissions...")
        modules = {
            'Dashboard': ['View Dashboard', 'View KPI', 'Export Data', 'Configure Dashboard'],
            'Assets': ['View Assets', 'Create Assets', 'Edit Assets', 'Delete Assets', 'Import Assets', 'Export Assets'],
            'Work Orders': ['View Work Orders', 'Create Work Orders', 'Edit Work Orders', 'Delete Work Orders'],
            'Preventive Maintenance': ['View PM', 'Create PM', 'Edit PM', 'Delete PM'],
            'Inventory': ['View Inventory', 'Manage Stock', 'View Transactions'],
            'Users': ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'Manage Roles']
        }
        
        all_perms = []
        for module, perms in modules.items():
            for perm in perms:
                db_perm = Permission(
                    module=module,
                    action=perm,
                    description=f"Allows user to {perm.lower()}"
                )
                db.add(db_perm)
                all_perms.append(db_perm)
        db.commit()
        
        # Assign all to Super Admin
        super_admin = db.query(Role).filter(Role.name == 'Super Admin').first()
        if super_admin:
            for p in all_perms:
                rp = RolePermission(role_id=super_admin.id, permission_id=p.id)
                db.add(rp)
                
        # Assign some to Facility Manager
        fac_mgr = db.query(Role).filter(Role.name == 'Facility Manager').first()
        if fac_mgr:
            for p in all_perms:
                if p.module != 'Users':
                    rp = RolePermission(role_id=fac_mgr.id, permission_id=p.id)
                    db.add(rp)
                    
        # Assign limited to Lead Tech
        lead_tech = db.query(Role).filter(Role.name == 'Lead Technician').first()
        if lead_tech:
            for p in all_perms:
                if p.module in ['Work Orders', 'Preventive Maintenance']:
                    rp = RolePermission(role_id=lead_tech.id, permission_id=p.id)
                    db.add(rp)

        db.commit()
        print("Permissions seeded successfully!")
    except Exception as e:
        print(f"Error seeding permissions: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_permissions()
