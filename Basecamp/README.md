# MyBaseCamp – A Modern Basecamp Clone

MyBaseCamp is a full-stack project management tool inspired by the original **Basecamp** (launched in 2004). It brings to-do lists, milestones, file sharing, messaging, and time tracking into a clean, fast, and delightful interface.

The project is built in **3 phases**. **Phase 1 is now complete!**

## Phase 1 – Core Features (Completed)

### User System
- Sign up / Sign in / Sign out
- View profile
- Delete own account (or any account as admin)

### Roles & Permissions
- Regular User
- Admin
- Promote user to admin
- Revoke admin rights

### Projects
- Create, read, update, delete projects
- Users see only their projects
- Admins can manage all projects

## Tech Stack

| Layer       | Technology                               | Notes                              |
|-------------|------------------------------------------|------------------------------------|
| Frontend    | React 19 + Vite + React Router v7        | Blazing fast dev experience        |
| UI          | MUI v7 + Emotion                         | Beautiful & accessible components  |
| Backend     | Node.js + Express                        | REST API                           |
| Database    | **SQLite** (better-sqlite3 / mySQLite)   | Lightweight, zero-config, file-based |
| Auth        | JWT + httpOnly cookies                   | Secure session management          |
| Validation  | Yup + Formik                             | Robust form handling               |
| HTTP        | Axios                                    | API calls                          |

## Setup & Run

### Frontend (this repo)
```bash
npm install
npm run dev
```
→ http://localhost:5173

### Backend (in `/server` or separate repo)
```bash
cd server
npm install
npm run dev
```
→ http://localhost:5000

## API Routes (Examples)

```
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/signout

GET    /api/users
PATCH  /api/users/:id/make-admin
PATCH  /api/users/:id/remove-admin

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## Roadmap

### Phase 2 (In Progress)
- To-do lists & task assignment
- Milestones
- File uploads
- Time tracking

### Phase 3
- Message board (Campfire-style)
- Real-time notifications (Socket.io)
- Email notifications
- Mobile app (React Native)

## Contributing

Feel free to fork, open issues, and send PRs!


---

**MyBaseCamp** – Simple. Fast. Powerful.
```
