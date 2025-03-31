📂 Project Structure(Imp fiels)
project-structure/
│myproject/
│-- backend/
│   ├── config/
│   │   ├── db.js
│   │   models/
│   │   ├── Item.js
│   ├── routes/
│   │   ├── Items.js            
│   ├── server.js      
│   ├── vercel.json          
│
│-- frontend/
│   ├── src/
│   │   ├── components/ 
│   │   │    ├── ItemForm.jsx/ 
│   │   │    ├── ItemTable.jsx/
│   │   ├── css/ 
│   │   │    ├── App.css/ 
│   │   │    ├── ItemForm.css/ 
│   │   │    ├── ItemTable.css/     
│   ├── App.js         
│   ├── index.js 
│   ├── index.css       
│
│-- README.md   


This is a full-stack application built using:

Frontend: React.js (Vercel deployment)

Backend: Node.js, Express.js (Render deployment)

Database: PostgreSQL (Hosted on Render)


Frontend (React.js):

React with functional components

Axios for API calls

React Router for navigation

Backend (Node.js + Express.js):

Express.js for API routes

PostgreSQL (pg package) for database connection

dotenv for environment variables

CORS configuration

Database (PostgreSQL):

Hosted on Render

CRUD operations managed with pg module


🚀 Features

Create, Read, Update, and Delete items

Secure API with CORS configuration

PostgreSQL database hosted on Render

Deployed frontend & backend using Vercel & Render