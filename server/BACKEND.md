# SVN Jewellery Backend

The backend is built with **Node.js, Express, TypeScript, and MongoDB (Typegoose)**. It uses a layered architecture to keep routing, business logic, and database interactions separate.

## Folder Structure
```text
/server
├── src
│   ├── config        # Environment configurations (if any)
│   ├── controllers   # HTTP request/response handling (no business logic)
│   ├── middleware    # Auth (JWT verification), Error handling, Zod validation
│   ├── models        # Typegoose MongoDB models (User, RefreshToken, Order)
│   ├── repositories  # Database queries (mongoose wrappers)
│   ├── routes        # Express routing
│   ├── services      # Business logic (Auth, Checkout)
│   ├── types         # Shared TypeScript interfaces
│   ├── utils         # Helpers (logger, tokens, custom errors)
│   ├── validators    # Zod schemas for request validation
│   ├── app.ts        # Express setup and middleware registration
│   └── server.ts     # Database connection and entry point
```

## Architecture Flow
Every request follows this path:
**Route** ➔ **Validation Middleware** ➔ **Controller** ➔ **Service** ➔ **Repository** ➔ **Database**

## Authentication Flow
1. **Signup/Login**: The client sends credentials to `/api/auth/login`.
2. **Tokens**: The backend issues a short-lived **JWT Access Token** (returned in JSON) and a long-lived **Refresh Token** (set as an `httpOnly` secure cookie).
3. **Protected Routes**: The frontend attaches the Access Token in the `Authorization: Bearer <token>` header. The `protect` middleware verifies it.
4. **Refresh**: When the Access Token expires, the frontend calls `/api/auth/refresh`. The backend reads the `httpOnly` cookie, rotates it in the database, and issues a new Access Token.
5. **Logout**: Calling `/api/auth/logout` deletes the refresh token from the database and clears the cookie.

## Testing Stripe Webhooks Locally
Stripe payments are handled via Stripe Checkout. The webhook at `/api/webhooks/stripe` listens for successful payments to fulfill orders.

To test this locally:
1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Log in to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local backend:
   ```bash
   stripe listen --forward-to localhost:5000/api/webhooks/stripe
   ```
4. The CLI will print a webhook signing secret (starts with `whsec_`). Copy it.
5. Add it to your `.env` file in the `server` folder:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
6. You can trigger a test event manually:
   ```bash
   stripe trigger checkout.session.completed
   ```
