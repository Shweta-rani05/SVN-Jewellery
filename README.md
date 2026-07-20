# 💍 SVN Jewellery

<p align="center"> <b>Wear Your Glow </b> </p> <p align="center"> SVN Jewellery is a modern e-commerce platform designed to deliver an affordable luxury shopping experience through an elegant and responsive interface. Built using MERN + TypeScript, it showcases scalable architecture, smooth UI interactions, and real-world shopping workflows. </p>


🌟 Brand Identity

Inspired by the SVN monogram (S, V, N)

The brand reflects a legacy of elegance, strength, and individuality — brought together into a single identity.

✨ Tagline: Wear Your Glow

SVN represents:

Unity
Heritage
Timeless Beauty

## 🌟 The Brand Vision

Inspired by the **SVN** monogram (an interlocking combination of S, V, and N), the brand focuses on **demi-fine jewelry** that bridges the gap between daily wear and statement luxury. The tagline **"Wear Your Glow"** is the guiding principle behind the UI's ethereal, dark-mode aesthetic, utilizing deep navy and cobalt gradients.

The platform reflects luxury through:
Dark/Light premium UI
Elegant motion animations
Clean modern layout



💎 Key Features

Dynamic product variants
Persistent cart & wishlist
Type-safe architecture
Luxury motion UI
Real-world ecommerce logic
AI-powered Shopping Concierge

## 🚀 Live Demo

🌐 https://svn-jewellery.vercel.app/

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

| **Backend** | Node.js, Express, Typegoose (Mongoose with TS) |

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Typegoose](https://img.shields.io/badge/Typegoose-DD0031?style=for-the-badge)

| **Database** | MongoDB Atlas |

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

| **State Management** | Zustand (Lightweight & Persistent) |

![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/FramerMotion-0055FF?style=for-the-badge)

| **Animations** | Framer Motion (Luxury UI Micro-interactions) |

| **Cloud Services** | Cloudinary (Image Optimization), Stripe API (Payments) |

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

Others (Git and Github)

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## 💎 Key Technical Features

### 1. Advanced Engineering (MERN + TypeScript)

* **Dynamic Product Variants:** Engineered a robust data model using **Typegoose** to handle nested variants (e.g., ring sizes 5-9, metal finishes like 18K Gold vs. 925 Silver) with independent pricing and stock logic.
* **Type-Safe Architecture:** Centralized TypeScript interfaces for Products, Users, and Orders to ensure data integrity across the frontend and backend.
* **Persistent Cart & Wishlist:** Implemented using **Zustand** to ensure a seamless user experience that persists across page refreshes and sessions.

### 2. High-Conversion UI/UX

* **Visual Storytelling:** A custom **Framer Motion** SVG path animation on the homepage where the 'S', 'V', and 'N' merge to form the logo.
* **Scale Visualization:** Product Detail Pages (PDP) feature "The Hand Reference" images to help customers visualize the physical size of the jewelry.
* **Material Transparency:** Detailed technical specs (microns of plating, stone grade) provided for every piece to build buyer trust.

### 3. Business Logic & Reliability

* **Abandoned Cart Recovery:** Backend logic designed to trigger automated reminders for uncompleted checkouts.
* **AI Concierge:** Integrated intelligent virtual assistant offering a Style Finder, personalized recommendations, and a guided shopping flow for boutique-style customer support.

---


## 📂 Project Structure

```bash
/src
  /app          # Next.js 15 App Router (Pages & API Routes)
  /components
    /ui         # Reusable atomic components (Buttons, Modals, Inputs)
    /features   # Complex modules (Cart, FilterEngine, ProductCard)
  /hooks        # Custom hooks (useCart, useAuth, useLocalStorage)
  /lib          # Configurations (MongoDB connection, Stripe client, Cloudinary)
  /types        # Centralized TypeScript Interfaces (IProduct, IUser, ICart)

```

---

## 🤝 Contributing
This project was created to showcase full-stack development capabilities. Feedback, suggestions, and improvements are always welcome. Feel free to open an issue or submit a pull request.

---

**Designed & Developed with ❤️ by Shweta Rani**
