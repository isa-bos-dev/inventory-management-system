<div align="center">

[![English](https://img.shields.io/badge/English-4A90E2?style=for-the-badge&logoColor=white)](README.md)
[![Spanish](https://img.shields.io/badge/Spanish-FFDE59?style=for-the-badge&logoColor=white)](README_es.md)

# 📦 Sistema de Gestión de Inventario

Una aplicación moderna y full-stack de gestión de inventario y stock, diseñada para controlar catálogos de productos, administrar niveles de existencias y agilizar las operaciones de inventario. Está construida con un backend robusto basado en **ASP.NET Core Web API** y un frontend reactivo desarrollado con **Angular**.

<!-- Insignias del stack tecnológico -->
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

## 🚀 Descripción general

Esta aplicación ofrece una solución integral para la gestión de inventario. Permite a las empresas supervisar los niveles de stock, administrar categorías de productos, controlar los movimientos de entrada y salida, y auditar los registros de inventario de forma eficiente.

---

## ✨ Funcionalidades

- **Gestión de productos y stock:** Crear, consultar, actualizar y administrar artículos del inventario con supervisión del stock en tiempo real.
- **Categorización y filtrado:** Agrupar productos por categoría mediante búsquedas y consultas rápidas.
- **Paginación del lado del servidor:** Obtener datos con alto rendimiento mediante consultas SQL optimizadas con `AsNoTracking` y lógica de paginación.
- **Arquitectura RESTful:** Estructura clara de endpoints siguiendo las convenciones REST y respuestas API consistentes.
- **Pruebas HTTP directas:** Soporte nativo para pruebas `.http`, configurado directamente en la solución para validar endpoints.

---

## 🛠️ Stack tecnológico

### Backend
- **Framework:** ASP.NET Core Web API (.NET 10)
- **ORM de base de datos:** Entity Framework Core (proveedor de SQL Server)
- **Base de datos:** Microsoft SQL Server / LocalDB
- **Arquitectura:** API REST basada en controladores con una capa de lógica de negocio

### Frontend
- **Framework:** Angular (Signals, componentes independientes)
- **Framework de interfaz:** Bootstrap 5
- **Estado y reactividad:** Angular Signals y observables de RxJS

---

## 🚦 Primeros pasos

### Requisitos previos
- <a href="https://dotnet.microsoft.com/" target="_blank" rel="noopener noreferrer">.NET SDK (v10.0 o superior)</a>
- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js (versión LTS)</a>
- <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer">Angular CLI</a>
- <a href="https://www.microsoft.com/sql-server/" target="_blank" rel="noopener noreferrer">SQL Server Express / LocalDB</a>

---

### Configuración del backend

1. Accede al directorio del backend:
 ```bash
   cd src/backend/InventoryWebApi
   ```

2. Ejecuta la API:

 ```bash
   dotnet run
   ```


## 📄 Licencia
Este proyecto está licenciado bajo **Todos los derechos reservados** únicamente para fines de demostración de portfolio. Consulta el archivo [LICENSE](LICENSE) para obtener más información.