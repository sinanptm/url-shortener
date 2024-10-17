<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">URL Shortener - MERN Stack with NestJS Backend</h1>

<p align="center">
  A powerful and efficient URL shortener built with the MERN stack, featuring a <strong>NestJS backend</strong> for robust server-side operations.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#usage">Usage</a> •
  <a href="#learning-nestjs">Learning NestJS</a> •
  <a href="#contributing">Contributing</a> •
</p>

<p align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

## Features

- 🚀 Shorten long URLs into easily shareable links
- 📊 Track click statistics for each shortened URL
- 🔒 User authentication and personalized dashboard
- 🎨 Responsive and intuitive user interface
- ⚡ High-performance backend powered by NestJS

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: NestJS (Node.js framework), Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Learning NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="60" alt="Nest Logo" />
</p>

As a NestJS beginner, I am discovering how it differs from traditional Node.js frameworks like Express. With its modular architecture and TypeScript-first approach, NestJS makes it easier to build scalable and testable backend services. I chose NestJS for this project to gain hands-on experience in building a more structured backend.

Some key aspects I'm exploring with NestJS in this project:

- Modular architecture
- Dependency injection
- Decorators for routing and request handling
- Integration with MongoDB using Mongoose
- Authentication and authorization with Guards

To learn more about NestJS, check out the [official documentation](https://docs.nestjs.com/).



## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:300
   ```

4. Start the development servers:
   ```bash
   # Start the NestJS backend server
   cd server
   npm run start:dev

   # In a new terminal, start the React frontend
   cd client
   npm start
   ```
