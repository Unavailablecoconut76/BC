# Project setup

## PostgreSQL

| Setting | Value |
|---------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `Major` |
| User | `postgres` |
| Password | See `server/.env` (default `2004`) |
| Service | `postgresql-x64-18` |

Create the database in pgAdmin if it does not exist: **Databases → Create → Database** → name `Major`.

Copy environment variables for the backend:

```bash
cd server
copy .env.example .env
# Edit .env and set DB_PASSWORD
```

## Backend (database + API)

```bash
cd server
npm install
npm run db:test    # connection test (no HTTP server)
npm run dev        # starts API on http://localhost:5000
```

Expected `db:test` output:

- `PostgreSQL connection successful.`
- Connection info with database, user, version

Health endpoints:

- `GET http://localhost:5000/api/ping` — basic liveness
- `GET http://localhost:5000/api/db-health` — database connectivity

Expected `db-health` response:

```json
{ "connected": true, "database": "Major", "check": { "ok": 1 } }
```

After the first successful server start, Sequelize creates tables (`Users`, `Land_Parcels`, `Documents`, `Notifications`) visible in pgAdmin under **Major → Schemas → public → Tables**.

## Frontend

```bash
cd front
npm install
npm run dev        # http://localhost:5173
```

The frontend does not connect to Postgres directly; it talks to the backend on port 5000 when API routes are wired up.

---

## PostgreSQL installation notes

Postgres port: 5432  
Superuser password: 2004

Installation Directory: C:\Program Files\PostgreSQL\18  
Server Installation Directory: C:\Program Files\PostgreSQL\18  
Data Directory: C:\Program Files\PostgreSQL\18\data  
Database Port: 5432  
Database Superuser: postgres  
Operating System Account: NT AUTHORITY\NetworkService  
Database Service: postgresql-x64-18  
Command Line Tools Installation Directory: C:\Program Files\PostgreSQL\18  
pgAdmin4 Installation Directory: C:\Program Files\PostgreSQL\18\pgAdmin 4  
Stack Builder Installation Directory: C:\Program Files\PostgreSQL\18  
Installation Log: C:\Users\anshu\AppData\Local\Temp\install-postgresql.log

---

apache port: 8080
