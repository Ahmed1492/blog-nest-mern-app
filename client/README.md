# BlogNest - Modern Blog Platform (Client)

A modern, responsive blog platform built with React, Vite, and Tailwind CSS. Features a beautiful UI with smooth animations, category filtering, search functionality, and a complete admin dashboard.

![BlogNest](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-cyan)

## ✨ Features

### User Features
- 🎨 Modern, responsive design with smooth animations
- 🔍 Advanced search functionality with real-time results
- 🏷️ Category-based filtering (Technology, Startup, Lifestyle, Finance)
- 📱 Mobile-first responsive design
- 💬 Blog comments system
- 📧 Newsletter subscription
- 🌙 Gradient text effects and glass morphism UI
- ⚡ Fast page loads with optimized images

### Admin Features
- 📊 Comprehensive dashboard with statistics
- ✍️ Rich text editor (Quill) for blog creation
- 🖼️ Image upload for blog posts
- 📝 Blog management (Create, Edit, Delete)
- 💬 Comment moderation
- 📈 Analytics and insights

## 🚀 Tech Stack

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** Tailwind CSS 4.1.17
- **Animations:** Framer Motion 11.0.0
- **Routing:** React Router DOM 7.9.5
- **HTTP Client:** Axios 1.13.2
- **Rich Text Editor:** Quill 2.0.3
- **Notifications:** React Hot Toast 2.6.0
- **Markdown:** Marked 17.0.1

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (see backend setup)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:
```env
VITE_BACK_END_URL=http://localhost:2000
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to production**
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variable:
   - `VITE_BACK_END_URL`: Your backend API URL
7. Click "Deploy"

### Important: Update Backend URL

Before deploying, update `.env.production`:
```env
VITE_BACK_END_URL=https://your-backend-url.vercel.app
```

## 📁 Project Structure

```
client/
├── public/              # Static assets
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── assets/         # Images, icons, SVGs
│   ├── components/     # Reusable components
│   │   ├── admin/     # Admin-specific components
│   │   ├── BlogCard.jsx
│   │   ├── BlogDetails.jsx
│   │   ├── BlogList.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── context/       # React Context
│   │   └── AppContext.jsx
│   ├── pages/         # Page components
│   │   ├── admin/    # Admin pages
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   └── Search.jsx
│   ├── App.jsx       # Main app component
│   ├── index.css     # Global styles
│   └── main.jsx      # Entry point
├── .env              # Environment variables (local)
├── .env.production   # Production environment variables
├── .env.example      # Environment variables template
├── eslint.config.js  # ESLint configuration
├── index.html        # HTML template
├── package.json      # Dependencies
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vercel.json       # Vercel configuration
└── vite.config.js    # Vite configuration
```

## 🎨 Key Features Explained

### Category Filtering
- Filter blogs by Technology, Startup, Lifestyle, or Finance
- Smooth animations when switching categories
- Color-coded category badges

### Search Functionality
- Real-time search across blog titles and content
- Dedicated search results page
- Empty state handling

### Admin Dashboard
- Statistics cards with sparkline charts
- Recent blogs table
- Quick actions for blog management
- Comment moderation interface

### Rich Text Editor
- Quill editor with formatting options
- Image upload support
- Preview before publishing

## 🔧 Configuration Files

### vercel.json
Handles client-side routing for single-page application:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### vite.config.js
Optimized build configuration with code splitting:
- Vendor chunk: React, React DOM, React Router
- UI chunk: Framer Motion, React Hot Toast

### eslint.config.js
Configured to treat warnings as warnings (not errors) for deployment:
- `no-unused-vars`: warn
- `react-refresh/only-export-components`: warn
- `react-hooks/exhaustive-deps`: warn

## 🐛 Troubleshooting

### Build Warnings
The project is configured to allow warnings during build. If you want stricter linting:
```bash
npm run lint
```

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Check `.env.production` for production builds

### Routing Issues on Vercel
- Ensure `vercel.json` is present in the root
- Check that rewrites are configured correctly

### API Connection Issues
- Verify `VITE_BACK_END_URL` is correct
- Check CORS settings on backend
- Ensure backend is deployed and accessible

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (allows warnings)

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACK_END_URL` | Backend API URL | `http://localhost:2000` |

## 🎯 Performance Optimizations

- Code splitting for vendor and UI libraries
- Lazy loading of images
- Optimized bundle size
- Framer Motion animations with GPU acceleration
- Tailwind CSS purging for minimal CSS

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, email hello@blognest.com or open an issue in the repository.

## 🙏 Acknowledgments

- Design inspiration from modern blog platforms
- Icons from Heroicons
- Fonts from Google Fonts (Inter)

---

Built with ❤️ using React and Vite
