<div align="center">

[![English](https://img.shields.io/badge/English-4A90E2?style=for-the-badge&logoColor=white)](README.md)
[![Spanish](https://img.shields.io/badge/Spanish-FFDE59?style=for-the-badge&logoColor=white)](README_es.md)

# 📦 Inventory Management System

A modern, full-stack Inventory and Stock Management Application designed to track product catalogs, manage stock levels, and streamline inventory operations. Built with a robust **ASP.NET Core Web API** backend and a reactive **Angular** frontend.

<!-- Tech Stack Badges -->
![.NET 10](https://img.shields.io/badge/.NET_10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_Web_API-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQL Server](https://img.shields.io/badge/Microsoft_SQL_Server-CC292B?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

---

## 🚀 Overview

This application provides an end-to-end inventory management solution. It enables businesses to monitor stock levels, manage product categories, track incoming and outgoing stock movements, and audit product inventory records efficiently.

---

## ✨ Features

- **Product & Stock Management:** Create, read, update, and manage inventory items with real-time stock monitoring.
- **Categorization & Filtering:** Group products by category with fast search and query operations.
- **Server-Side Pagination:** High-performance data retrieval using SQL queries optimized with `AsNoTracking` and pagination logic.
- **RESTful Architecture:** Clear endpoint structuring following REST conventions and consistent API response wrappers.
- **Direct HTTP Testing:** Native `.http` testing support configured directly inside the solution for endpoint validation.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** ASP.NET Core Web API (.NET 10)
- **Database ORM:** Entity Framework Core (SQL Server Provider)
- **Database:** Microsoft SQL Server / LocalDB
- **Architecture:** Controller-based REST API with Business Logic Layer

### Frontend
- **Framework:** Angular (Signals, Standalone Components)
- **UI Framework:** Bootstrap 5
- **State & Reactivity:** Angular Signals & RxJS Observables

---

## 🚦 Getting Started

### Prerequisites
- <a href="https://dotnet.microsoft.com/" target="_blank" rel="noopener noreferrer">.NET SDK (v10.0+)</a>
- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js (LTS version)</a>
- <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer">Angular CLI</a>
- <a href="https://www.microsoft.com/sql-server/" target="_blank" rel="noopener noreferrer">SQL Server Express / LocalDB</a>

---

### Backend Setup

1. Navigate to the backend directory:
 ```bash
   cd src/backend/InventoryWebApi
   ```

2. Run the API:

 ```bash
   dotnet run
   ```


## 📄 License
This project is licensed under **All Rights Reserved** for portfolio demonstration purposes only. See the [LICENSE](LICENSE) file for details.
