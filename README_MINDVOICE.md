# MindVoice - AI-Powered Mental Health Platform

A modern, clay morphism-styled mental wellness application featuring psychometric testing, AI-powered conversations, and emotional intelligence dashboards.

## Features

### 🎨 Clay Morphism Design
- Soft, organic UI with pottery-like aesthetic
- Warm, inviting color palettes with clay-inspired tones
- Smooth animations and micro-interactions throughout
- Responsive design for all devices

### 🧠 Psychometric Testing
- 10 comprehensive mental health assessment questions
- Dynamic theme assignment based on responses
- Real-time progress tracking
- Detailed score analysis and insights

### 💬 AI-Powered Chat Interface
- Dynamic theme-based conversation styles
- Intelligent message handling
- Real-time chat updates
- Personalized responses based on assessment results

### 📊 Interactive Dashboard
- Visual wellness score representation
- Category-based mental health tracking
- Animated progress indicators
- Personalized insights and recommendations
- Historical data visualization

### 🎭 Dynamic Theme System
Four distinct theme personas that adapt to user assessment:
- **Warm Earth**: For energetic and positive users
- **Cool Slate**: For balanced and grounded users
- **Soft Lavender**: For users needing gentle support
- **Sage Green**: For users on a growth journey

### 🌐 3D Experiences
- Animated 3D orb in hero section
- Rotating 3D scene with multiple geometric shapes
- Floating particle field animations
- Interactive canvas-based visualizations

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── chat/
│   │   └── page.tsx            # Chat interface
│   ├── dashboard/
│   │   └── page.tsx            # Analytics dashboard
│   ├── psychometric-test/
│   │   └── page.tsx            # Assessment page
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       └── signup/
│   └── globals.css             # Design tokens & clay morphism styles
│
├── components/
│   ├── 3d/
│   │   ├── AnimatedOrb.tsx      # 3D orb visualization
│   │   ├── FloatingParticles.tsx # Particle field
│   │   └── ThreeDScene.tsx      # Complex 3D scene
│   │
│   ├── ui/
│   │   ├── ClayCard.tsx         # Clay-styled card component
│   │   ├── ClayButton.tsx       # Clay-styled button
│   │   ├── AnimatedGradientBg.tsx
│   │   ├── AnimatedProgressRing.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── FloatingLabel.tsx    # Floating label inputs
│   │   ├── Toast.tsx            # Notification system
│   │   ├── HoverInfoCard.tsx    # Hover tooltips
│   │   └── Confetti.tsx         # Celebration animation
│   │
│   ├── auth/
│   │   ├── AuthModal.tsx        # Auth container
│   │   ├── LoginForm.tsx        # Login form
│   │   └── SignupForm.tsx       # Registration form
│   │
│   └── chat/
│       └── Sidebar.tsx          # Chat sidebar with theme selector
│
├── lib/
│   ├── theme-context.tsx        # Theme management
│   └── psychometric-questions.ts # Test questions & logic
│
└── hooks/
    └── useAnimation.ts          # Custom animation hooks
```

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui with custom clay morphism styling
- **3D Graphics**: Three.js with React Three Fiber
- **Authentication**: Client-side localStorage (no database)
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Niteshd05/MindVoice.git
cd MindVoice
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Features Breakdown

### Landing Page
- Eye-catching hero section with animated 3D orb
- Feature highlights in clay-styled cards
- Call-to-action sections
- Responsive navigation
- Smooth scroll animations

### Authentication
- Secure signup with password hashing (bcrypt)
- Email-based login
- Form validation with helpful error messages
- Session management via localStorage
- Protected routes with middleware

### Psychometric Assessment
- 10 carefully designed mental health questions
- Multiple-choice options with theme indicators
- Progress tracking with animated progress bar
- Result processing and theme assignment
- Smooth question transitions

### Chat Interface
- Real-time message exchange
- Theme-aware styling updates
- AI response simulation
- Message history
- Dynamic sidebar navigation
- Quick theme switching

### Dashboard
- Circular progress visualization
- Category-based scoring (10 dimensions)
- Animated counter animations
- Personalized insights
- Retake assessment button
- Data export ready

## Clay Morphism Design System

The application uses a custom clay morphism design system defined in `globals.css`:

### Color Tokens
```css
--clay-primary    /* Main accent color */
--clay-secondary  /* Secondary accent */
--clay-accent     /* Tertiary accent */
--clay-light      /* Light background */
--clay-dark       /* Dark text color */
```

### Key CSS Classes
- `.clay-card` - Soft card with inset shadows
- `.clay-button` - Rounded button with gradient
- `.clay-input` - Styled input field
- `.clay-glass` - Glass morphism effect
- `.clay-gradient-text` - Gradient text effect

### Animation Classes
- `.animate-clay-float` - Floating motion
- `.animate-clay-glow` - Pulsing glow effect
- `.animate-rotate-3d` - 3D rotation

## Theme System

The app includes a dynamic theme context (`lib/theme-context.tsx`) that manages:
- Current theme selection
- Theme persistence to localStorage
- CSS variable updates
- Provider wrapper for client components

```typescript
const { theme, setTheme } = useTheme();
// theme: 'warm-earth' | 'cool-slate' | 'soft-lavender' | 'sage-green'
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in user

Request body:
```json
{
  "name": "John Doe",        // signup only
  "email": "user@example.com",
  "password": "securepass123"
}
```

Response:
```json
{
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

## Database Schema

### User
- `id` (String, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### PsychometricTest
- `id` (String, Primary Key)
- `userId` (String, Foreign Key)
- `answers` (Int array)
- `theme` (String)
- `completedAt` (DateTime)

## Future Enhancements

1. **Dynamic Question Selection**: Replace static questions with dynamic selection
2. **Real AI Integration**: Connect to actual AI models for conversations
3. **Voice Integration**: Add voice input/output capabilities
4. **Data Analytics**: Advanced analytics and trend analysis
5. **Social Features**: Share insights and support community
6. **Premium Subscription**: Tier-based features
7. **Mobile App**: Native mobile application
8. **Real-time Updates**: WebSocket for live features
9. **Advanced Visualizations**: More chart types and analytics
10. **Export Features**: PDF reports and data export

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with Next.js Image
- 3D scene lazy loading
- Efficient animation frame management
- CSS variable theming for minimal repaints
- Optimized bundle size

## Security Considerations

- Password hashing with bcrypt (12 rounds)
- Protected API routes with middleware
- XSS protection via React
- CSRF tokens (implement as needed)
- Secure session management
- Input validation and sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

Made with 💙 for mental wellness
