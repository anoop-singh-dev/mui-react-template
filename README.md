
# 🚀 Dashboard Template (React + TypeScript + MUI + Jest)

This is a modern dashboard template built with **React**, **TypeScript**, **Material UI**, and **React Router v6+**, featuring **protected routes**, **lazy loading**, and **unit testing** via **Jest + React Testing Library**.

---

## 📁 Folder Structure

```
src/
│
├── components/              # Reusable UI components like Layout, Header, Sidebar
│   └── Layout.tsx
│
├── context/                 # Global providers, Auth context
│   └── AuthContext.tsx
│
├── pages/                   # All page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── User.tsx
│
├── routes/                  # Routing logic
│   ├── Routes.tsx           # All route definitions using Routes component
│   └── PrivateRoute.tsx     # Route wrapper to protect pages behind authentication
│
├── __tests__/ or components/__tests__/
│                            # All unit and integration tests
│   └── Header.test.tsx
│
├── App.tsx                  # App root, loads main route structure
├── main.tsx                 # ReactDOM render, app entry point
└── index.html               # HTML template
```

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/anoop-singh-dev/mui-react-template.git
cd dashboard-template

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

---

## 🧪 Running Tests

This project uses **Jest** and **React Testing Library**.

### Run all tests:

```bash
npm run test
```

### Run a specific test file:

```bash
npx jest src/components/Header.test.tsx
```

Make sure your `tsconfig.app.json` includes the following for compatibility:

```json
"jsx": "react-jsx",
"esModuleInterop": true
```

---

## 🔒 Protected Routes

Pages like `/dashboard` and `/user` are protected using a `<PrivateRoute />` component. If the user is not authenticated, they will be redirected to `/login`.

---

## 🌐 Routing

Routing logic is abstracted in `src/routes/Routes.tsx` using `Routes` and `Route` components from `react-router-dom`. This supports cleaner code and better scalability.

---

## 🔍 Sample Test

```tsx
// src/components/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header buttons', () => {
  render(<Header sidebarOpen={true} toggleSidebar={jest.fn()} />);
  expect(screen.getAllByRole('button')).toHaveLength(3);
});
```

---

## 💡 Future Improvements

- Role-based access control (`allowedRoles`)
- API integration (with Axios/React Query)
- Add loading states and error boundaries
- Responsive sidebar toggle on mobile

---

## 📄 License

MIT — feel free to use and adapt this template as needed.
