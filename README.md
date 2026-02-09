# Login & Registration UI

A beautiful, mobile-first login and registration interface built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components featuring an elegant maroon gradient design.

## Features

- 🎨 **Maroon Gradient Theme** - Rich maroon to amber gradient background with glassmorphism effects
- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive layout
- 🎯 **Shadcn UI Components** - Built with high-quality, accessible UI components
- 🔄 **Tab-Based Navigation** - Easy switching between Login and Registration forms
- 🎭 **Modern Animations** - Smooth transitions and hover effects
- 🌐 **Social Login Options** - Google and Facebook login buttons (UI only)
- ✨ **Glassmorphism Effects** - Beautiful frosted glass visual effects

## Design Elements

### Color Palette
- Primary: Maroon gradient (rose-950 → red-950 → amber-950)
- Accent: Rose-600 to Red-700 gradient
- Text: White with rose tints
- Cards: White with 95% opacity and backdrop blur

### Components Used
- **Tabs** - For switching between Login and Registration
- **Cards** - Container for forms with glassmorphism
- **Inputs** - Styled form inputs with focus states
- **Buttons** - Gradient buttons with hover effects
- **Labels** - Form field labels

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main login/registration page
├── components/
│   └── ui/                  # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
└── tailwind.config.ts       # Tailwind configuration
```

## Features of the UI

### Login Tab
- Email input field
- Password input field
- Remember me checkbox
- Forgot password link
- Sign in button with gradient
- Social login options (Google, Facebook)

### Registration Tab
- Full name input
- Email input
- Password input
- Confirm password input
- Terms of Service agreement
- Create account button with gradient
- Social registration options

## Customization

### Changing Colors
Modify the gradient colors in `app/page.tsx`:
```tsx
bg-gradient-to-br from-rose-950 via-red-950 to-amber-950
```

### Adjusting Mobile Width
The form container has a max-width of `md` (28rem). Adjust in `page.tsx`:
```tsx
<div className="w-full max-w-md relative z-10">
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Shadcn UI** - Component library
- **Radix UI** - Accessible component primitives

## Note

This is a **UI-only implementation** with no backend functionality. All buttons and forms are for display purposes and do not perform actual authentication.

## License

MIT License - Feel free to use this design in your projects!
