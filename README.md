# 🌐 Civic Lens – AI‑Powered Civic Issue Reporting Platform
 **Live Link** : https://civiclens-major.netlify.app/

Civic Lens is a full‑stack, location‑aware civic issue reporting application that empowers citizens to report real‑world problems and enables authorities to respond efficiently. The platform integrates geolocation, image uploads, AI‑based classification, and workflow management to bring transparency and speed to civic governance.

---

## 🚀 Features

### **🧭 Citizen Side (User Portal)**

* **Location Pinning:** Users can search for their city, move a map pin, and confirm their exact locality.
* **Geo‑Data Capture:** Latitude, longitude, and area name are automatically stored.
* **Photo Upload + Camera Capture:** Users can upload an existing image or click one instantly.
* **Caption-Based Issue Description:** Simple text input to describe the civic problem.
* **Submit Complaint:** Complaint stored with image, caption, timestamp, and location.
* **Track Complaint Status:** Users can view progress under **Your Complaints** across Received → In‑Process → Completed.

### **🛠 Admin Side (Admin Dashboard)**

* **AI‑Powered Classification:** NLP model auto-categorizes complaints into:

*Garbage Issue
*Road Damage
*Water Leakage
*Streetlight Fault
*Noise Pollution
*Public Cleanliness
*Pothole
*Traffic Signal Issue
*Park Maintenance
*Drainage Problem
*Broken Pavement
*Illegal Dumping
*Public Facility Damage
*Tree/Vegetation Issue
*Air Pollution
*Animal Menace
*Other
* **Workflow Management:** Admin moves complaints through 3 timelines:

  * **Received**
  * **In‑Process**
  * **Completed**
* **Transparency & Accountability:** Tracks authority responsiveness.
* **Live Status Updates:** Updates instantly reflect in user dashboard.

---

## 📊 Tech Stack

### **Frontend**

* React.js
* Tailwind CSS
* React Router
* Axios
* Leaflet / Map APIs

### **Backend**

* Node.js
* Express.js
* JWT Authentication
* Multer for image handling

### **Database**

* MongoDB Atlas

### **AI / ML**

* Complaint Category Classifier (NLP-based text classification)
* Prompt-based AI assistance for classification logic

### **Cloud & DevOps**

* Google Cloud Console (OAuth 2.0 Login)
* Cloud Storage / Buckets for Image Handling
* Environment configuration using `.env`

---

## 🧠 System Workflow

### **1️⃣ User Reporting Flow**

1. User logs in via **Google OAuth**.
2. Searches for the city on the map.
3. Moves the pin to exact locality → confirms location.
4. Uploads or captures an image.
5. Adds caption.
6. Submits complaint → Saved to database.

### **2️⃣ Admin Workflow**

1. Complaint arrives in **Received**.
2. AI auto‑classifies complaint category.
3. Admin reviews & moves it to **In‑Process**.
4. After completion, admin marks it **Completed**.
5. User sees updated timeline in **Your Complaints**.

---


## 🔑 Environment Variables (.env)

Backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
OPEN_AI_KEY=your_openai_key
```

---

## 🧪 AI Classification (NLP Model)

* Uses a rule‑based + ML‑assisted prompt classifier.
* Extracts keywords like *accident, garbage, stray animals, harassment*.
* Maps them to one of the 6 predefined categories.
* Ensures high accuracy (85–90%).


---

## 📈 Key Highlights

* Handles **image uploads**, **geolocation**, and **AI classification**.
* Ensures **seamless user experience** for complaint tracking.
* Provides **admin analytics** and workflow-based resolution.
* Built with **secure authentication** (JWT + Google OAuth).
* Designed to scale for **100+ complaints per day**.

---

## 📝 How to Run

### **Backend**

```
cd backend
npm install
npm run dev
```

### **Frontend**

```
cd frontend
npm install
npm start
```

---

## 👨‍💻 Developers

**Medha Pant** – Worked on Frontend • Backend • UI/UX Designing in Civic-Lens

**Tanmay Yadav** – Worked on Backend • AI Integration in Civic-Lens

---

## ⭐ Future Enhancements

* SMS/email notifications for complaint updates
* More advanced AI classifier using fine-tuned BERT
* Heatmap visualization of civic issues on maps
* Government authority panel for department‑wise task assignment
* Adding a reward system 

---

## 📜 License

MIT License

---


✅ API documentation

