# Person Management System - Full-Stack Docker Homework

## Project Description
This is a full-stack web application developed as a Person Management System. It allows users to create, read, update, and delete (CRUD) person records. The project demonstrates the full web development lifecycle, including frontend-backend integration, RESTful API design, database management, and containerization.

**Technologies Used:**
* **Frontend:** React (Vite)
* **Backend:** Node.js (Express)
* **Database:** PostgreSQL
* **Infrastructure:** Docker & Docker Compose

## Setup and Run Instructions
The entire system is completely containerized and can be launched with a single command.

1.  Clone this repository.
2.  Rename the `.env.example` file to `.env` and fill in your database credentials if necessary.
3.  Open your terminal in the project root directory and run:
    ```bash
    docker compose up --build
    ```
4.  Once the containers are running:
    * Access the Frontend UI at: `http://localhost:5173`
    * The Backend API runs on: `http://localhost:5000/api` (or the port you specified).

## API Endpoint Documentation
The backend provides a strictly RESTful API under the `/api` base path.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/people` | Get all registered people |
| GET | `/api/people/:id` | Get a single person by ID |
| POST | `/api/people` | Create a new person |
| PUT | `/api/people/:id` | Update an existing person's details |
| DELETE | `/api/people/:id` | Delete a person from the database |

## Screenshots
*(Screenshots of the application in action)*

### 1. Registration Form (/)
![Registration Form](./screenshots/form.png)

### 2. People List (/people)
![People List](./screenshots/list.png)

### 3. Delete Confirmation Dialog
![Delete Confirmation](./screenshots/delete-dialog.png)