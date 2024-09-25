# Club Membership Message Board

This project is a private message board where users can sign up, become members, and post messages. Users without membership can view messages but
cannot see the author's name or timestamp. Membership can be obtained by entering a secret passcode. Admin users can manage the messages, including
deleting them.

## Features

- **User Authentication**: Secure user sign-up and login system using Passport.js with bcrypt password hashing.
- **Role-Based Access**:
    - Regular users can create messages, but only members can view the author's name and timestamp.
    - Admins can delete messages.
- **Membership System**: Users can join the "club" by entering a secret passcode, allowing them to see full message details.
- **Admin Privileges**: Admins can be assigned either during sign-up or via a secret passcode and have additional privileges like deleting messages.
- **Messages**: Users can create messages with a title, timestamp, and text content. The messages are visible to everyone but without revealing the
  author to non-members.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js
- **Database**: PostgreSQL
- **Security**: Bcrypt for password hashing
- **Frontend**: EJS templates
- **Deployment**: PaaS (Railway, Heroku, or another platform)

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js
- PostgreSQL
- npm (Node Package Manager)

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/club-message-board.git
   cd club-message-board
   ```
2. Install dependencies:
    ```bash
   npm install
   ```
3. Set up the PostgreSQL database:
    - Add a ```.env``` file to configure your database connection:
    ```bash
    DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/yourdb
    SECRET=yourSecretKey
    ```
4. Start the app:
    ```bash
   npm start
    ```
5. Visit the app at ```http://localhost:3000```.

## Feature Breakdown

### User Authentication

- Sign-up and Login forms built with **Passport.js**.
- Passwords are hashed using **bcrypt**.
- User sign-up includes validation and a ```confirmPassword``` field for secure password creation.

### Membership

- Users sign up but are not automatically granted membership status.
- A secret passcode is required to join the "club" and gain member privileges.
- Members can see the author and timestamp of messages.

### Messages

- Members can create new messages with a title, text, and a timestamp.
- Messages are stored in the PostgreSQL database, and only members can see the author’s information.

### Admin Privileges

- Admins have the ability to delete messages.
- Admin status can only be granted admins.

## Endpoints

- ```/```: Home page displaying all messages. Non-members cannot see author details.
- ```/sign-up```: Sign-up form for new users.
- ```/login```: Login form for existing users.
- ```/logout```: Logout users and redirect to ```/``` route.
- ```/become-member```: Membership page where users can enter the secret passcode to join the club.
- ```/messages/new```: Form for creating a new message (only visible to logged-in users).
- ```/messages/delete/:id```: Admin route for deleting messages (only visible to admins).

## Security

- Passwords are hashed with **bcrypt** for secure storage.
- Input validation and sanitization are done using **express-validator** to prevent SQL injection and XSS attacks.

## Future Improvements

- Add more robust error handling.
- Implement pagination for messages.
- Enhance the UI/UX with better styling and responsiveness.

## Licence

This project is licensed under the MIT License

