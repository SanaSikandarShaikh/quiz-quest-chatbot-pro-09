
# Local Setup Guide for HP Victus Laptop

## Prerequisites
Make sure you have the following installed on your HP Victus laptop:
- Node.js (version 16 or higher)
- npm or yarn package manager
- VSCode (already mentioned you have this)

## Setup Instructions

### 1. Frontend Setup
1. Open VSCode and navigate to your project directory
2. Install frontend dependencies:
   ```bash
   npm install
   ```

### 2. Backend Setup
1. Install backend dependencies:
   ```bash
   npm install express cors nodemailer
   ```

### 3. Gmail Configuration
Your Gmail credentials are already configured in the server.js file:
- Email: mysteriousmee@gmail.com
- Password: _january252004_

**IMPORTANT SECURITY NOTE**: For production use, you should use Gmail App Passwords instead of your actual password. To set this up:
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password for this application
4. Replace the password in server.js with the App Password

### 4. Running the Application

#### Terminal 1 - Start Backend Server:
```bash
node server.js
```
You should see:
```
🚀 Local Backend Server running on http://localhost:8000
📁 Data stored in: ./local_data
📧 Email notifications configured for: mysteriousmee@gmail.com
```

#### Terminal 2 - Start Frontend Development Server:
```bash
npm run dev
```
You should see:
```
Local:   http://localhost:5173/
```

### 5. Testing the System
1. Open your browser and go to `http://localhost:5173`
2. Register a new user - you'll receive an email notification
3. Login with the registered user - you'll receive a login notification
4. All emails will be sent to mysteriousmee@gmail.com

### 6. Data Storage
- User data is stored locally in the `local_data` folder
- Chat history and sessions are also stored locally
- Registration and login data persists between sessions

### 7. Email Notifications
You will receive email notifications for:
- New user registrations
- User logins
- All notifications include user details, timestamps, and device info

## Troubleshooting
- If emails don't send, check your Gmail credentials in server.js
- Make sure both servers (frontend and backend) are running
- Check the terminal logs for any error messages
- Ensure your internet connection is active for email sending

## File Structure
```
project/
├── src/                 # Frontend React code
├── server.js           # Backend server with your Gmail config
├── local_data/         # Local database files (auto-created)
└── package.json        # Dependencies
```

Your HP Victus laptop is now configured to run the complete system locally with email notifications sent to mysteriousmee@gmail.com!
