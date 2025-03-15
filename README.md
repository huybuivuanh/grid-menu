# Font Selection & Grid Menu App

## Overview
This project provides an **interactive font selection system** with:
- **Grid-Based Font Selection** for quick browsing.
- **Dropdown-Based Font Selection** with recent tracking.
- **Hover Previews** for real-time font visualization.
- **Google Font API Integration** for dynamic rendering.
- **Experiment Mode** to compare selection speed and accuracy.

## Installation
### 1 Clone the Repository
```bash
git https://git.cs.usask.ca/wgv256/cmpt-481-project.git
cd cmpt-481-project
```
### 2 Install Dependencies
```bash
npm install
```
### 3 Start the Development Server
```bash
npm run dev
```
Runs at **http://localhost:3000**.

## Tools & Technologies
- **React.js** (Frontend UI)
- **Vite** (Fast development server)
- **Tailwind CSS** (Styling)
- **React Router** (Navigation)
- **Google Fonts API** (Dynamic font loading)
- **Firebase (Optional)** (Data storage)

## Features
### **Grid & Dropdown Font Selection**
- Grid layout for easy browsing.
- Dropdown with recent font tracking & pagination.
Hover previews update the text area in real-time.

### **Experiment Mode (Evaluation Methodology)**
- Users select a **randomly assigned font**.
- Measures **selection speed & error rate**.
- Supports **50, 300, and 1000 fonts**.
- Data can be logged for analysis.

## Evaluation & Analysis
- **Independent Variable:** Menu Type (Dropdown vs. Grid)
- **Dependent Variables:** Selection Time, Error Rate
- **Experiment Setup:**
  - Participants select fonts under a time constraint.
  - Errors & time taken are recorded.
  - Data can be exported for statistical analysis.

## Resources
- [Google Fonts API](https://fonts.google.com/)
- [React.js Docs](https://reactjs.org/docs/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs/)

## Team Members
- **Vu Anh Huy Bui** (wgv256)
- **Carter Dansereau** (qwx762)
- **Conner LeBlanc** (col397)

## License
Open-source under the **MIT License**.

