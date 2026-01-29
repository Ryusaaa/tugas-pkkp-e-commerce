# Cibaduyut Authentic Leather - Premium E-Commerce Platform

**Cibaduyut Authentic Leather** is a premium e-commerce solution dedicated to showcasing the finest leather craftsmanship from Cibaduyut, Bandung, Indonesia. Built with **Next.js**, **Node.js**, and **MySQL**, this application connects tradition with modern technology.

## 🌟 Overview

This project is a complete rebranding and comprehensive refactor of an electronics e-commerce template ("Singitronic") into a specialized leather fashion store. The goal was to create a digital storefront that reflects the elegance, durability, and heritage of Cibaduyut leather products.

## ✨ Key Features

-   **Premium Design System**: A custom "Cibaduyut" design language featuring a leather-inspired color palette (Browns, Golds, Creams), serif typography, and elegant spacing.
-   **Modern Tech Stack**: Built on the robust Next.js 14 App Router framework for optimal performance and SEO.
-   **Comprehensive Admin Dashboard**: A fully refactored admin panel for managing:
    -   **Products**: Inventory management with image uploads.
    -   **Orders**: Order tracking and status updates.
    -   **Categories**: Dynamic category management.
    -   **Users & Merchants**: Role-based management.
    -   **Bulk Upload**: CSV import functionality for products.
-   **Responsive Layout**: Mobile-first design ensuring a seamless experience across all devices.
-   **Localization**: Initialized with Indonesian (Bahasa Indonesia) language support for a local feel.

## 🛠️ Technology Stack

-   **Frontend**: Next.js (React), Tailwind CSS, DaisyUI, React Icons, Headless UI.
-   **Backend**: Node.js, Express.js.
-   **Database**: MySQL with Prisma ORM.
-   **Authentication**: NextAuth.js.
-   **State Management**: React Hooks & Context.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   MySQL Database

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/cibaduyut-authentic-leather.git
    cd cibaduyut-authentic-leather
    ```

2.  **Install dependencies (Root)**
    ```bash
    npm install
    ```

3.  **Install dependencies (Server)**
    ```bash
    cd server
    npm install
    ```

4.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
    DATABASE_URL="mysql://user:password@localhost:3306/cibaduyut_db"
    NEXTAUTH_SECRET=your_secret
    NEXTAUTH_URL=http://localhost:3000
    ```
    
    Create a `.env` file in the `server` directory:
    ```env
    DATABASE_URL="mysql://user:password@localhost:3306/cibaduyut_db"
    PORT=3001
    ```

5.  **Database Migration**
    From the `server` directory:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

6.  **Run the Application**
    
    **Backend:**
    ```bash
    cd server
    npm start
    ```
    
    **Frontend:**
    Open a new terminal in the root directory:
    ```bash
    npm run dev
    ```

7.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots

*(Placeholder for new screenshots of the Home, Shop, and Admin Dashboard)*

## 🤝 Contribution

This project is open-source. Feel free to fork, contribute, and submit pull requests to help preserve and promote local craftsmanship through technology.

---
*Dedicated to the artisans of Cibaduyut.*
