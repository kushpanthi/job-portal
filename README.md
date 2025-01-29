
# Job Portal Application

A full-stack web application connecting job seekers with employers. Built with Node.js, Express, MySQL, and EJS templating.


![Job Portal Screeshot](image.png)
Register page:
![Register](image-1.png)

Login page:
![Login](image-2.png)

Dashboard page:
![Dashboard](image-3.png)

There are many pages in the application, including: job seeker dashboard, job seeker login, job seeker register, Company dashboard, Company login, Company register, job posting, job seeker profile, job seeker resume and many more.

There are three main roles in the application:
1. **Job Seeker**: Users can create an account, upload their resume, and apply for jobs.
2. **Employer**: Users can create an account, post job openings, and view applications.
3. **Admin**: View job seeker account, company account, job postings, and manage the application.



## Features

- User authentication (Job Seeker & Employer)
- Job post creation and management
- Resume upload functionality
- Application tracking system
- Responsive web design
- Session-based authentication
- Secure password hashing
- RESTful API endpoints

## Technologies Used

## 🖥️ Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
- ![EJS](https://img.shields.io/badge/EJS-8A2BE2?style=for-the-badge&logo=javascript&logoColor=white)  

## ⚙️ Backend
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  

## 🗄️ Database
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)  

## 📦 Dependencies
- ![bcrypt](https://img.shields.io/badge/bcrypt-4A4A4A?style=for-the-badge&logo=npm&logoColor=white) 
- ![cookie-parser](https://img.shields.io/badge/cookie--parser-FF69B4?style=for-the-badge)  
- ![dotenv](https://img.shields.io/badge/dotenv-6E5494?style=for-the-badge) 
- ![express-session](https://img.shields.io/badge/express--session-000000?style=for-the-badge)  
- ![jsonwebtoken](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) 
- ![multer](https://img.shields.io/badge/multer-FF4500?style=for-the-badge)   
- ![mysql2](https://img.shields.io/badge/mysql2-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  
- ![nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) 

## 🛠️ Development Tools
- ![MySQL Workbench](https://img.shields.io/badge/MySQL%20Workbench-00758F?style=for-the-badge&logo=mysql&logoColor=white)  
- ![Sequelize CLI](https://img.shields.io/badge/Sequelize%20CLI-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)  

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kushpanthi/job-portal.git
   cd job-portal

2. **Install dependencies**

    ```bash
    npm install

3. **Database Setup**
   
- Create a new MySQL database and update the `config/config.js` file with your database credentials   
- Run the following command to create the database schema

- Create MySQL database:

    ```sql
    CREATE DATABASE job_portal;

- Run migrations:

    ```bash
    npx sequelize-cli db:migrate

4. **Configuration**

   Create .env file in root directory:

    ```.env
    PORT=3000
    JWT_SECRET=your_jwt_secret_key

6. **Start the development server**

    ```bash
    npm start

7. **Access the application**
   
   Visit http://localhost:3000 in your browser



