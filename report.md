# AWAS_Project - JWT Forgery

### Authors:
 - Markus Vallin
 - Samu Hiltunen

## Overview

This project is designed to simulate a vulnerable web application, modeled after exercises seen in AWAS laboratories. The application is a message board that allows users to register, log in, post messages, and view their profile. It also contains an administrative interface intended to be restricted to users with elevated privileges.

## Attacker goal

The attacker’s goal is to gain unauthorized access to the admin interface by discovering and exploiting a leaked JWT secret, which is used to sign authentication tokens.

Once authenticated as an administrator, the attacker should be able to:

- View a list of all users
- Access private user information, including stored payment data
- Promote or demote users to/from admin status

The "flag" for the attacker is the ability to gain access to the admin interface and view sensitive information.

## Boundaries

Attackers should not attempt the following:

- Brute-forcing credentials: User passwords are trivial, but that’s not the focus.
- SQL injection or CSRF:  The app might be vulnerable to injection based attacks, but these are not the intended methods.

## Project overview

The project is built using packages that are commonly used in real-world Node.js web development. The stack was chosen to keep the setup simple and self-contained, while also allowing realistic authentication and routing behaviors.

### Technology stack

#### Backend

- Node.js
JavaScript runtime used for building scalable, server-side applications. It's fast, event-driven, and suitable for both REST APIs and real-time apps.

- Express.js
A minimal and flexible web framework for Node.js. It handles routing, middleware, static file serving, and API endpoints.

- SQLite
A simple, file-based relational database. Perfect for development and lab environments where a serverless database is convenient.

- JWT (jsonwebtoken)
The jsonwebtoken library is used for signing and verifying authentication tokens. JWTs encode user identity and permissions in a compact, signed format that’s sent with each request.

#### Frontend

- Static HTML/CSS/JavaScript
The frontend is built using pure client-side HTML and JS, hosted separately via a simple Express static server.

- Express Static Site Server
A second Express app serves all frontend files from a public/ directory. This separation mimics real-world deployments where the frontend and backend are decoupled.

- Frontend Features

    - User registration & login

    - JWT stored in localStorage

    - Message board with post/view functionality

    - Profile page to view user info

    - Admin portal with user management tools (role toggle & delete)

## The vulnerability

The project contains a misconfiguration vulnerability classified as Information Disclosure. Specifically, the .env file containing the JWT_SECRET is exposed due to incorrect static file serving. With this secret, an attack can forge a valid JWT token for an admin user, allowing unauthorized access to the admin interface.

- This violates the basic defense mechanisms of:

- Confidentiality (by exposing secrets to - unauthorized users)

- Authentication integrity (by allowing forged JWTs)

- Least privilege (by enabling privilege escalation via token forgery)

## Demonstration

You can watch a video demonstration of the attack here: [video](https://www.youtube.com/watch?v=example).

You can also find the source code for the project on GitHub: [GitHub]().