# 🚀 Engagement API – Web3-Ready Content Interaction Platform

> A backend API that powers content engagement, tying interactions (likes, comments, views) to potential **rewards and on-chain incentives**.

> 🚧 **Status:** Actively in Development – New features, improvements, and Web3 reward integration are underway.

---

## 📦 Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT + Role-based Access Control
- **Cloud**: Cloudinary for media handling
- **Email Service**: Nodemailer for email notifications
- **Web3-ready**: Modular structure to integrate blockchain logic (reward distribution, token verification, etc.)

---

## 🧩 Features

- ✅ User registration & secure login (JWT)
- ✅ Role-based permissions (Admin, User, Creator, Moderator)
- ✅ Create and manage content (posts, media)
- ✅ Like, comment, and interact with content
- ✅ Cloud media upload support
- ✅ Email notifications
- ✅ Modular folder structure for scaling
- 🔜 Web3 reward triggers and token logic
- 🔜 Rate-limiting and spam detection (planned)

---

## 🧠 Architecture Decisions

- **Modular Folder Structure**  
  Designed using NestJS modules for separation of concerns and clean scaling. Example modules: `auth`, `users`, `engagement`, `media`.

- **MongoDB with Mongoose**  
  Chosen for its flexibility with unstructured data like posts, comments, media interactions. Indexes and lean queries are used for speed.

- **JWT for Auth**  
  JWT tokens support both access and refresh tokens with customizable expiry. Also easy to extend to external token systems like wallet auth.

- **Cloudinary for Media**  
  Fast, CDN-powered media upload and optimization. Ensures minimal load on your server.

- **Web3-Ready Layer (Planned)**  
  Project is structured to allow future integration of reward mechanisms like smart contract calls or token balances using a `reward.service.ts`.

---

## 🔐 Authentication Flow

1. User registers and receives a JWT token.
2. Token used for authenticated routes like posting content or interacting.
3. Admin and Moderator routes gated by roles using custom decorators (`@Roles()`).
4. Refresh token and session management planned for production-level security.

---

## 📁 Folder Structure (Simplified)




---

## 📌 TODO (Next Steps)

- [ ] Add blockchain reward trigger logic
- [ ] Introduce rate-limiting and throttling
- [ ] Improve tests and documentation
- [ ] Add pagination to all lists
- [ ] Add user profile image upload and update

---

## ✨ Why This Project?

This API is designed to serve platforms that want to reward meaningful engagement — ideal for:
- Web3 social apps
- Token-gated forums
- Engagement-for-reward marketplaces
- Future DAOs and creator economies

---

## 🤝 Contribution

Open to contributions and suggestions — feel free to fork and make PRs. More endpoints and blockchain support coming soon.


## 🧑‍💻 Author

**Victory Gray**  
Backend Developer | Problem Solver | API Architect  
[GitHub](https://github.com/vic-Gray) • [LinkedIn](https://www.linkedin.com/in/victory-gray-) • [Email](victorygray59@gmail.com)

---

