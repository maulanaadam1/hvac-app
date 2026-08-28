# HVAC Management System --- Production Skill

## 1. Purpose

Build a production-ready **HVAC System Management Platform** for
managing HVAC assets, locations, preventive/corrective maintenance, work
orders, inspections, spare parts, inventory, alarms, energy, analytics,
users, RBAC, and future IoT/BMS integration.

The system must prioritize:

-   Minimalist, elegant, industrial UI
-   Secure enterprise architecture
-   Modular and scalable design
-   Multi-site / multi-building readiness
-   Strong RBAC and permission controls
-   Auditability
-   Mobile/tablet usability for technicians
-   API-first architecture
-   Future IoT/MQTT integration without redesigning the core system

------------------------------------------------------------------------

# 2. Recommended Technology Stack

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Lucide Icons
-   TanStack Query
-   TanStack Table
-   React Hook Form
-   Zod
-   Apache ECharts

## Backend

-   Python
-   FastAPI
-   SQLAlchemy 2.0
-   Alembic
-   Pydantic
-   Celery

## Data / Infrastructure

-   PostgreSQL
-   Redis
-   MinIO or S3-compatible object storage
-   Docker / Docker Compose
-   Nginx or Traefik
-   EasyPanel for VPS deployment

## Security

-   OAuth2 / OpenID Connect
-   JWT access tokens
-   Refresh-token rotation
-   Argon2id for locally managed passwords
-   RBAC
-   Fine-grained permissions
-   Site/building/location scope
-   HttpOnly + Secure cookies where applicable
-   HTTPS/TLS
-   Rate limiting
-   Security headers / CSP
-   Audit logging
-   Least-privilege database access
-   Secret management

## Future IoT

-   MQTT
-   Mosquitto or another production MQTT broker
-   MQTT over TLS
-   Device authentication
-   Topic ACL
-   Optional device certificates
-   TimescaleDB extension / time-series architecture when telemetry
    volume requires it

## Monitoring

-   Prometheus
-   Grafana
-   Centralized application logs
-   Health checks
-   Backup and recovery monitoring

------------------------------------------------------------------------

# 3. Architecture Principles

Use a modular monolith first. Do not introduce microservices unless a
measurable scaling or operational requirement justifies it.

Recommended architecture:

``` text
Browser
  |
  v
Next.js
  |
  | HTTPS / REST / WebSocket
  v
FastAPI
  |
  +------------------+------------------+
  |                  |                  |
  v                  v                  v
PostgreSQL          Redis             MinIO/S3
  |                  |
  |                  v
  |                Celery
  |
  +---- Core HVAC business data

Future IoT:

HVAC / Sensors
      |
      v
MQTT Broker
      |
      v
IoT ingestion service
      |
      v
FastAPI / time-series storage
```

Rules:

1.  Keep business logic out of frontend components.
2.  Keep database access behind repository/service boundaries.
3.  Use API schemas separate from ORM models.
4.  Use background workers for long-running jobs.
5.  Never expose PostgreSQL, Redis, MinIO, or MQTT broker directly to
    the public internet.
6.  Design all modules so they can later be extracted into services if
    needed.
7.  Prefer PostgreSQL as the system of record.

------------------------------------------------------------------------

# 4. Product Modules

Implement the following modules.

## 4.1 Authentication

Features:

-   Login
-   Logout
-   Session management
-   Password reset if local authentication is enabled
-   MFA-ready architecture
-   OAuth2/OIDC-ready architecture
-   Refresh token rotation
-   Session revocation
-   Failed-login tracking

## 4.2 User Management

Features:

-   User CRUD
-   User activation/deactivation
-   Role assignment
-   Permission visibility
-   Site/building scope
-   Last login
-   Session management

## 4.3 RBAC

Use:

``` text
User
  -> Roles
      -> Permissions
          -> Resource + Action
```

Example:

``` text
asset.view
asset.create
asset.update
asset.delete

work_order.view
work_order.create
work_order.assign
work_order.execute
work_order.approve
work_order.close

inventory.view
inventory.receive
inventory.issue
inventory.adjust

user.manage
role.manage
audit.view
```

Authorization must check:

1.  Authentication
2.  Permission
3.  Resource ownership/scope
4.  Site/building/location scope

Never rely only on frontend hiding buttons.

## 4.4 Location Management

Hierarchy:

``` text
Organization
  -> Site
      -> Building
          -> Floor
              -> Area
                  -> Room
```

Every equipment should reference a valid location.

## 4.5 Asset Management

Support:

-   Asset ID
-   Asset type
-   Equipment category
-   Manufacturer
-   Model
-   Serial number
-   Installation date
-   Warranty
-   Location
-   Criticality
-   Status
-   Technical specifications
-   Operating thresholds
-   Documents
-   Photos
-   Maintenance history
-   Parent/child equipment relationships

HVAC equipment examples:

-   Chiller
-   AHU
-   FCU
-   Cooling Tower
-   PAC
-   Split AC
-   VRF
-   Exhaust Fan
-   Pump
-   Fan
-   Compressor
-   Heat Exchanger

## 4.6 Technical Parameters

Use flexible parameter definitions instead of hardcoding every possible
HVAC parameter into one table.

Example:

``` text
Equipment Type: AHU

Supply Temperature
Return Temperature
Airflow
Static Pressure
Motor Current
Fan Speed
Humidity
Filter Differential Pressure
Running Hours
```

Example:

``` text
Equipment Type: Chiller

Cooling Capacity
Entering Water Temperature
Leaving Water Temperature
Evaporator Pressure
Condenser Pressure
Power Consumption
Flow Rate
COP
Running Hours
```

Parameters should support:

-   Numeric
-   Boolean
-   Text
-   Enum
-   Unit
-   Min threshold
-   Max threshold
-   Warning threshold
-   Critical threshold

------------------------------------------------------------------------

# 5. Maintenance Management

## 5.1 Preventive Maintenance

PM plans must support:

-   Daily
-   Weekly
-   Monthly
-   Quarterly
-   Semiannual
-   Annual
-   Custom interval
-   Running-hours trigger
-   Condition-based trigger, when IoT is available

Flow:

``` text
PM Plan
   |
   v
PM Schedule
   |
   v
Work Order
   |
   v
Technician
   |
   v
Checklist
   |
   v
Inspection Result
   |
   v
Verification
   |
   v
Close
```

## 5.2 Corrective Maintenance

Flow:

``` text
Problem Report
    |
    v
Work Request
    |
    v
Supervisor Review
    |
    v
Work Order
    |
    v
Assign Technician
    |
    v
Diagnosis
    |
    v
Repair
    |
    v
Testing
    |
    v
Verification
    |
    v
Close
```

Support:

-   Failure code
-   Problem description
-   Root cause
-   Corrective action
-   Downtime
-   Labor
-   Spare parts
-   Photos
-   Attachments
-   Before/after readings
-   Completion notes

------------------------------------------------------------------------

# 6. Inspection & Checklist

Checklist templates must be reusable by equipment type and maintenance
frequency.

Example:

``` text
AHU Monthly Inspection

[ ] Filter condition
[ ] Belt condition
[ ] Bearing condition
[ ] Motor condition
[ ] Fan condition
[ ] Drain pan
[ ] Condensate drain
[ ] Supply temperature
[ ] Return temperature
[ ] Motor current
[ ] Vibration
```

Each checklist item may support:

-   Pass
-   Fail
-   N/A
-   Numeric measurement
-   Text result
-   Photo
-   Remark
-   Required/optional

If a critical checklist item fails, allow automatic creation or
recommendation of corrective work.

------------------------------------------------------------------------

# 7. Work Order

Work Order statuses:

``` text
Draft
Open
Assigned
In Progress
On Hold
Pending Verification
Completed
Closed
Cancelled
```

Work Order should contain:

-   WO number
-   Type
-   Priority
-   Asset
-   Location
-   Requester
-   Assigned technician
-   Supervisor
-   Scheduled start
-   Scheduled end
-   Actual start
-   Actual end
-   Problem
-   Diagnosis
-   Action
-   Checklist
-   Measurements
-   Spare parts
-   Labor
-   Cost
-   Attachments
-   Approval
-   Audit history

------------------------------------------------------------------------

# 8. Inventory / Spare Parts

Integrate HVAC maintenance with inventory.

Modules:

-   Spare part master
-   Warehouse
-   Stock balance
-   Stock receiving
-   Stock issuing
-   Reservation
-   Adjustment
-   Stock opname
-   Minimum stock
-   Reorder point
-   Supplier
-   Cost
-   Batch/serial tracking where required
-   FIFO support

Flow:

``` text
Maintenance
    |
    v
Spare Part Request
    |
    v
Warehouse
    |
    v
Issue Part
    |
    v
Stock Transaction
    |
    v
Maintenance Cost
```

Every stock movement must be immutable as a transaction record.
Corrections should use adjustment/reversal transactions rather than
silently editing history.

------------------------------------------------------------------------

# 9. Alarm & Threshold Management

Each equipment may define:

``` text
Normal
Warning
Critical
Offline
```

Example:

``` text
AHU-001 Supply Temperature

Normal   : 12–16 °C
Warning  : 16–18 °C
Critical : >18 °C
```

Alarm features:

-   Threshold evaluation
-   Alarm severity
-   Alarm state
-   Acknowledgement
-   Escalation
-   Notification
-   Alarm history
-   Root-cause/reference asset
-   Optional automatic work request

Avoid alarm flooding. Implement deduplication, hysteresis, cooldown, and
acknowledgement concepts where appropriate.

------------------------------------------------------------------------

# 10. IoT / BMS Readiness

The core application must work without IoT.

When IoT is introduced:

``` text
Sensor
  |
  v
Gateway
  |
  v
MQTT Broker
  |
  v
Telemetry Ingestion
  |
  +----> Real-time state
  |
  +----> Time-series data
  |
  v
HVAC Application
```

Use standardized topic conventions, for example:

``` text
site/{site_id}/building/{building_id}/asset/{asset_id}/telemetry/{metric}
```

Security:

-   MQTT over TLS
-   Device authentication
-   Topic ACL
-   Per-device identity
-   No anonymous MQTT
-   Network isolation
-   Rate/message limits where appropriate

------------------------------------------------------------------------

# 11. Dashboard

The UI must follow a **Minimalist + Elegant + Industrial** design
language.

Design principles:

-   Large whitespace
-   Clean typography
-   White/light-gray surfaces
-   Thin borders
-   Moderate 8px radius
-   Subtle shadows
-   Minimal gradients
-   Minimal animation
-   Neutral base palette
-   Status colors only when meaningful
-   Data-first layout

Suggested visual inspiration:

-   Linear
-   Vercel
-   Stripe
-   Grafana
-   Modern enterprise CMMS applications

Do not copy any product directly.

Dashboard should contain:

``` text
Total Assets
Running
Breakdown
Maintenance
PM Overdue

Equipment Health
Active Work Orders
Alarm Summary
System Overview
Energy Consumption
Recent Activity
PM Compliance
```

------------------------------------------------------------------------

# 12. Equipment Detail UI

Equipment detail should behave like a digital equipment card.

Example:

``` text
AHU-001
Air Handling Unit

Building A / Floor 1 / Lobby

RUNNING

Supply Temperature     14.2 °C
Return Temperature     18.4 °C
Motor Current          12.4 A
Airflow                8,200 CFM

Tabs:
Overview
Maintenance
Inspection
History
Documents
```

Technicians must be able to use the interface comfortably on
tablet/mobile.

------------------------------------------------------------------------

# 13. Frontend Rules

Use:

-   Next.js App Router
-   TypeScript strict mode
-   Server Components where appropriate
-   Client Components only where interaction requires them
-   TanStack Query for server state
-   React Hook Form + Zod for forms
-   shadcn/ui for UI primitives
-   Lucide for icons
-   TanStack Table for complex tables
-   ECharts for analytics

Rules:

1.  Do not place API calls directly in reusable presentation components.
2.  Use consistent loading, empty, error, and success states.
3.  Forms must have schema validation.
4.  Destructive actions require confirmation.
5.  Tables must support pagination and filtering.
6.  Use responsive layouts.
7.  Prioritize technician workflows on tablet/mobile.
8.  Do not overload dashboards with excessive cards.

------------------------------------------------------------------------

# 14. Backend Rules

FastAPI application structure should be modular:

``` text
app/
├── main.py
├── core/
│   ├── config.py
│   ├── security.py
│   ├── database.py
│   └── logging.py
├── modules/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── locations/
│   ├── assets/
│   ├── maintenance/
│   ├── work_orders/
│   ├── inspections/
│   ├── inventory/
│   ├── alarms/
│   ├── energy/
│   ├── reports/
│   ├── notifications/
│   └── audit/
├── api/
├── models/
├── schemas/
├── repositories/
├── services/
└── workers/
```

Prefer this flow:

``` text
API Router
   |
   v
Schema Validation
   |
   v
Authorization
   |
   v
Service Layer
   |
   v
Repository
   |
   v
PostgreSQL
```

Do not put complex business rules directly inside route handlers.

------------------------------------------------------------------------

# 15. Database Design

Core entities should include at minimum:

``` text
organizations
sites
buildings
floors
locations

users
roles
permissions
user_roles
role_permissions
user_scopes

equipment_types
equipment
equipment_parameters
equipment_parameter_values

pm_plans
pm_schedules
pm_checklists
pm_checklist_items

work_requests
work_orders
work_order_tasks
work_order_measurements
work_order_parts
work_order_labor

spare_parts
warehouses
stock_balances
stock_transactions
suppliers

alarms
alarm_events

energy_readings
telemetry_readings

attachments
notifications
audit_logs
```

Rules:

-   Use UUIDs for externally exposed entity identifiers where
    appropriate.
-   Use timestamps consistently.
-   Add created_at and updated_at to mutable entities.
-   Use soft deletion only where business/audit requirements justify it.
-   Use foreign keys.
-   Add appropriate indexes.
-   Use database constraints for critical invariants.
-   Never rely solely on application validation for data integrity.

------------------------------------------------------------------------

# 16. Security Requirements

Security is mandatory, not optional.

## Authentication

Prefer:

``` text
OAuth2 / OIDC
+
Short-lived access token
+
Rotating refresh token
+
MFA-ready
```

If local password authentication is used:

-   Hash with Argon2id
-   Never store plaintext passwords
-   Enforce password policy
-   Rate-limit authentication attempts
-   Support password reset securely

## Authorization

Every protected API endpoint must enforce:

``` text
Authentication
+
Permission
+
Scope
```

Example:

``` text
Technician A
Role: Technician

Permissions:
asset.view
work_order.view
work_order.execute
inspection.execute

Scope:
Building A
```

Technician A must not gain access to Building B merely by modifying a
URL or API parameter.

## Session / Token Security

-   Prefer HttpOnly Secure cookies where appropriate.
-   Use SameSite protection.
-   Short access-token lifetime.
-   Refresh-token rotation.
-   Revocation support.
-   Do not put sensitive tokens in URLs.
-   Never log tokens.

## API Security

-   HTTPS only in production
-   CORS allowlist
-   Security headers
-   CSP
-   Request validation
-   Rate limiting
-   Payload size limits
-   Pagination limits
-   File upload restrictions
-   Consistent error handling
-   Do not expose stack traces in production

## Database Security

-   Least-privilege DB user
-   Separate migration privileges from runtime privileges when practical
-   Private database network
-   Encrypted backups
-   Strong credentials
-   No public database exposure

## File Security

For PDF/photos/documents:

``` text
Upload
  |
  v
Size validation
  |
  v
MIME/type validation
  |
  v
Malware scan
  |
  v
Private object storage
  |
  v
Signed URL
```

Never make sensitive maintenance documents publicly accessible by
default.

------------------------------------------------------------------------

# 17. Audit Trail

Audit important business/security actions.

Record:

-   User
-   Timestamp
-   Action
-   Resource
-   Resource ID
-   Before state where appropriate
-   After state where appropriate
-   IP/device metadata where legally and operationally appropriate
-   Result

Examples:

``` text
LOGIN_SUCCESS
LOGIN_FAILED
USER_CREATED
ROLE_CHANGED
ASSET_UPDATED
WO_ASSIGNED
WO_COMPLETED
WO_CLOSED
INVENTORY_ISSUED
INVENTORY_ADJUSTED
PM_COMPLETED
ALARM_ACKNOWLEDGED
```

Audit records should be append-oriented and protected from ordinary user
modification.

------------------------------------------------------------------------

# 18. Notifications

Support:

-   In-app notifications
-   Email-ready architecture
-   Future WhatsApp/SMS integration if required

Notification triggers:

-   PM due
-   PM overdue
-   Critical alarm
-   WO assignment
-   WO overdue
-   Failed inspection
-   Low stock
-   Approval required
-   Equipment critical state

Use Celery for asynchronous notification delivery.

------------------------------------------------------------------------

# 19. Reporting & KPI

Implement:

## Maintenance KPI

-   MTBF
-   MTTR
-   Availability
-   Downtime
-   PM Compliance
-   Corrective vs Preventive ratio
-   Maintenance cost
-   Work order aging

## HVAC KPI

-   Cooling capacity
-   Energy consumption
-   COP
-   EER where applicable
-   Delta T
-   Runtime
-   Temperature trend
-   Humidity
-   Pressure
-   Airflow

Reports should support filters by:

``` text
Site
Building
Floor
Asset
Equipment Type
Date Range
Technician
Maintenance Type
Status
```

------------------------------------------------------------------------

# 20. Background Jobs

Use Celery + Redis for:

-   PM schedule generation
-   Overdue detection
-   Notifications
-   Report generation
-   Data aggregation
-   Alarm processing when appropriate
-   Scheduled cleanup
-   Backup verification workflows where applicable

Never block API requests with long-running tasks.

------------------------------------------------------------------------

# 21. API Design

Use versioned APIs:

``` text
/api/v1/auth
/api/v1/users
/api/v1/roles
/api/v1/locations
/api/v1/assets
/api/v1/maintenance
/api/v1/work-orders
/api/v1/inspections
/api/v1/inventory
/api/v1/alarms
/api/v1/energy
/api/v1/reports
```

API requirements:

-   OpenAPI documentation
-   Consistent response format
-   Consistent error format
-   Pagination
-   Filtering
-   Sorting
-   Search
-   Permission enforcement
-   Idempotency for appropriate write operations

------------------------------------------------------------------------

# 22. Deployment

Production deployment should use Docker.

Example services:

``` text
frontend
backend
worker
scheduler
postgres
redis
minio
reverse-proxy
```

Optional future services:

``` text
mqtt
iot-ingestion
timescaledb
prometheus
grafana
```

Do not add optional services until they solve an actual requirement.

For VPS management, EasyPanel can be used as the deployment/control
layer.

------------------------------------------------------------------------

# 23. Environment & Secrets

Use environment variables/secrets for:

``` text
DATABASE_URL
REDIS_URL
JWT_SECRET
OIDC_CLIENT_SECRET
S3_ACCESS_KEY
S3_SECRET_KEY
SMTP credentials
MQTT credentials
```

Rules:

-   Never commit secrets.
-   Never hardcode credentials.
-   Use separate secrets for development/staging/production.
-   Rotate credentials periodically.
-   Do not print secrets in logs.

------------------------------------------------------------------------

# 24. Testing

Minimum testing strategy:

## Backend

-   Unit tests
-   Service tests
-   API integration tests
-   Authorization tests
-   Scope/isolation tests
-   Database tests

## Frontend

-   Component tests for critical components
-   Form validation tests
-   Permission-based UI tests
-   End-to-end tests for critical workflows

## Critical E2E workflows

``` text
Login
Create Asset
Create PM Plan
Generate WO
Assign Technician
Perform Inspection
Issue Spare Part
Complete WO
Approve/Close WO
View Audit Log
```

Security tests must explicitly verify that users cannot access resources
outside their assigned scope.

------------------------------------------------------------------------

# 25. Observability

Implement:

-   Structured logs
-   Request IDs / correlation IDs
-   Health endpoint
-   Readiness endpoint
-   Error tracking
-   Metrics
-   Worker monitoring

Recommended:

``` text
Prometheus
+
Grafana
```

Metrics examples:

``` text
API latency
API error rate
HTTP request count
Worker queue depth
Failed jobs
Database connections
CPU
Memory
Disk
```

------------------------------------------------------------------------

# 26. Backup & Disaster Recovery

PostgreSQL backup must be automated.

Requirements:

-   Scheduled backups
-   Retention policy
-   Off-server backup
-   Encryption
-   Restore testing
-   Documented recovery procedure

A backup is not considered reliable until restore has been tested.

------------------------------------------------------------------------

# 27. Development Roadmap

## Phase 1 --- Core

``` text
Authentication
RBAC
Users
Locations
Assets
Dashboard
```

## Phase 2 --- Maintenance

``` text
PM
Checklist
Work Requests
Work Orders
Technicians
Inspections
```

## Phase 3 --- Inventory

``` text
Spare Parts
Warehouse
Stock Transactions
Reservation
FIFO
Maintenance Cost
```

## Phase 4 --- Analytics

``` text
MTBF
MTTR
Availability
PM Compliance
Downtime
Cost
HVAC KPI
```

## Phase 5 --- Monitoring

``` text
Real-time state
Alarm
Threshold
Energy
WebSocket
```

## Phase 6 --- IoT/BMS

``` text
MQTT
Device identity
Telemetry ingestion
Time-series data
BMS integration
Predictive analytics
```

------------------------------------------------------------------------

# 28. Coding Standards

Always:

-   Use TypeScript strict mode.
-   Use Python type hints.
-   Use Ruff/Black-compatible Python formatting.
-   Use ESLint/Prettier-compatible frontend formatting.
-   Keep functions small and focused.
-   Prefer explicit names.
-   Avoid duplicated business logic.
-   Add tests for critical business rules.
-   Add database migrations for schema changes.
-   Never modify production schema manually without a migration.
-   Never bypass authorization for convenience.

------------------------------------------------------------------------

# 29. UX Standards

Every screen must define:

``` text
Loading
Empty
Error
Success
Permission denied
```

Destructive actions:

``` text
Delete Asset
Delete User
Stock Adjustment
Cancel WO
```

must require confirmation and explain consequences where appropriate.

For technicians:

-   Large touch targets
-   Minimal typing
-   Fast checklist entry
-   Camera/photo support
-   Clear status
-   Offline-ready architecture should be considered for future PWA
    implementation

------------------------------------------------------------------------

# 30. Non-Goals for MVP

Do not implement these unless explicitly required:

-   Full microservice architecture
-   Complex AI
-   Predictive maintenance
-   Advanced BMS protocol support
-   Large-scale IoT ingestion
-   Complex accounting/ERP
-   Over-engineered event sourcing

Build the core HVAC operational system first.

------------------------------------------------------------------------

# 31. Final Product Architecture

``` text
                 HVAC MANAGEMENT PLATFORM

                         Next.js
                    Minimalist UI
                          |
                 REST / WebSocket
                          |
                       FastAPI
                          |
        +-----------------+------------------+
        |                 |                  |
    PostgreSQL          Redis              MinIO
        |                 |                  |
        |               Celery               |
        |                 |                  |
        +-----------------+------------------+
                          |
                   HVAC Business Core
                          |
       +------------------+------------------+
       |                  |                  |
     Assets          Maintenance        Inventory
       |                  |                  |
       |             PM / WO / QC          FIFO
       |                  |                  |
       +------------------+------------------+
                          |
                  Monitoring / Alarm
                          |
                  Energy / Analytics
                          |
                    Future IoT/BMS
                          |
                         MQTT
```

# 32. AI Coding Agent Instructions

When implementing this project:

1.  First inspect the existing repository before changing anything.
2.  Do not rewrite working modules unnecessarily.
3.  Follow the established architecture and naming conventions.
4.  Implement one bounded module at a time.
5.  Before coding a new feature, identify:
    -   database entities
    -   API endpoints
    -   permissions
    -   scope rules
    -   UI screens
    -   background jobs
    -   audit requirements
    -   tests
6.  Every new protected endpoint must include authorization.
7.  Every new entity must define its scope/isolation behavior.
8.  Every important mutation must produce an audit event.
9.  Every schema change must have an Alembic migration.
10. Every critical business workflow must have automated tests.
11. Do not introduce a new dependency when an existing dependency
    already solves the problem.
12. Prefer simple, maintainable solutions over premature abstraction.
13. Keep the MVP deployable with Docker and EasyPanel.
14. Never expose secrets, internal stack traces, database credentials,
    or private files.
15. When an architectural decision is significant, document the
    rationale in the project documentation.

# 33. Definition of Done

A feature is considered complete only when:

-   Database schema is implemented
-   Migration exists
-   API is implemented
-   Authorization is implemented
-   Scope/isolation is enforced
-   Frontend UI is implemented
-   Loading/error/empty states exist
-   Audit behavior is implemented where applicable
-   Validation exists
-   Tests exist for critical behavior
-   Documentation is updated
-   Docker deployment still works
-   No secrets are committed
-   Existing functionality is not broken
