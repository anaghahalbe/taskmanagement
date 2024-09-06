# Task Management Application

## Overview

This is a full-stack task management application built with React for the frontend and Spring Boot for the backend. It allows users to register, log in, create tasks, set due dates, mark tasks as complete, and manage their task list.

## Features

- **User Registration and Login:** Secure user authentication with JWT (JSON Web Tokens).
- **Task Creation:** Users can create tasks with a name, description, due date, and completion date.
- **Task Listing:** View a list of all created tasks with their details.
- **Task Editing:** Update task information, including name, description, due dates, and completion status.
- **Task Deletion:** Remove tasks from the list.
- **Task Completion:** Mark tasks as completed.
- **User-Specific Tasks:** Each user can only view and manage their own tasks.

## Technologies Used

**Frontend:**

- React
- React Router
- Axios (for HTTP requests)
- Bootstrap (for styling)
- React DatePicker

**Backend:**

- Spring Boot
- Spring Security (for authentication and authorization)
- Spring Data JPA (for database interaction)
- MongoDB (for data storage)
- JWT (JSON Web Token) for authentication

## Project Structure

**Frontend (`frontend` directory):**

- `src/components`: Contains React components for login, registration, dashboard, and other UI elements.
- `src/services`: Contains services for handling API requests (e.g., `AuthService`, `TaskService`).
- `public`: Contains static assets like `index.html`.

**Backend (`backend` directory):**

- `src/main/java`: Contains Spring Boot application code, including controllers, services, and repositories.
- `src/main/resources`: Contains configuration files (e.g., `application.properties`).

## Getting Started

**Prerequisites:**

- Java Development Kit (JDK) 8 or higher
- Node.js and npm (or yarn)
- Maven (for building the backend)

**Backend Setup:**

1. Navigate to the `backend` directory.
2. Build the project using Maven: `mvn clean install`
3. Run the Spring Boot application: `mvn spring-boot:run`
   - The backend will start on port 8080 by default.

**Frontend Setup:**

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
   - The frontend will start on port 8081 by default.

**Accessing the Application:**

- Open your web browser and go to `http://localhost:8081`.

## API Documentation

(Provide details about your backend API endpoints, request/response formats, and authentication requirements.)

## Contributing

(If you want to encourage contributions, provide guidelines on how to contribute to the project.)

## License

(Specify the license under which your project is distributed.)
