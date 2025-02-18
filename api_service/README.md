# Service1

## Overview

Service1 is a Node.js application designed to handle various modules such as user management, transactions, authentication, roles, and games. It is built using Express.js and TypeScript, providing a robust and scalable architecture for web services.

## Features

- User management
- Transaction processing
- Authentication and authorization
- Role-based access control
- Game management

## Prerequisites

- Node.js (version 18 or later)
- Docker (for containerized deployment)

## Installation

### Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/service1.git
   cd service1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

### Docker Setup

1. **Build the Docker image:**

   ```bash
   docker build -t service1 .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3001:3001 service1
   ```

## Usage

- The application exposes its API at `http://localhost:3001/api`.
- You can access the health check endpoint at `http://localhost:3001/`.

## API Endpoints

- **GET /api/auth**: Authentication routes
- **GET /api/roles**: Role management routes
- **GET /api/users**: User management routes
- **GET /api/transactions**: Transaction routes
- **GET /api/games**: Game management routes

## Development

### Running Locally

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your browser and navigate to `http://localhost:3001`.

### Linting and Formatting

- **Lint the code:**

  ```bash
  npm run lint
  ```

- **Format the code:**

  ```bash
  npm run format
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [your-email@example.com].
