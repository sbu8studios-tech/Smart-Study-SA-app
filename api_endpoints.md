# SmartStudy SA API Endpoints

This document outlines the RESTful API endpoints for the SmartStudy SA application.

## Authentication Endpoints

These endpoints handle all aspects of user authentication, including registration, login, and session management.

### Email Authentication
-   `POST /api/auth/email/signup`
    -   Registers a new user with an email and password.
-   `POST /api/auth/email/signin`
    -   Authenticates a user and returns a session token.
-   `POST /api/auth/email/reset-password`
    -   Initiates the password reset process for a given email.
-   `POST /api/auth/email/verify-email`
    -   Verifies a user's email address using a token.

### Social Authentication
-   `POST /api/auth/social/:provider`
    -   Handles authentication via social providers (e.g., Google, Apple). The `:provider` parameter specifies the platform.

### Phone Authentication
-   `POST /api/auth/phone/send-otp`
    -   Sends a one-time password (OTP) to a user's phone number.
-   `POST /api/auth/phone/verify-otp`
    -   Verifies the OTP and authenticates the user.

### Session Management
-   `POST /api/auth/logout`
    -   Logs the user out and invalidates the current session.
-   `POST /api/auth/refresh-token`
    -   Uses a refresh token to obtain a new access token.
-   `GET /api/auth/session`
    -   Retrieves information about the current user's session.

## User Management Endpoints

These endpoints are for managing user-specific data like profiles and settings.

### User Profile
-   `GET /api/user/profile`
    -   Retrieves the profile information for the authenticated user.
-   `PUT /api/user/profile`
    -   Updates the profile information for the authenticated user.

### User Preferences
-   `GET /api/user/preferences`
    -   Retrieves the user's application preferences (e.g., theme, language).
-   `PUT /api/user/preferences`
    -   Updates the user's application preferences.

### Account Management
-   `DELETE /api/user/account`
    -   Permanently deletes the authenticated user's account and all associated data.