## Basic Money Transfer App
This is a simple full-stack money transfer application that allows users to sign up, sign in, and send money to other existing users. Upon signing up, users receive a random amount of money as a starter in their account to perform transfers.

## Features
- User Authentication: Sign up and sign in with a secure authentication process.
- Money Transfer: Send money to other users within the app.
- Random Initial Balance: New users are credited with a random initial balance for testing.
- User List: Only transfer money to existing users within the app.
## Tech Stack
- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
## Installation
1. Clone the repository:

- git clone https://github.com/aditixxwayal/basic-moneyTransfer.git

- cd basic-moneyTransfer

2. Navigate to the backend folder and install dependencies:

- cd backend

- npm install

3. Set up your MongoDB connection:

- Create a .env file in the backend directory.
- Add the following environment variables:


  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

4. Start the backend server:

- npm run dev

5. Navigate to the frontend folder and install dependencies:

- cd frontend

- npm install

6. Start the frontend:

- npm run dev


The frontend will run on http://localhost:5173, and the backend will run on http://localhost:3000.

## Usage
- Sign Up: Create a new account. Upon successful registration, you'll receive a random balance in your account.
- Sign In: Log in with your credentials.
- Transfer Money: Send money to existing users by entering their username and the amount you wish to transfer.
- View Balance: Keep track of your account balance.

## Contributing
Feel free to fork this repository, create a new branch, and submit a pull request with improvements or new features.
