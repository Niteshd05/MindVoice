# MindVoice Design System - Clay Morphism

Complete guide to the MindVoice clay morphism design language and 3D visual elements.

## Design Philosophy

MindVoice embraces **clay morphism** - a design trend that combines the tactile, organic feel of pottery with modern digital interfaces. This creates an interface that feels warm, inviting, and human-centered.

### Core Principles
1. **Soft & Organic** - Rounded corners, smooth curves, natural shapes
2. **Tactile & Warm** - Colors inspired by pottery and earth tones
3. **Depth & Shadows** - Layered lighting creates dimensional feel
4. **Smooth Motion** - Flowing animations, springy transitions
5. **Accessibility** - Readable, navigable, inclusive

## Color System

### Base Themes

Each theme follows a cohesive color story with primary, secondary, accent, light, and dark tones.

#### 1. Warm Earth (Primary Theme)
For users with positive, energetic assessments.
```css
--clay-primary: #D4A574    /* Warm tan - main accent */
--clay-secondary: #E8C9A0  /* Light tan - secondary */
--clay-accent: #B8956A     /* Deep tan - emphasis */
--clay-light: #F5E6D3      /* Off-white - backgrounds */
--clay-dark: #8B7355       /* Brown - text */
```
**Feeling**: Grounded, warm, confident

#### 2. Cool Slate (Balanced Theme)
For calm, centered users.
```css
--clay-primary: #6B8E9F    /* Slate blue - main */
--clay-secondary: #9BB3C0  /* Light slate - secondary */
--clay-accent: #5A7A8F     /* Deep slate - emphasis */
--clay-light: #E5EDF2      /* Light blue - backgrounds */
--clay-dark: #3D5A72       /* Dark blue - text */
```
**Feeling**: Calm, composed, thoughtful

#### 3. Soft Lavender (Support Theme)
For users needing gentle care.
```css
--clay-primary: #B89AC6    /* Lavender - main */
--clay-secondary: #D4BFDD  /* Light lavender - secondary */
--clay-accent: #A074B1     /* Deep lavender - emphasis */
--clay-light: #F5EDF9      /* Off-white - backgrounds */
--clay-dark: #7B5C8E       /* Dark purple - text */
```
**Feeling**: Gentle, supportive, nurturing

#### 4. Sage Green (Growth Theme)
For users on a development journey.
```css
--clay-primary: #A9B494    /* Sage - main */
--clay-secondary: #C8D4B8  /* Light sage - secondary */
--clay-accent: #8FA07D     /* Deep sage - emphasis */
--clay-light: #F0F3E8      /* Off-white - backgrounds */
--clay-dark: #6B7A5F       /* Dark green - text */
```
**Feeling**: Natural, growing, balanced

## Typography

### Font Stack
```css
--font-sans: 'Geist', 'Geist Fallback';
--font-mono: 'Geist Mono', 'Geist Mono Fallback';
```

### Type Hierarchy
- **H1**: 3rem (48px) - Bold, gradient text
- **H2**: 2rem (32px) - Bold, primary color
- **H3**: 1.5rem (24px) - Semibold, primary color
- **Body**: 1rem (16px) - Regular, dark color
- **Small**: 0.875rem (14px) - Regular, gray color

### Line Heights
- Headings: 1.2
- Body text: 1.6
- Labels: 1.4

## Spacing Scale

Consistent spacing using 0.25rem (4px) units:
```
0 = 0px
1 = 0.25rem (4px)
2 = 0.5rem (8px)
3 = 0.75rem (12px)
4 = 1rem (16px)
6 = 1.5rem (24px)
8 = 2rem (32px)
12 = 3rem (48px)
16 = 4rem (64px)
```

Apply consistently: padding, margins, gaps.

## Components

### Clay Card (`.clay-card`)
**Purpose**: Primary content container

**Features**:
- Border radius: 2rem (32px)
- Background: Clay light color
- Shadows:
  - Outer: `0 8px 32px rgba(0, 0, 0, 0.08)`
  - Inset top: `inset 0 2px 4px rgba(255, 255, 255, 0.5)`
  - Inset bottom: `inset 0 -2px 4px rgba(0, 0, 0, 0.05)`
- Transition: smooth 0.4s cubic-bezier
- Hover: lifted with enhanced shadow

**Usage**:
```jsx
<ClayCard className="p-6">
  Content here
</ClayCard>
```

### Clay Button (`.clay-button`)
**Purpose**: Primary call-to-action

**Features**:
- Border radius: 1.5rem (24px)
- Background: Gradient (primary to accent)
- Text: White, semibold
- Shadows: Outer + inset
- Hover: Translate up 2px, shadow enhance
- Active: Return to normal position
- Transition: spring-like (stiffness: 200)

**Variants**:
- Size: sm, md, lg
- Disabled state: opacity 50%
- Loading state: Spinner animation

**Usage**:
```jsx
<ClayButton size="lg" className="text-white">
  Start Journey
</ClayButton>
```

### Clay Input (`.clay-input`)
**Purpose**: Form input field

**Features**:
- Border radius: 1.25rem (20px)
- Background: Clay light
- Border: 2px clay secondary
- Padding: 0.875rem 1.5rem
- Focus: Colored border + ring shadow
- Transition: smooth colors

**Usage**:
```jsx
<input type="email" className="clay-input" />
```

### Clay Glass (`.clay-glass`)
**Purpose**: Overlay with transparency

**Features**:
- Background: `rgba(255, 255, 255, 0.7)`
- Backdrop: `blur(10px)`
- Border radius: 1.75rem (28px)
- Border: 1px rgba(255, 255, 255, 0.5)
- Shadow: Mixed outer + inset

**Usage**:
```jsx
<div className="clay-glass p-12">
  Overlaid content
</div>
```

### Gradient Text (`.clay-gradient-text`)
**Purpose**: Eye-catching text emphasis

**Features**:
- Linear gradient 135deg
- Colors: primary to accent
- Background clip: text
- Fill color: transparent

**Usage**:
```jsx
<h1 className="clay-gradient-text">Your Title</h1>
```

## Animations

### Built-in Animation Classes

#### Float Animation (`.animate-clay-float`)
Gentle floating motion up and down
- Duration: 4s
- Easing: ease-in-out
- Distance: 12px
- 3D: subtle rotateX

#### Glow Animation (`.animate-clay-glow`)
Pulsing glow effect
- Duration: 3s
- Easing: ease-in-out
- Effect: Shadow grows and shrinks
- Repeats: infinite

#### 3D Rotation (`.animate-rotate-3d`)
Full 3D rotation
- Duration: 20s
- Easing: linear
- Axis: both X and Y
- Repeats: infinite

### Framer Motion Integration

All interactive components use Framer Motion for:
- Spring physics (`type: 'spring'`)
- Gesture detection (`whileHover`, `whileTap`)
- Smooth transitions
- Staggered animations

**Common Patterns**:
```typescript
// Hover effect
whileHover={{ scale: 1.02, y: -4 }}

// Tap effect
whileTap={{ scale: 0.98 }}

// Enter animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Stagger children
container: {
  staggerChildren: 0.1
}
```

## 3D Elements

### Three.js + React Three Fiber Integration

#### AnimatedOrb Component
**Location**: `components/3d/AnimatedOrb.tsx`

**Visual**:
- Wobbling 3D sphere
- Constantly rotating on X and Y axes
- WobbleMaterial for organic feel
- Ambient + point lighting
- Soft clay color (#D4A574)

**Performance**:
- Canvas size: 100% x 24rem
- Lightweight geometry (64x64)
- 60fps target

**Usage**:
```jsx
<AnimatedOrb />
```

#### FloatingParticles Component
**Location**: `components/3d/FloatingParticles.tsx`

**Visual**:
- 500 floating particles
- Random positions in 3D space
- Slow rotation
- Semi-transparent points
- Depth-based opacity

**Performance**:
- Points-based (not individual meshes)
- GPU optimized
- Low memory footprint

**Usage**:
```jsx
<FloatingParticles />
```

#### ThreeDScene Component
**Location**: `components/3d/ThreeDScene.tsx`

**Visual**:
- Sphere with wobble
- Box with rotation
- Torus ring
- Multiple point lights
- Complex lighting setup

**Performance**:
- Multiple geometries
- Higher visual impact
- Use sparingly

**Usage**:
```jsx
<ThreeDScene />
```

## Responsive Design

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach
1. Design for mobile first
2. Enhance at breakpoints
3. Use Tailwind responsive prefixes: `md:`, `lg:`, etc.

### Key Responsive Patterns
- Single column mobile → 2-3 columns desktop
- Larger tap targets on mobile (44px+)
- Sidebar hidden on mobile
- Full viewport height on mobile
- Adjusted font sizes

## Accessibility

### Color Contrast
All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

### Interactive Elements
- Min touch target: 44x44px
- Visible focus indicators
- Keyboard navigation support
- ARIA labels where needed
- Semantic HTML structure

### Animation Considerations
- Respect `prefers-reduced-motion`
- No auto-playing videos
- Avoid rapid flashing (>3/second)
- Include alternative to animation

## Dark Mode (Future)

Placeholder for dark mode support:
```css
/* Will add dark theme variants */
@media (prefers-color-scheme: dark) {
  /* Dark theme variables */
}
```

## Component Examples

### Basic Card with Animation
```jsx
<ClayCard className="p-6">
  <h2 className="text-2xl font-bold clay-gradient-text mb-4">
    Title
  </h2>
  <p className="text-gray-600">Description</p>
</ClayCard>
```

### Button with Loading State
```jsx
<ClayButton
  loading={isLoading}
  onClick={handleClick}
  className="text-white"
>
  Submit
</ClayButton>
```

### Floating Label Input
```jsx
<FloatingLabelInput
  label="Email"
  type="email"
  icon="📧"
  className="w-full"
/>
```

### Toast Notification
```jsx
const { toasts, addToast } = useToast();

addToast('Success!', 'success');
addToast('Error!', 'error', 5000);

<Toast toasts={toasts} onRemove={removeToast} />
```

## Best Practices

### Consistency
1. Use design tokens consistently
2. Don't hard-code colors
3. Leverage existing component library
4. Keep spacing proportional

### Performance
1. Lazy load 3D components
2. Use CSS variables for theming
3. Minimize animation complexity
4. Profile on low-end devices

### Accessibility
1. Test with keyboard navigation
2. Check color contrast
3. Include aria labels
4. Test with screen readers

### Maintainability
1. Name components clearly
2. Document variants
3. Keep styles modular
4. Update design system version

## Extending the Design System

### Adding a New Theme
1. Define color tokens in `globals.css`
2. Add to theme selector
3. Test all components
4. Update documentation

### Creating Custom Component
1. Use `.clay-` prefix
2. Inherit from base classes
3. Add animation
4. Document usage
5. Add to component library

### Animation Patterns
1. Keep duration 0.3-0.6s for micro
2. Use spring for natural feel
3. Avoid simultaneous animations
4. Respect user preferences

## Resources

- **Colors**: HSL-based for consistency
- **Fonts**: Google Fonts (Geist family)
- **Icons**: Unicode emoji + custom SVG
- **Animations**: Framer Motion docs
- **3D**: Three.js + R3F docs

---

Version: 1.0.0
Last Updated: 2024
Maintained by: MindVoice Design Team
