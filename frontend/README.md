# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 📋 MERN Task Distributor

A full-stack MERN web application for Admins to create Agents, upload contact lists, and automatically distribute those contacts equally among the agents.

---

## 🔧 Features

- Admin authentication (JWT-secured)
- Add, view, and manage agents
- Upload and validate `.csv`, `.xlsx`, or `.xls` files
- Evenly distribute contacts among 5 agents
- View assigned tasks per agent
- TailwindCSS for a modern, responsive UI

---

## 📁 Folder Structure

mern-task-distributor/
├── backend/ # Node.js + Express + MongoDB
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── .env
│ └── server.js
├── frontend/ # React + Tailwind CSS
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ └── tailwind.config.js