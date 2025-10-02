# Atmos - Your AI Companion

A modern, responsive landing page for Atmos, the world's first AI companion designed for living.

## 🚀 Production Ready Features

- ✅ **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- ✅ **SEO Optimized**: Meta tags, structured data, and semantic HTML
- ✅ **PWA Ready**: Service worker, manifest, and offline functionality
- ✅ **Security**: CSP headers, security policies, and HTTPS enforcement
- ✅ **Analytics**: Google Analytics 4 integration with performance tracking
- ✅ **Mobile Responsive**: Optimized for all devices and screen sizes
- ✅ **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- ✅ **Error Handling**: Global error boundary and graceful error recovery

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Query
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## 📦 Installation & Development

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3a364efa-8911-4d73-afbc-47cb25e73b34) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 Production Deployment

### Environment Setup

1. Copy `env.example` to `.env` and configure your environment variables:
```bash
cp env.example .env
```

2. Update the following variables:
- `VITE_GA_MEASUREMENT_ID`: Your Google Analytics 4 Measurement ID
- `VITE_API_URL`: Your API endpoint (if applicable)

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build:prod

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with `npm run build:prod`

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build:prod`
3. Set publish directory: `dist`

#### Manual Deployment
1. Run `npm run build:prod`
2. Upload the `dist` folder to your hosting provider

## 🔧 Production Checklist

Before deploying to production, ensure:

- [ ] Google Analytics ID is configured
- [ ] All environment variables are set
- [ ] Domain is configured in hosting provider
- [ ] SSL certificate is enabled
- [ ] Custom domain is pointing to the deployment
- [ ] Performance monitoring is active
- [ ] Error tracking is configured

## 📊 Performance Monitoring

The site includes:
- Google Analytics 4 for user behavior tracking
- Performance monitoring for Core Web Vitals
- Error tracking and reporting
- Bundle size analysis tools

## 🔒 Security Features

- Content Security Policy (CSP) headers
- X-Frame-Options protection
- HTTPS enforcement
- Secure cookie policies
- Input sanitization

## 📱 PWA Features

- Offline functionality
- App-like experience
- Install prompts
- Background sync capabilities
