# 🚀 StackIt Quick Start Guide

Your StackIt Q&A platform is now ready! Here's how to get it running:

---

## 1. **Set Up the Database**

Open **PowerShell** and run:
```powershell
<code_block_to_apply_changes_from>
```
- Enter your MySQL password when prompted.
- This will create the database, tables, and insert sample data.

---

## 2. **Start the Backend Server**

In **PowerShell** (or CMD), run:
```powershell
cd C:/Odoo/StackIt/Backend
npm start
```
- This will start the Node.js/Express backend on port 8080.

---

## 3. **Open the Website**

Open your browser and go to:
```
http://localhost:8080
```
- You should see the StackIt homepage.
- You can log in with:
  - Username: `admin` | Password: `password`
  - Username: `demo`  | Password: `password`

---

## 4. **Try It Out**

- **Ask a question** (when logged in)
- **Answer a question**
- **Log in / Register** new users

---

## 5. **For Development**

- To auto-restart the backend on changes:
  ```powershell
  npm run dev
  ```
- Edit frontend files in `Frontend/` and refresh your browser.

---

## 6. **Troubleshooting**

- If you get a database error, check your MySQL is running and credentials in `Backend/config/db.config.js` are correct.
- If port 8080 is in use, change it in `Backend/server.js`.
- If the site doesn’t load, check the terminal for errors and the browser console for missing files.

---

**You’re ready!**  
Just follow these steps and your StackIt Q&A platform will be up and running.  
Let me know if you hit any issues or want to add features! 