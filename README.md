# **FINDR** - *Food Industry Network for Digital Recommendations*

## 🌐 Introduction

**FINDR\_IPD** is an academic project developed during college with the potential to evolve into a scalable startup. It aims to revolutionize how businesses and stakeholders in the food processing industry discover, evaluate, and acquire suitable machinery and infrastructure.

At its core, FINDR\_IPD leverages intelligent algorithms like **TF-IDF Vectorizer** and **Cosine Similarity** to recommend the most relevant machines based on user requirements. The platform also includes:

* A **Compare Feature** to help users evaluate multiple machines side by side.
* An integrated **Chatbot** that assists users by answering queries related to the recommended machines.

With access to larger datasets, this platform can scale into a comprehensive marketplace and advisory system. Acting as a **middleman for machinery supply**, FINDR\_IPD holds strong potential for a profitable business model, streamlining the supply chain between manufacturers and food-tech startups.

---

## 🔧 Features

* **Frontend**: Built with React.js and styled using Tailwind CSS for a clean, responsive UI.
* **Backend**: Flask-based backend that powers the recommendation logic and data management.
* **Recommendation Engine**: Provides dynamic suggestions based on content-based selections.
* **Modular Architecture**: Clear separation between frontend and backend for scalability.
* **Environment Management**: Uses Python virtual environments to isolate dependencies.

---

## 📆 Use Cases

* **Startup Support**: Entrepreneurs receive personalized recommendations for machines and processes based on their production goals.
* **Educational Tool**: Helps students and researchers understand machinery used in different food domains.
* **Vendor Discovery**: Can act as a marketplace bridge between machinery vendors and buyers.

---

## 📁 Project Structure

```
FINDR_IPD/
├── backend/
│   ├── app.py
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites

* Node.js (v14 or above)
* Python (v3.6 or above)
* npm (comes with Node.js)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv env
# Activate the environment
source env/bin/activate    # On Unix or MacOS
# OR
env\Scripts\activate       # On Windows

pip install -r requirements.txt
```

---

## 📊 Technologies Used

**Frontend:**

* React.js
* Tailwind CSS

**Backend:**

* Flask

**Others:**

* Python
* Node.js

---

## 📩 Contact

For suggestions, inquiries, or collaborations, contact [rachit404](https://github.com/rachit404).
