# Draw App

This is a web-based drawing application built with Next.js, WebSocket, and Prisma.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [pnpm](https://pnpm.io/) (v7 or later)
- A running PostgreSQL database (or any database supported by Prisma)

## Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Priyesh1311421/draw-app.git
   cd draw-app
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```
3. **Set Up Environment Variables**
    Create a `.env` file in the root directory and add your database connection string and other environment variables. You can use the `.env.example` file as a reference.
    
    ```bash
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database>
    JWT_SECRET=your_jwt_secret
    ```
4. **Run Database Migrations**
    ```bash
    cd apps/http-backend
    pnpm prisma migrate dev
    ```
5. **Start the Application**
    Http Backend:
    ```bash
    cd apps/http-backend
    pnpm dev
    ```
    WebSocket Server:
    ```bash
    cd apps/ws-backend
    pnpm dev
    ```
    Frontend:
    ```bash
    cd apps/frontend
    pnpm dev
    ```
6. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000` to access the drawing application.
    

## Folder Structure
The project is structured as follows:

```
draw-app/
├── apps/
│   ├── http-backend/       # HTTP backend for authentication and API
│   ├── ws-backend/         # WebSocket backend for real-time communication
│   ├── frontend/           # Frontend application built with Next.js
├── packages/
│   ├── backend-common/     # Shared backend utilities
│   ├── db/                 # Prisma database client
|   ├── backend-common/     # Shared backend utilities
|   ├── common/             # Shared frontend and backend utilities

```


## Things to do
- [✔️] Implement the login and signup functionality in the frontend.
- [✔️] Change the ws url in backend after saving the token in local storage.
- [✔️] Implement the hardcoded drawing functionality using the classes in the frontend.
- [✔️] Implement the dashboard functionality in the frontend and backend.
