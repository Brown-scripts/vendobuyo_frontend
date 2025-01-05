# VendoBuyo Frontend

Welcome to the VendoBuyo Frontend repository! VendoBuyo is a multi-vendor e-commerce platform designed to facilitate seamless interactions between vendors and customers. This repository contains the frontend code for the platform, developed using React.

---

## Table of Contents

1. [About VendoBuyo](#about-vendobuyo)
2. [Project Architecture](#project-architecture)
3. [Getting Started](#getting-started)
4. [Repositories](#repositories)
5. [Connecting the Repos](#connecting-the-repos)
6. [Contributing](#contributing)
7. [License](#license)

---

## About VendoBuyo

VendoBuyo is a distributed system built using a microservices architecture. It is designed for scalability, reliability, and efficiency, making it suitable for modern e-commerce needs. The platform includes various features such as user authentication, advanced product search, order management, and notifications.

---

## Project Architecture

Below is an overview of the architecture for VendoBuyo:

![VendoBuyo Architecture](https://via.placeholder.com/800x400?text=Architecture+Diagram+Placeholder)

**Components:**
- **Frontend**: This repository, developed using React, serves as the user-facing interface.
- **API Gateway**: Routes and manages requests to the respective microservices.
- **Auth Service**: Handles user authentication and authorization.
- **Product Service**: Manages product-related functionalities, including CRUD operations.
- **Order Service**: Handles order processing and management.
- **Notification Service**: Sends notifications for events such as order updates.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- Access to the other microservices' repositories

### Installation

1. **Clone the Frontend Repository**:
   ```bash
   git clone https://github.com/Brown-scripts/vendobuyo_frontend.git
   cd vendobuyo-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000/`.

---

## Repositories

VendoBuyo is divided into multiple repositories. Here’s an overview:

1. **[Frontend Repository](https://github.com/Brown-scripts/vendobuyo_frontend)** (This repository)
   - Handles the user interface.

2. **[API Gateway](https://github.com/Brown-scripts/vendobuyo_api_gateway)**
   - Routes requests and handles communication between microservices.

3. **[Auth Service](https://github.com/Brown-scripts/vendobuyo_auth_service)**
   - Manages user authentication and roles.

4. **[Product Service](https://github.com/Brown-scripts/vendobuyo_product_service)**
   - Manages product-related data.

5. **[Order Service](https://github.com/Brown-scripts/vendobuyo_order_service)**
   - Handles orders and payment processing.

6. **[Notification Service](https://github.com/Brown-scripts/vendobuyo_notification_service)**
   - Sends email and SMS notifications.

---

## Connecting the Repos

To set up the entire VendoBuyo platform, follow these steps:

1. **Clone All Repositories**:
   ```bash
   git clone https://github.com/Brown-scripts/vendobuyo_frontend.git
   git clone https://github.com/Brown-scripts/vendobuyo-api_gateway.git
   git clone https://github.com/Brown-scripts/vendobuyo_auth_service.git
   git clone https://github.com/Brown-scripts/vendobuyo_product_service.git
   git clone https://github.com/Brown-scripts/vendobuyo_order_service.git
   git clone https://github.com/Brown-scripts/vendobuyo_notification_service.git
   ```

2. **Set Up Environment Variables**:
   - Refer to the README in each repository for the required `.env` variables.

3. **Start the Services**:
   - Start the microservices by navigating into each directory and running:
     ```bash
     npm start
     ```

4. **Run the Frontend**:
   - Ensure all services are running, then start the frontend as detailed above.

---

## Contributing

We welcome contributions to VendoBuyo! Please follow these steps:

1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
