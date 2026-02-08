# 🔐 Locksy - Tab Protection Extension Website

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kiediieibclgkcnkkmjlhmdainpoidim?label=Chrome%20Web%20Store&logo=google-chrome&logoColor=white&color=4285F4)](https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim)
[![Microsoft Edge Add-ons](https://img.shields.io/badge/Edge%20Add--ons-Available-0078D4?logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox-Available-FF7139?logo=firefox&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/locksy/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://locksy.vercel.app)
[![Version](https://img.shields.io/badge/version-2.2.0-blue)](https://github.com/vansh-121/Locksy)

Official landing page for **Locksy** - A powerful browser extension that provides military-grade tab protection with PBKDF2 encryption (600,000 iterations, OWASP 2023 compliant). Now with Auto-Lock Timer and Scheduled Locking for automatic security.

## 🔒 Security Features (v2.2.0)

- 🛡️ **PBKDF2 with 600k Iterations** - Ultimate Key Derivation Function (KDF) Encryption
- ⚡ **120 Years Crack Resistance** - Military-grade password protection
- 🚫 **Rate Limiting & Brute-Force Protection** - Advanced timing attack prevention
- 🔐 **Zero Data Collection** - Everything stored locally on your device
- 📴 **100% Offline** - No external servers or data transmission
- 🔓 **No Backdoors** - Only you can unlock your tabs

## 🌟 Key Features

- ⏱️ **Auto-Lock Timer** - Automatic protection after inactivity (1-480 min)
- 📅 **Scheduled Locking** - Time-based security with day-of-week selection
- ⌨️ **Keyboard Shortcuts** - Lock tabs instantly with Alt+Shift+9
- 🌐 **Domain Lock** - Lock entire domains with wildcard patterns
- 🎨 **Visual Lock Indicators** - Red lock icon on tab favicons
- 🥷 **Incognito Mode Support** - Full privacy mode compatibility
- 🔄 **Smart Unlock Preferences** - Remembers unlock preferences per domain
- 🪶 **Ultra Lightweight** - Zero performance impact on your browser
- 🎨 **Modern UI** - Beautiful gradient interface with smooth animations
- 🚫 **No Account Required** - Install and start protecting in 30 seconds

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** Tailwind Animate & CSS Transitions
- **Icons:** Lucide React
- **Video:** YouTube IFrame API
- **Package Manager:** pnpm
- **TypeScript:** Full type safety
- **Deployment:** Vercel

## 🌐 Website Sections

- **Hero** - Eye-catching introduction with download buttons for all major browsers
- **Domain Lock** - Highlight persistent domain-level protection
- **Problem Statement** - Explains why tab security matters
- **Features** - 12+ feature cards showcasing capabilities
- **Keyboard Shortcuts** - Interactive shortcuts demonstration
- **How It Works** - 3-step installation guide
- **Security** - Privacy guarantees and security features
- **Comparison** - Compare with browser's native features
- **Testimonials** - User reviews and feedback
- **FAQ** - Common questions answered
- **CTA** - Call-to-action for installation

## 🎨 Design Features

- ⚡ **Modern Gradient Design** - Beautiful purple-to-pink gradients
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎨 **Interactive Elements** - Hover effects, animations, and transitions
- 🎥 **Video Demo** - Embedded YouTube tutorial with custom controls
- 🏆 **Product Hunt Badge** - Featured product integration
- 🌟 **Trust Indicators** - Rating, encryption, offline, and free badges

## 📄 Project Structure

```
locksy-website/
├── app/
│   ├── globals.css          # Global styles & Tailwind config
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── privacy-policy/      # Privacy policy page
│   └── uninstall/           # Uninstall feedback page
├── components/
│   ├── header.tsx           # Navigation header
│   ├── hero.tsx             # Hero section with video
│   ├── domain-lock.tsx      # Domain lock feature showcase
│   ├── features.tsx         # 12+ feature cards
│   ├── keyboard-shortcuts.tsx # Keyboard shortcuts section
│   ├── problem-statement.tsx
│   ├── how-it-works.tsx     # Installation guide
│   ├── security.tsx         # Privacy & security guarantees
│   ├── comparison.tsx       # Feature comparison
│   ├── testimonials.tsx     # User reviews
│   ├── faq.tsx              # Frequently asked questions
│   ├── cta-section.tsx      # Call-to-action
│   ├── footer.tsx           # Footer with links
│   ├── product-hunt-badge.tsx
│   └── ui/                  # Reusable UI components (40+ components)
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── faq-data.ts          # FAQ content
│   └── metadata.ts          # SEO metadata
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── browsers/            # Browser icons
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vansh-121/Locksy-Website.git
   cd Locksy-Website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔗 Links

### Extension Downloads
- **Chrome:** [Chrome Web Store](https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim)
- **Edge:** [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn)
- **Firefox:** [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/locksy/)
- **Opera/Brave/Vivaldi:** Use Chrome Web Store link

### Resources
- **Website:** [locksy.vercel.app](https://locksy.vercel.app)
- **Extension Source:** [GitHub Repository](https://github.com/vansh-121/Locksy)
- **Video Tutorial:** [YouTube](https://www.youtube.com/watch?v=6uyd4sN5WiA)
- **Product Hunt:** [Locksy on Product Hunt](https://www.producthunt.com/products/locksy-tab-locker-password-protection)
- **Report Issues:** [GitHub Issues](https://github.com/vansh-121/Locksy/issues)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Developer:** Vansh Sethi  
**GitHub:** [@vansh-121](https://github.com/vansh-121)  
**Issues:** [GitHub Issues](https://github.com/vansh-121/Locksy/issues)

For security vulnerabilities, please report privately via GitHub Security Advisories.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern SaaS landing pages
- Built with privacy and security as top priorities
- Thanks to all contributors and 1000+ users
- Special thanks to the open-source community

## 📈 Stats

- ⭐ 5-star rating on browser stores
- 🌍 Available on Chrome, Edge, Firefox, Opera, Brave, Vivaldi
- 📦 Version 2.0.0 - Major Security Overhaul
- 🔒 OWASP 2023 compliant encryption
- 💯 100% privacy-focused (no data collection)

---

Made with ❤️ by [Vansh Sethi](https://github.com/vansh-121)

**"Your Privacy. Your Tabs. Your Control."**
