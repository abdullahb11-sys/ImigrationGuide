# Server Setup Guide

## Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
MONGODB_URI=mongodb://localhost:27017/imi_guide
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the server:
```bash
npm run dev
```

## Features Added

- User authentication (login/signup)
- Protected profile routes
- Profile picture upload
- Immigration-specific profile fields
- JWT token-based authentication 