# MindVoice - Quick Start Guide

Get up and running with MindVoice in minutes!

## Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Basic familiarity with Next.js

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Niteshd05/MindVoice.git
cd MindVoice
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

The `.env.local` file contains:
- `DATABASE_URL` - SQLite database path (default: dev.db)
- `JWT_SECRET` - Authentication token secret
- `NODE_ENV` - Environment setting
- Other optional configuration variables

### 4. Initialize the Database
```bash
npx prisma migrate dev
```

This creates the SQLite database and runs migrations.

### 5. Start the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Application Flow

### First Time User
1. **Landing Page** - See the beautiful hero section with 3D elements
2. **Sign Up** - Create account via the modal
3. **Psychometric Test** - Complete 10 mental health questions
4. **Theme Assignment** - Your theme is automatically selected
5. **Chat Interface** - Start chatting with AI
6. **Dashboard** - View detailed analytics

### Returning User
1. **Login** - Sign in with email and password
2. **Chat or Dashboard** - Jump straight to conversation or analytics

## Testing the App

### Demo Credentials
Use any email/password combination during signup:
```
Email: test@example.com
Password: Test123!@#
```

### Test the Psychometric Questions
Click through the 10 questions to see how the scoring system works:
- Each answer scores 1-4
- Your average determines the theme
- See instant results after completion

### Explore the Dashboard
- View your wellness score
- See 10 wellness dimensions
- Check personalized insights
- Retake the assessment anytime

## Key Features to Try

### Clay Morphism Design
- Notice the soft, rounded corners on all cards
- Hover over buttons to see smooth animations
- Watch the subtle shadow effects on interactions

### 3D Elements
- 3D orb rotates smoothly on the landing page
- Floating particles create depth
- Smooth animations throughout

### Theme Switching
- Open sidebar on chat page
- Select different themes
- Watch colors update in real-time
- Theme persists across sessions

### Dynamic Dashboard
- Circular progress visualization
- 10 category scoring system
- Animated progress bars
- Personalized recommendations

## Available Scripts

### Development
```bash
npm run dev
```
Starts the Next.js dev server with HMR.

### Build
```bash
npm run build
```
Creates optimized production build.

### Production
```bash
npm run start
```
Runs the production server.

### Database
```bash
# View database in browser
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Database Errors
```bash
# Reset the database
npx prisma migrate reset

# Or delete and recreate
rm dev.db
npx prisma migrate dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3D Not Rendering
- Check browser console for errors
- Ensure WebGL is enabled
- Try a different browser
- Disable 3D with environment variable:
  ```
  NEXT_PUBLIC_DISABLE_3D=true
  ```

## Customization

### Change Default Theme
Edit `.env.local`:
```
NEXT_PUBLIC_DEFAULT_THEME="cool-slate"
```

Options: `warm-earth`, `cool-slate`, `soft-lavender`, `sage-green`

### Modify Questions
Edit `/lib/psychometric-questions.ts`:
```typescript
export const PSYCHOMETRIC_QUESTIONS: Question[] = [
  // Add or modify questions here
]
```

### Update Colors
Edit `/app/globals.css`:
```css
.theme-custom {
  --clay-primary: #YOUR_COLOR;
  --clay-secondary: #YOUR_COLOR;
  /* ... */
}
```

### Adjust Animations
Edit component files to modify Framer Motion configs:
```typescript
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }} // Change this value
```

## Performance Tips

1. **Disable 3D on Low-Power Devices**
   ```
   NEXT_PUBLIC_DISABLE_3D=true
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Compress before uploading

3. **Bundle Size**
   - Tree-shake unused components
   - Lazy load 3D scenes
   - Use dynamic imports for heavy libs

4. **Database Queries**
   - Add indexes for frequent queries
   - Use Prisma select to limit fields

## Deployment

### Vercel (Recommended)
```bash
vercel
```
Automatically detects Next.js and deploys.

### Other Platforms
1. Build the project: `npm run build`
2. Set environment variables
3. Run: `npm run start`

### Environment Variables for Production
- `DATABASE_URL` - Production database
- `JWT_SECRET` - Strong random string (generate with: `openssl rand -base64 32`)
- `NEXT_PUBLIC_API_URL` - Production API URL

## Next Steps

1. **Read the Documentation**
   - `README_MINDVOICE.md` - Full documentation
   - `IMPLEMENTATION_SUMMARY.md` - Technical details

2. **Explore the Code**
   - Check `/components` for reusable UI
   - Review `/lib` for utilities
   - Look at `/app` for page structure

3. **Customize for Your Use Case**
   - Modify questions for different assessments
   - Add more themes
   - Connect to real AI models
   - Add voice input/output

4. **Deploy Your Version**
   - Set up GitHub
   - Connect to Vercel
   - Deploy automatically on push

## Getting Help

- Check the troubleshooting section above
- Review code comments in key files
- Check browser console for errors
- Visit GitHub Issues for known problems
- Read Next.js documentation for framework questions

## What's Next?

- Implement real AI responses
- Add voice processing
- Connect to database for history
- Add user profiles
- Implement real JWT authentication
- Add email verification
- Create admin dashboard

---

Happy exploring! Enjoy the MindVoice experience.
