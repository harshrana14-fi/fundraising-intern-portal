# Fundraising Intern Portal

A full-stack web application built with Next.js 14 (App Router) and MongoDB for managing fundraising interns, tracking donations, and displaying leaderboards.

## Features

### ✅ Required Features
- **Authentication System**: Dummy login/signup (no real auth validation)
- **Dashboard**: 
  - Intern name display
  - Dummy referral code (e.g., yourname2025)
  - Total donations raised from backend
  - Rewards/unlockables section (static display)
- **REST API**: Returns dummy data for user info and donation amounts
- **Leaderboard**: Static leaderboard with dummy backend data

### 🚀 Bonus Features Implemented
- **MongoDB Integration**: Full database with user models
- **Responsive Design**: Mobile-friendly interface
- **Interactive UI**: Hover effects, animations, and modern design
- **Progress Tracking**: Visual progress bars for rewards
- **Rank Calculation**: Dynamic ranking system
- **Referral Code Generation**: Automatic generation based on username

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with HTTP-only cookies
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

## Project Structure

```
fundraising-intern-portal/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── user/
│   │   └── leaderboard/
│   ├── auth/                   # Authentication pages
│   ├── dashboard/              # Dashboard page
│   ├── leaderboard/            # Leaderboard page
│   ├── globals.css
│   ├── layout.js
│   └── page.js                 # Home page
├── components/                 # Reusable components
│   ├── AuthForm.js
│   ├── DashboardStats.js
│   ├── RewardsSection.js
│   ├── LeaderboardTable.js
│   └── Navigation.js
├── lib/                        # Utilities and database
│   ├── mongodb.js
│   ├── models/
│   │   └── User.js
│   └── utils.js
└── middleware.js               # Route protection
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fundraising-intern-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
I will give u those keys.

5. **Run the development server**
```bash
npm run dev
```

6. **Access the application**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user` - Get current user data
- `PUT /api/user` - Update user profile

### Leaderboard
- `GET /api/leaderboard` - Get top fundraisers
- `POST /api/leaderboard` - Create dummy data (for initial setup)

## Database Schema

### User Model
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email address
  password: String,       // Hashed password
  referralCode: String,   // Unique referral code
  totalDonations: Number, // Total amount raised
  rank: Number,           // Current leaderboard rank
  joinedDate: Date,       // Account creation date
  rewards: Array,         // Unlocked rewards
  isActive: Boolean       // Account status
}
```

## Features Walkthrough

### 1. Authentication System
- **Signup**: Create account with name, email, password
- **Login**: Authenticate with email and password
- **JWT Tokens**: Secure session management
- **Auto-redirect**: Authenticated users redirected to dashboard

### 2. Dashboard
- **Welcome Section**: Personalized greeting with user name
- **Stats Grid**: 
  - Referral code with copy functionality
  - Total donations raised with growth indicator
  - Current rank with suffix (1st, 2nd, 3rd, etc.)
  - Active days since joining
- **Quick Actions**: Buttons for common tasks
- **Responsive Design**: Works on all device sizes

### 3. Rewards System
- **Progress Tracking**: Visual progress bars for each reward
- **Achievement Levels**:
  - Welcome Badge ($0)
  - Rising Star ($1,000)
  - Fundraising Hero ($5,000)
  - Champion Fundraiser ($10,000)
  - Elite Contributor ($20,000)
  - Legendary Fundraiser ($50,000)
- **Visual Indicators**: Locked/unlocked states with icons
- **Next Reward Preview**: Shows progress to next milestone

### 4. Leaderboard
- **Top Performers**: Ranked list of all fundraisers
- **Visual Hierarchy**: Gold, silver, bronze styling for top 3
- **Current User Highlight**: Your position highlighted in blue
- **Achievement Badges**: Special badges for different rank ranges
- **Real-time Rankings**: Updates based on donation amounts

### 5. Navigation
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **User Profile Display**: Shows user avatar and referral code
- **Active Page Indicators**: Highlights current page
- **Logout Functionality**: Secure session termination

## Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

Or create a new account through the signup process.

## API Testing with Postman

### 1. Create a new user
```bash
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get user data
```bash
GET http://localhost:3000/api/user
Cookie: token=<your-jwt-token>
```

### 4. Get leaderboard
```bash
GET http://localhost:3000/api/leaderboard
Cookie: token=<your-jwt-token>
```

### 5. Initialize dummy data
```bash
POST http://localhost:3000/api/leaderboard
```

## Deployment

### 🌐 Live Deployment on Vercel
This project is deployed and live on Vercel.
🔗 Live URL: https://fundraising-intern-portal.vercel.app/

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies for token storage
- Input validation and sanitization
- Protected API routes

### Performance Optimizations
- MongoDB connection pooling
- Efficient database queries
- Optimized component rendering
- Image optimization with Next.js

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in `.env.local`
   - Verify network access for MongoDB Atlas

2. **JWT Token Issues**
   - Clear browser cookies
   - Check JWT_SECRET in environment variables
   - Verify token expiration settings

3. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check Node.js version compatibility
   - Verify environment variable names

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify PostCSS configuration

## Future Enhancements

### Potential Features
- **Real Payment Integration**: Stripe/PayPal integration
- **Email Notifications**: Achievement and milestone alerts
- **Social Sharing**: Share achievements on social media
- **Analytics Dashboard**: Detailed fundraising analytics
- **Team Management**: Organize interns into teams
- **Goal Setting**: Personal and team fundraising goals
- **Donation Tracking**: Detailed donation history
- **Export Functionality**: Export data to CSV/PDF

### Technical Improvements
- **Real-time Updates**: WebSocket integration for live updates
- **Push Notifications**: Browser push notifications
- **Offline Support**: Service worker implementation
- **Advanced Analytics**: Charts and graphs with Chart.js
- **Search Functionality**: Search and filter capabilities
- **Pagination**: Handle large datasets efficiently

## License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ using Next.js and MongoDB**
