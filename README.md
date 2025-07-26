# OnyxStore 🛒

**A professional, dark‑themed e‑commerce storefront built with Nuxt 3 & Tailwind CSS.**

---

## 🐋 SonarCloud Code Analysis

| **Code & Duplication**                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) |

| **Quality & Security**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) |

| **Issues & Maintainability**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=bugs)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=HardMachinesCorporation_OnyxStore&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=HardMachinesCorporation_OnyxStore) |

---

## 🌐 Overview

This project is a **modular**, **responsive**, and **accessible** e‑commerce application featuring:

- **Authentication**: login, registration & logout flows
- **Product catalog**: listing and individual product pages
- **Stripe checkout**: integrated PaymentElement for secure one‑time purchases
- **Dark theme**: elegant palette inspired by modern UI trends
- **User feedback**: smooth loading states, error/success messages, and micro‑interactions

Designed to showcase serious craftsmanship and a high‑quality user experience.

---

## ✨ Key Features

- **Authentication Pages**: `/login`, `/register`, `/logout`
- **Product Browsing**: `/products`, `/products/[id]`
- **Checkout Flow**: `/checkout` (payment form), `/payment-success`, `/error`
- **Payment Integration**: Stripe PaymentElement, secure clientSecret fetch
- **Responsive Design**: mobile‑first, fluid grid layouts
- **Component Library**: reusable UI components with clear API
- **Dark Mode**: consistent dark palette with accent colors

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/your-ecommerce-app.git
   cd your-ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install

   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Set `NUXT_PUBLIC_STRIPE_PK`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, etc.

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Build & Preview**

   ```bash
   pnpm build
   pnpm run preview
   ```

---

## 🗂️ Folder Structure

```
├── assets/
│   └── css/main.css             # Global styles (Tailwind base)
├── components/                  # Reusable Vue components
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── ProductCard.vue
│   └── LoadingSpinner.vue
├── layouts/
│   └── default.vue              # Main layout with Header/Footer
├── pages/
│   ├── index.vue                # Home / product listing
│   ├── login.vue
│   ├── register.vue
│   ├── logout.vue
│   ├── products/                # Product pages
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── checkout.vue
│   ├── payment-success.vue
│   └── error.vue
├── server/api/                   # Nitro server routes
│   ├── stripe/                  # Stripe integration endpoints
│   │   ├── paymentintent.post.ts
│   │   └── webhook.post.ts
│   └── auth/                    # Authentication API (to be implemented)
├── utils/                       # Shared utilities (e.g. Zod schemas)
├── tailwind.config.js
├── nuxt.config.ts
└── README.md                    # This file
```

---

## 📄 Pages & Responsibilities

| Page               | Responsibility                                                          |
| ------------------ | ----------------------------------------------------------------------- |
| `/login`           | Display login form and handle authentication submission                 |
| `/register`        | Display registration form and handle new user signup                    |
| `/logout`          | Execute logout logic and redirect to home                               |
| `/products`        | List all products with pagination/filtering UI                          |
| `/products/[id]`   | Show detailed product information and “Add to Cart” button              |
| `/checkout`        | Render Stripe PaymentElement and initiate payment flow                  |
| `/payment-success` | Display confirmation and order summary after successful payment         |
| `/error`           | Show error message and recovery actions if payment fails or is canceled |

---

## 📦 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + Headless UI
- **Payment**: [Stripe PaymentElement](https://stripe.com/docs/payments/payment-element)
- **API**: Nuxt Nitro server routes, Zod for validation
- **State Management**: Nuxt composables (e.g. `useCart`)
- **Icons**: Heroicons, Lucide

---

## ⚙️ Usage

This project provides only the **UI**. You should implement the following backend logic yourself:

- **Authentication** (login/register/logout)
- **Product Fetching** and **Cart Management**
- **Server‑side API** for Stripe (PaymentIntent, Webhooks)

Once these are in place, the UI will seamlessly integrate with your business logic.

---

## 🛠️ Commit Guidelines

This project comes pre-configured with the following tools to enforce commit conventions and code quality:

- **husky**
- **commitizen** (`^4.3.1`)
- **cz-git** (`^1.12.0`)
- **eslint-plugin-useFormat** (`^1.0.1`)
- **eslint-plugin-perfectionist** (see `package.json` for exact version)

To create a properly formatted commit (with Husky running your lint/useFormat hooks and Commitizen guiding your message), simply run:

```bash
pnpm commit
```

---

## 🛡️ ESLint Configuration

This project uses a **flat ESLint config** powered by Antfu’s preset (`@antfu/eslint-config`).
All rules are declared in your `eslint.config.js` (flat-config) useFormat, combined with Nuxt via the `withNuxt()` helper.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: Add ..."`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please follow the existing code style and write descriptive commit messages.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 📚 Codes documentation

[![Documented on GitBook](https://img.shields.io/static/v1?message=Documented%20on%20GitBook&logo=gitbook&logoColor=ffffff&label=&labelColor=5c5c5c&color=3F89A1)](https://jordachlab.gitbook.io/onyxstore/)

## 📧 Contact

Built with 💜 by Jordach MAKAYA. For questions or feedback, reach out at [thejordach@gmail.com](mailto:thejordach@gmail.com).
