from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import assets, users, roles, permissions, auth
from app.core.database import Base, engine, SessionLocal

# Import all models to ensure they are registered before create_all
from app.models.user import User
from app.models.equipment import Equipment
from app.models.location import Location

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
def startup_event():
    # 1. Automatically create all tables in PostgreSQL
    Base.metadata.create_all(bind=engine)
    
    # 2. Check if admin exists, if not, seed the database
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.username == settings.FIRST_SUPERUSER).first()
        if not admin_user:
            print("Database is empty. Seeding initial data...")
            import sys
            import os
            sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            from scripts.seed_db import seed_db
            seed_db()
    except Exception as e:
        print(f"Auto-seed failed: {e}")
    finally:
        db.close()

# Clean up origins by stripping spaces and quotes
origins = []
for origin in settings.BACKEND_CORS_ORIGINS.split(","):
    clean_origin = origin.strip().strip('"').strip("'")
    if clean_origin:
        origins.append(clean_origin)

# If it's empty or we want to be safe, add "*" or allow the specific origin
# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins temporarily to fix CORS block
    allow_credentials=False, # Must be False if allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(roles.router, prefix="/api/v1/roles", tags=["roles"])
app.include_router(permissions.router, prefix="/api/v1/permissions", tags=["permissions"])
app.include_router(assets.router, prefix="/api/v1/assets", tags=["assets"])

@app.get("/")
def root():
    return {"message": "Welcome to the HVAC Management Platform API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
