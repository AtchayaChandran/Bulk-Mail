# 📧 Bulk Mailer App  

A full-stack bulk email sending application built with React (frontend),
**Node.js + Express (backend), and **Nodemailer for email delivery.  
This project allows users to upload an Excel/CSV file of emails, compose
a custom message, and send emails to all recipients at once.  

---

## ✨ Features
- 📤 Upload email lists from Excel/CSV  
- ✍ Compose custom messages directly in the app  
- 👀 Preview email list before sending  
- 🚀 Send bulk emails using Nodemailer + Gmail SMTP  
- 🔒 Secure Gmail login via App Password  
- 🎨 Modern & responsive React UI with Tailwind CSS  

---

## 🛠 Tech Stack
Frontend: React, TailwindCSS, XLSX.js  
Backend: Node.js, Express.js  
Email Service: Nodemailer (Gmail SMTP)  
Other: CORS, FileReader API  

---

## ⚡ How It Works
1. Upload an .xlsx or .csv file with a column named Email.  
2. App extracts valid emails from the file.  
3. Type your message in the Compose Message section.  
4. Click Send Emails → Emails are sent to all recipients 🚀.

🚀 Live Demo: [Click Here](https://bulk-mail-frontend-j8uu.onrender.com/)
