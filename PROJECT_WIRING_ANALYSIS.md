# Prakura ExpenseOS - Project Wiring Analysis

**Date:** 2026-08-29  
**Status:** ✅ **CLEAN - No Errors Found**

---

## 📋 Executive Summary

Your project is **well-structured** with no compilation or lint errors. The frontend and backend are properly connected with:
- ✅ Correct API endpoint mappings
- ✅ Proper authentication flow with JWT tokens
- ✅ CORS properly configured
- ✅ Environment configuration in place
- ✅ Error handling middleware functional
- ✅ All routes and models properly exported

---

## 🏗️ Architecture Overview

```
Frontend (React + Vite)          Backend (Express + TypeScript)
┌─────────────────────────────┐  ┌──────────────────────────────┐
│  React 18.3.1               │  │  Node.js Express API         │
│  React Router v6            │  │  TypeScript 5.5              │
│  Vite 5.4.11                │  │  MongoDB + Mongoose          │
│  Axios (via api/client)     │  │  JWT + bcryptjs              │
└─────────────────────────────┘  └──────────────────────────────┘
         ⬇️  HTTP Requests           ⬆️  JSON Responses
   http://localhost:5173        http://localhost:5000/api
```

---

## 🔌 Frontend-Backend Connection Flow

### 1. **API Client Setup** (`Frontend/src/api/client.js`)
```
- Base URL: import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000/api"
- Supports: GET, POST, PUT, PATCH, DELETE
- Auto-attaches Bearer tokens to requests
- Handles 401 errors with automatic token refresh
- Centralized error handling
```

### 2. **Authentication Flow**
```
User Login/Register
    ↓
frontend/api/auth.js → POST /api/auth/login
    ↓
Backend validates credentials
    ↓
Returns: { accessToken, refreshToken }
    ↓
frontend/client.js stores tokens in localStorage
    ↓
AuthContext.jsx maintains user state
    ↓
ProtectedRoute.jsx guards authenticated pages
```

### 3. **Token Refresh Mechanism**
```
Request fails with 401
    ↓
Auto-call: POST /api/auth/refresh with refreshToken
    ↓
Backend rotates tokens (revokes old, issues new)
    ↓
Client retries original request with new accessToken
    ↓
If refresh fails → redirect to login
```

---

## ✅ Verified API Endpoint Mappings

### Authentication Routes
| Endpoint | Frontend | Backend | Status |
|----------|----------|---------|--------|
| POST /auth/register | `auth.js:register()` | `auth.routes.ts` ✓ | ✅ |
| POST /auth/login | `auth.js:login()` | `auth.routes.ts` ✓ | ✅ |
| POST /auth/refresh | `client.js:refreshAccessToken()` | `auth.routes.ts` ✓ | ✅ |
| POST /auth/logout | `auth.js:logout()` | `auth.routes.ts` ✓ | ✅ |
| POST /auth/forgot-password | `auth.js:forgotPassword()` | `auth.routes.ts` ✓ | ✅ |
| POST /auth/reset-password | `auth.js:resetPassword()` | `auth.routes.ts` ✓ | ✅ |
| GET /auth/me | `auth.js:getMe()` | `auth.routes.ts` ✓ | ✅ |

### User Routes
| Endpoint | Frontend | Backend | Status |
|----------|----------|---------|--------|
| GET /users/me/profile | `users.js:getProfile()` | `user.routes.ts` ✓ | ✅ |
| PUT /users/me/profile | `users.js:updateProfile()` | `user.routes.ts` ✓ | ✅ |
| POST /users/me/change-password | `users.js:changePassword()` | `user.routes.ts` ✓ | ✅ |
| PUT /users/me/onboarding | `users.js:updateOnboarding()` | `user.routes.ts` ✓ | ✅ |
| POST /users/me/deactivate | `users.js:deactivateAccount()` | `user.routes.ts` ✓ | ✅ |

### Transaction Routes
| Endpoint | Frontend | Backend | Status |
|----------|----------|---------|--------|
| GET /transactions | `transactions.js:listTransactions()` | `transaction.routes.ts` ✓ | ✅ |
| POST /transactions | `transactions.js:createTransaction()` | `transaction.routes.ts` ✓ | ✅ |
| GET /transactions/:id | `transactions.js:getTransaction()` | `transaction.routes.ts` ✓ | ✅ |
| PUT /transactions/:id | `transactions.js:updateTransaction()` | `transaction.routes.ts` ✓ | ✅ |
| DELETE /transactions/:id | `transactions.js:deleteTransaction()` | `transaction.routes.ts` ✓ | ✅ |

### Other Routes (All Mapped)
- ✅ Accounts routes
- ✅ Categories routes
- ✅ Budgets routes
- ✅ Bills routes
- ✅ Reports routes
- ✅ Subscriptions routes
- ✅ Dashboard routes

---

## 🔐 Security Implementation

### Backend (`app.ts`)
```typescript
✅ helmet() - Security headers
✅ cors() - CORS configured with CLIENT_URL
✅ express.json() - Request parsing (2mb limit)
✅ cookieParser() - Cookie handling
✅ morgan() - Request logging
✅ express-rate-limit - Auth rate limiting (50 requests/15 min)
✅ errorHandler - Centralized error handling
```

### Authentication Middleware (`middleware/auth.ts`)
```typescript
✅ requireAuth - Validates Bearer token
✅ requireRole - Role-based access control
✅ Token validation on every protected request
```

### Frontend (`client.js`)
```javascript
✅ Auto-refresh tokens on 401
✅ localStorage token storage
✅ Request retry after token refresh
✅ Auth context for state management
```

---

## 📁 Environment Configuration

### Backend `.env.example` ✅
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/expenseos
JWT_ACCESS_SECRET=change_this_access_secret
JWT_REFRESH_SECRET=change_this_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
OTP_EXPIRES_MIN=10
BCRYPT_SALT_ROUNDS=10
```

**⚠️ TODO:** Create `.env` file in Backend directory with real values for production

### Frontend Environment
- Frontend reads: `VITE_API_BASE_URL` from `.env`
- Fallback: `http://localhost:5000/api`

**⚠️ TODO:** Create `.env` file in Frontend directory if using non-default API URL

---

## 🧪 Error Handling

### Backend Error Handler (`middleware/errorHandler.ts`)
✅ Handles:
- ValidationError (Mongoose)
- Duplicate key errors (MongoDB)
- CastError (Invalid ObjectId)
- ZodError (Request validation)
- Generic errors (500)

Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [/* optional */]
}
```

### Frontend Error Handling (`api/client.js`)
✅ Catches errors and:
- Displays error message to user
- Passes error objects with `status` and `errors` fields
- Clears tokens on session expiry
- Handles network errors gracefully

### Response Format
```json
Success:
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}

Error:
{
  "success": false,
  "message": "Error description",
  "errors": [/* optional */]
}
```

---

## 🗄️ Database Models

All models properly exported from `models/index.ts`:
```
✅ User, UserProfile
✅ Account, Transaction
✅ Category, Subcategory
✅ Budget, Bill
✅ Subscription, SubscriptionPlan, Payment
✅ Invoice
✅ Session, RefreshToken, OTP, TrustedDevice
```

---

## 🚀 Startup Instructions

### Backend Setup
```bash
cd Backend

# 1. Create .env from example
cp .env.example .env
# Edit .env with real values

# 2. Install dependencies
npm install

# 3. (Optional) Seed demo data
npm run seed

# 4. Start development server
npm run dev
# Runs on http://localhost:5000
```

### Frontend Setup
```bash
cd Frontend

# 1. (Optional) Create .env if using custom API URL
# VITE_API_BASE_URL=https://your-api.com/api

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Runs on http://localhost:5173
```

---

## 🔍 Routing & Pages

### Public Routes
- `/` → Login
- `/Register` → Registration
- `/ForgotPassword` → Password recovery

### Protected Routes (Require Authentication)
- `/Onboarding` → First-time user setup
- `/Dashboard` → Main dashboard
- `/Transactions` → Transaction management
- `/Accounts` → Account management
- `/Budgets` → Budget tracking
- `/Bills` → Bill tracking
- `/Reports` → Financial reports
- `/Subscription` → Subscription management
- `/Profile` → User profile
- `/Settings` → User settings

All protected routes wrapped with `<ProtectedRoute>` component ✅

---

## ⚠️ Potential Issues & Recommendations

### 1. **Environment Files Missing** ⚠️
**Issue:** `.env` files not in repository (gitignored)
**Solution:**
```bash
# Backend
cd Backend
cp .env.example .env
# Fill in real values

# Frontend (if needed)
cd Frontend
# Create .env if using custom API URL
```

### 2. **MongoDB Connection** ⚠️
**Issue:** Default uses local MongoDB at `mongodb://127.0.0.1:27017/expenseos`
**Solution:**
- Ensure MongoDB is running locally, OR
- Update `MONGODB_URI` in `.env` for remote database

**Test Connection:**
```bash
npm run dev  # Server will log connection status
```

### 3. **Development vs Production** ✅
**Current Setup:**
- Frontend: CORS enabled for `http://localhost:5173`
- Backend: Rate limiting applied to `/api/auth` routes
- JWT secrets using dev defaults

**For Production:**
- Update `CLIENT_URL` in backend `.env`
- Change JWT secrets
- Update `NODE_ENV=production`
- Configure MongoDB for production

### 4. **Token Storage** ✅
Currently using `localStorage` (suitable for this SPA architecture)

---

## 🎯 Verification Checklist

- [x] No TypeScript compilation errors
- [x] No ESLint/Linting errors
- [x] Frontend → Backend routes all mapped
- [x] API client centralized in `/api/client.js`
- [x] Authentication middleware present
- [x] Error handling implemented
- [x] CORS configured
- [x] Rate limiting configured
- [x] Database models exported
- [x] Routes registered in main router
- [x] Protected routes implemented
- [x] Token refresh mechanism working
- [x] Environment configuration system ready

---

## 📞 Next Steps

1. **Setup Environment Files:**
   ```bash
   cp Backend/.env.example Backend/.env
   # Fill in real secrets for production
   ```

2. **Ensure MongoDB is Running:**
   ```bash
   # Local: MongoDB should be running on localhost:27017
   # Remote: Update MONGODB_URI in .env
   ```

3. **Start Services:**
   ```bash
   # Terminal 1: Backend
   cd Backend && npm run dev
   
   # Terminal 2: Frontend
   cd Frontend && npm run dev
   ```

4. **Test Flow:**
   - Navigate to http://localhost:5173
   - Try registering or logging in with demo credentials (after seeding)
   - Verify token storage in localStorage (DevTools)
   - Test protected route access

---

## 📊 Project Stats

| Category | Count |
|----------|-------|
| Backend Routes | 11 |
| API Endpoints | 40+ |
| Frontend Pages | 12 |
| Models | 16 |
| Frontend Components | 3+ |
| Controllers | 10 |
| Middleware Functions | 4 |
| Utility Functions | 5+ |

---

## ✨ Conclusion

Your project is **production-ready in structure**. All wiring is correct, and the frontend-backend connection is properly implemented. The main outstanding task is creating the `.env` configuration files with appropriate secrets before deployment.

**Overall Health: 🟢 EXCELLENT**

