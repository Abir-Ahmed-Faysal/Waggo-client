# 🐾 Waggo – A Pet Adoption Platform

Waggo is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to connect pet seekers with animals in need of loving homes. This platform also facilitates donations for pet care, enabling compassionate contributions toward animals' well-being.

🌐 **Live Site:** [http://waggo.surge.sh](http://waggo.surge.sh)

---

## 🎯 Project Purpose

The goal of this project is to leverage modern web technologies to solve real-world issues by helping stray and rescued pets find permanent homes. Waggo provides an intuitive UI for browsing pets, requesting adoptions, creating/viewing donation campaigns, and managing all actions via user/admin dashboards.

---

## ✨ Key Features

### 🔓 Authentication & Authorization
- Email/password registration and login (with validation)
- Google and GitHub social login
- JWT-based secure authentication
- Role-based dashboard for Admin & Users
- Firebase Admin SDK for user role management

### 🐶 Pet Adoption System
- Add pets with image upload via imgbb
- View all pets in an infinite scroll grid
- Search and filter pets by category and name
- Request adoption with form modal
- Admin can mark pets as adopted or update/delete any pet

### 💸 Donation Campaigns
- Users can create donation campaigns with image, amount, and deadline
- Others can donate via secure Stripe payments
- View donators in modal
- Admin can pause/edit/delete any campaign
- Progress bar for donation amount

### 👥 Dashboards
**User Dashboard includes:**
- Add a Pet (with image and rich text editor)
- My Added Pets (update, delete, adopt)
- Adoption Requests (accept/reject)
- Create Donation Campaign
- My Campaigns (edit, pause, see donators)
- My Donations (see donations, request refund)

**Admin Dashboard includes:**
- All Users (promote to admin, ban optional)
- All Pets (update/delete/mark adopted)
- All Donations (pause/edit/delete)

### 🌈 UI/UX & Enhancements
- Fully responsive (Mobile, Tablet, Desktop)
- Light/Dark mode toggle using `next-themes`
- Clean and modern UI using **ShadCN + Radix UI**
- Skeleton loaders using `react-loading-skeleton`
- WYSIWYG Editor with React Quill for long descriptions
- Infinite Scroll with `react-intersection-observer`
- SweetAlert2 modals for confirm dialogs

---

## 🚀 Technology Stack

### 🖥 Frontend
- **React 19**, **Vite 7**
- **Tailwind CSS 4**, **ShadCN UI**
- **TanStack React Query 5**, **React Table 8**
- **Formik**, **Yup**, **React Hook Form**
- **React Router 7**, **React Select**, **Lottie-React**
- **React Icons**, **Lucide React**
- **React Toastify**, **SweetAlert2**
- **React Intersection Observer**
- **React Loading Skeleton**

### 🔐 Authentication
- **Firebase Auth + Admin SDK**
- **JWT Auth** (stored in localStorage)
- **Google & GitHub OAuth**

### 💳 Payments
- **Stripe.js + React-Stripe.js** for secure donation payments

### 🧾 Forms & Uploads
- **Formik / React Hook Form**
- **imgbb API** for image uploads
- **React Quill** as WYSIWYG editor

### 🗄️ Backend
- **Node.js**, **Express.js**
- **MongoDB Atlas** with Mongoose
- **Firebase Admin SDK**
- **Stripe API** integration

### 🔧 Developer Tools
- **ESLint**, **Prettier**, **clsx**
- **Tailwind Merge**, **CVA**, **Axios**

---

## 📁 Folder Structure (Simplified)

