# ExpenseOS API Documentation

Base URL: `http://localhost:5000/api`

All responses follow:
```json
{ "success": true, "data": { ... }, "message": "..." }
```
or on error:
```json
{ "success": false, "message": "...", "errors": [ ... ] }
```

Authenticated routes require header: `Authorization: Bearer <accessToken>`

---

## Auth — `/api/auth`

### POST /auth/register
- Auth: No
- Body: `{ name, email, password }`
- Response: `{ user, accessToken, refreshToken }`
- Errors: `409` email already registered, `422` validation

### POST /auth/login
- Auth: No
- Body: `{ email, password }`
- Response: `{ user, accessToken, refreshToken }`
- Errors: `401` invalid credentials

### POST /auth/refresh
- Auth: No (uses refresh token body)
- Body: `{ refreshToken }`
- Response: `{ accessToken, refreshToken }` (rotated — old refresh token is revoked)
- Errors: `401` invalid/expired/revoked token

### POST /auth/logout
- Auth: No (send refresh token to revoke it)
- Body: `{ refreshToken }`
- Response: `null`

### POST /auth/forgot-password
- Auth: No
- Body: `{ email }`
- Response: always `200` (does not reveal whether the email exists). In non-production, response `data.devOtp` contains the OTP for testing since no email provider is wired up.

### POST /auth/reset-password
- Auth: No
- Body: `{ email, otp, newPassword }`
- Response: `null`
- Errors: `400` invalid/expired OTP, `429` too many attempts

### GET /auth/me
- Auth: Yes
- Response: `{ user, profile }`

### POST /auth/devices
- Auth: Yes
- Body: `{ deviceId, label? }`
- Response: trusted device record

### GET /auth/sessions
- Auth: Yes
- Response: list of active sessions

### DELETE /auth/sessions/:sessionId
- Auth: Yes
- Response: `null` — revokes the session and its refresh tokens

---

## Users — `/api/users`

### GET /users/me/profile
- Auth: Yes → `{ user, profile }`

### PUT /users/me/profile
- Auth: Yes
- Body: any of `{ name, phone, dateOfBirth, currency, locale, timezone, avatarUrl, address, occupation, monthlyIncome, notificationPreferences }`

### POST /users/me/change-password
- Auth: Yes
- Body: `{ currentPassword, newPassword }`
- Errors: `401` current password incorrect

### PUT /users/me/onboarding
- Auth: Yes
- Body: `{ completed?, step?, goals?, plan? }`

### POST /users/me/deactivate
- Auth: Yes — soft-deactivates the account

---

## Accounts — `/api/accounts`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/accounts?includeArchived=true` | Yes | — | list user's accounts |
| POST | `/accounts` | Yes | `{ name, type, institution?, accountNumberLast4?, currency?, balance?, creditLimit?, color?, icon?, notes? }` | |
| GET | `/accounts/:id` | Yes | — | |
| PUT | `/accounts/:id` | Yes | partial account fields | |
| PATCH | `/accounts/:id/archive` | Yes | — | soft archive |
| DELETE | `/accounts/:id` | Yes | — | `409` if transactions exist; archive instead |

`type`: `bank | credit_card | cash | wallet | investment | loan | other`

---

## Transactions — `/api/transactions`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/transactions?page=&limit=&account=&category=&type=&status=&search=&startDate=&endDate=&sort=` | Yes | paginated, returns `{ items, pagination }` |
| POST | `/transactions` | Yes | body: `{ account, type, amount, category?, subcategory?, transferToAccount?, description?, merchant?, date?, status?, tags? }` — updates account balance(s) atomically |
| GET | `/transactions/:id` | Yes | |
| PUT | `/transactions/:id` | Yes | reverses old balance effect, applies new one, atomically |
| DELETE | `/transactions/:id` | Yes | reverses balance effect atomically |

`type`: `income | expense | transfer` (transfer requires `transferToAccount`)

---

## Categories — `/api/categories`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/categories?kind=income\|expense` | Yes | system categories + user's own |
| POST | `/categories` | Yes | `{ name, kind, icon?, color? }` |
| PUT | `/categories/:id` | Yes | only user-owned categories are editable |
| DELETE | `/categories/:id` | Yes | archives |
| GET | `/categories/subcategories?category=` | Yes | |
| POST | `/categories/subcategories` | Yes | `{ category, name }` |

---

## Budgets — `/api/budgets`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/budgets` | Yes | each item includes computed `spent`, `remaining`, `percentUsed`, `periodStart/End` |
| POST | `/budgets` | Yes | `{ name, category?, amount, period, startDate?, endDate?, rollover?, alertThresholdPercent? }` |
| GET | `/budgets/:id` | Yes | |
| PUT | `/budgets/:id` | Yes | |
| DELETE | `/budgets/:id` | Yes | archives |

`period`: `weekly | monthly | yearly | custom`

---

## Bills — `/api/bills`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/bills?status=` | Yes | |
| POST | `/bills` | Yes | `{ name, account?, category?, amount, dueDate, frequency?, autopay?, reminderDaysBefore?, notes? }` |
| GET | `/bills/:id` | Yes | |
| PUT | `/bills/:id` | Yes | |
| DELETE | `/bills/:id` | Yes | |
| POST | `/bills/:id/pay` | Yes | body `{ accountId? }` — creates a linked expense transaction, debits the account, advances `dueDate` for recurring bills, atomically |

`status`: `upcoming | due | overdue | paid | cancelled` · `frequency`: `once | weekly | monthly | quarterly | yearly`

---

## Reports — `/api/reports`

All accept optional `?startDate=&endDate=` (ISO dates; default: last 6 months).

| Method | Path | Response |
|---|---|---|
| GET | `/reports/summary` | `{ income, expense, net, savingsRate, transactionCount, startDate, endDate }` |
| GET | `/reports/spending-by-category` | `[{ categoryId, name, color, icon, total, count }]` |
| GET | `/reports/income-vs-expense` | `[{ month, income, expense }]` |
| GET | `/reports/net-worth-trend` | `[{ month, netChange, cumulative }]` |

---

## Subscriptions — `/api/subscriptions`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/subscriptions/plans` | Yes | active `SubscriptionPlan`s |
| GET | `/subscriptions/current` | Yes | latest subscription for the user |
| POST | `/subscriptions/subscribe` | Yes | `{ planId, method? }` — atomically creates `Subscription` + `Payment` + `Invoice`, cancels prior active plan |
| POST | `/subscriptions/:id/cancel` | Yes | sets `cancelAtPeriodEnd: true` |
| GET | `/subscriptions/payments` | Yes | payment history |
| GET | `/subscriptions/invoices` | Yes | invoice list |
| GET | `/subscriptions/invoices/:id` | Yes | single invoice |

---

## Dashboard — `/api/dashboard`

### GET /dashboard/summary
- Auth: Yes
- Response: `{ totalBalance, monthIncome, monthExpense, monthNet, accountsCount, accounts, recentTransactions, upcomingBills, budgets, onboarding }`

---

## Error reference

| Status | Meaning |
|---|---|
| 400 | Bad request / bad reference |
| 401 | Missing, invalid, or expired auth |
| 403 | Insufficient permissions |
| 404 | Resource not found (or not owned by the caller) |
| 409 | Conflict (duplicate, or dependent data exists) |
| 422 | Validation failed (`errors` array has field-level detail) |
| 429 | Rate limited |
| 500 | Unexpected server error |
