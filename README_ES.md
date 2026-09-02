<div align="center">

[![English](https://img.shields.io/badge/English-4A90E2?style=for-the-badge&logoColor=white)](README.md)
[![Spanish](https://img.shields.io/badge/Spanish-FFDE59?style=for-the-badge&logoColor=white)](README_ES.md)

# 📦 Sistema de Gestión de Inventario

Aplicación full-stack de control y gestión de inventario diseñada para administrar catálogos de productos, controlar existencias de stock y registrar movimientos. Desarrollada con un backend en **ASP.NET Core Web API** y un frontend reactivo en **Angular**.

<!-- Badges de Tecnologías -->
![.NET 10](https://img.shields.io/badge/.NET_10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_Web_API-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Microsoft SQL Server](https://img.shields.io/badge/SQL_Server-CC292B?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

---

## 🚀 Descripción General

Esta aplicación ofrece una solución integral de inventario para supervisar el stock disponible, categorizar artículos y mantener una trazabilidad clara de los productos del negocio.

---

## ✨ Características Principales

- **Gestión de Stock:** Registro, consulta y control de existencias de productos en tiempo real.
- **Paginación en Servidor:** Consultas SQL de alto rendimiento optimizadas mediante `AsNoTracking` y paginación por bloques.
- **Arquitectura RESTful:** Controladores estructurados con separación de lógica de negocio y respuestas tipadas.
- **Pruebas Nativas con Archivos HTTP:** Validación directa de endpoints mediante archivos `.http` integrados.

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** ASP.NET Core Web API (.NET 10)
- **ORM:** Entity Framework Core (Proveedor SQL Server)
- **Base de Datos:** Microsoft SQL Server / LocalDB
- **Arquitectura:** Controladores API con Capa de Negocio

### Frontend
- **Framework:** Angular (Signals, Standalone Components)
- **Framework UI:** Bootstrap 5
- **Estado y Reactividad:** Angular Signals y RxJS Observables

---

## 🚦 Requisitos Previos e Instalación

### Requisitos Previos
- [.NET SDK (v10.0+) ↗](https://dotnet.microsoft.com/)
- [Node.js (Versión LTS) ↗](https://nodejs.org/)
- [Angular CLI ↗](https://angular.dev/)
- [SQL Server Express / LocalDB ↗](https://www.microsoft.com/sql-server/)

---

### Configuración del Backend

1. Navega hasta la carpeta del backend:
 ```bash
   cd src/backend/InventoryWebApi
   ```

2. Inicia la API:

 ```bash
   dotnet run
   ```

## 📄 License
This project is licensed under **All Rights Reserved** for portfolio demonstration purposes only. See the [LICENSE](LICENSE) file for details.
