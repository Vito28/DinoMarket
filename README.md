# 🦕 DinoMarket

<div align="center">

![DinoMarket Logo](https://img.shields.io/badge/DinoMarket-E--Commerce-green?style=for-the-badge&logo=shopping-cart)

**Platform E-Commerce Modern dengan Simulasi Backend menggunakan LocalStorage**

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.6-764abc?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Ready-06b6d4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3?style=flat&logo=bootstrap)](https://getbootstrap.com/)

[Demo Live](https://vito28.github.io/DinoMarket/) • [Laporkan Bug](https://github.com/Vito28/UAS/issues) • [Request Fitur](https://github.com/Vito28/UAS/issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Arsitektur](#-arsitektur)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**DinoMarket** adalah aplikasi e-commerce modern yang dibangun dengan React dan Vite, menampilkan sistem pemesanan keranjang belanja yang lengkap dengan **simulasi backend menggunakan LocalStorage**. Proyek ini mendemonstrasikan implementasi clean architecture dalam aplikasi frontend dengan state management yang robust dan design system yang konsisten.

### 🌟 Kenapa DinoMarket?

- ✅ **Zero Backend Required** - Simulasi lengkap sistem backend di frontend
- ✅ **Clean Code Architecture** - Struktur folder yang terorganisir dan maintainable
- ✅ **Modern UI/UX** - Design responsif dengan TailwindCSS & Bootstrap
- ✅ **State Management** - Redux Toolkit untuk pengelolaan state yang efisien
- ✅ **Type Safety** - PropTypes untuk validasi komponen
- ✅ **Accessibility** - A11y compliant dengan semantic HTML
- ✅ **Testing Ready** - Vitest & Testing Library terintegrasi
- ✅ **Component Documentation** - Storybook untuk katalog komponen

---

## ✨ Fitur Utama

### 🛍️ Shopping Experience
- **Katalog Produk Dinamis** - Browse produk dengan data JSON
- **Pencarian Real-time** - Cari produk dengan instant feedback
- **Filter & Sort** - Organisasi produk yang mudah
- **Detail Produk** - Informasi lengkap setiap produk

### 🛒 Cart Management
- **Add to Cart** - Tambah produk ke keranjang dengan mudah
- **Quantity Control** - Atur jumlah pembelian (1-100)
- **Cart Notes** - Tambahkan catatan khusus untuk setiap item
- **Persistent Cart** - Data keranjang tersimpan di localStorage
- **Multi-User Support** - Keranjang terpisah per user

### 💳 Checkout System
- **Order Summary** - Ringkasan pesanan yang jelas
- **User Authentication** - Simulasi login/logout
- **Order History** - Riwayat pembelian tersimpan
- **Responsive Forms** - Form checkout yang user-friendly

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Support untuk tema gelap
- **Loading States** - Skeleton loading & spinners
- **Error Handling** - 404 page & error boundaries
- **Animations** - Smooth transitions dengan Framer Motion
- **Icons Library** - React Icons terintegrasi

---

## 🚀 Teknologi

### Core Technologies

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **React** | 18.3.1 | UI Library |
| **Vite** | Latest | Build Tool & Dev Server |
| **Redux Toolkit** | 2.2.6 | State Management |
| **React Router** | 6.24.1 | Client-side Routing |
| **Bootstrap** | 5.3.3 | CSS Framework |
| **TailwindCSS** | Ready | Utility-first CSS |
| **SASS** | 1.77.6 | CSS Preprocessor |
| **Framer Motion** | 11.2.13 | Animation Library |

### Development Tools

- **Vitest** - Unit Testing Framework
- **Testing Library** - React Component Testing
- **Storybook** - Component Development & Documentation
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **gh-pages** - Static Site Deployment

### Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-redux": "^9.1.2",
  "@reduxjs/toolkit": "^2.2.6",
  "react-router-dom": "^6.24.1",
  "bootstrap": "^5.3.3",
  "framer-motion": "^11.2.13",
  "react-icons": "^5.2.1"
}
```

---

## 📁 Struktur Proyek

```
DinoMarket/
│
├── 📂 public/                    # Static assets
│   ├── product.json              # Data produk utama
│   ├── note.xsd                  # XML Schema untuk catatan
│   └── tes.html                  # Testing HTML
│
├── 📂 scripts/                   # Python scripts
│   ├── build_products.py         # Build data produk
│   └── generate_products.py      # Generate dummy products
│
├── 📂 src/
│   ├── 📂 Components/            # Reusable UI Components
│   │   ├── AuthButton.jsx        # Tombol autentikasi
│   │   ├── Navigation.jsx        # Navbar komponen
│   │   ├── Footer.jsx            # Footer komponen
│   │   ├── ProductCard.jsx       # Card produk
│   │   ├── QuantityButton.jsx    # Kontrol quantity
│   │   ├── Search.jsx            # Search bar
│   │   ├── 📂 Popup/
│   │   │   ├── PopupCart.jsx     # Cart popup
│   │   │   └── PopupCart.scss    # Cart styles
│   │   └── 📂 __tests__/         # Component tests
│   │       └── ProductCard.test.jsx
│   │
│   ├── 📂 Pages/                 # Page Components
│   │   ├── Home.jsx              # Landing page
│   │   ├── Shop.jsx              # Product detail page
│   │   ├── Cart.jsx              # Shopping cart page
│   │   ├── Checkout.jsx          # Checkout page
│   │   ├── SearchResults.jsx     # Search results page
│   │   ├── 404.jsx               # Not found page
│   │   └── 📂 __tests__/
│   │       └── Checkout.test.jsx
│   │
│   ├── 📂 Layout/                # Layout Components
│   │   ├── ProductsInCart.jsx    # Cart items layout
│   │   └── ProductsNotInCart.jsx # Empty cart layout
│   │
│   ├── 📂 storage/               # LocalStorage Layer (Backend Simulation)
│   │   ├── localStorage.js       # Core storage utilities
│   │   ├── cartStorage.js        # Cart data management
│   │   ├── authStorage.js        # Auth state management
│   │   └── userStorage.js        # User data management
│   │
│   ├── 📂 store/                 # Redux Store
│   │   └── index.js              # Store configuration
│   │
│   ├── 📂 services/              # API Services
│   │   └── catalogApi.js         # Catalog data fetching
│   │
│   ├── 📂 hooks/                 # Custom React Hooks
│   │   └── useCatalogData.js     # Hook untuk data katalog
│   │
│   ├── 📂 utils/                 # Utility Functions
│   │   └── format.js             # Formatting helpers
│   │
│   ├── 📂 data/                  # Local Data
│   │   └── products.json         # Product data
│   │
│   ├── 📂 assets/                # Static Assets
│   │   ├── 📂 Image/             # Images
│   │   └── 📂 Style/             # Styles
│   │       ├── _variable.scss    # SASS variables
│   │       ├── index.css         # Global styles
│   │       ├── 📂 Components/    # Component styles
│   │       └── 📂 Pages/         # Page styles
│   │
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Entry point
│
├── 📄 index.html                 # HTML template
├── 📄 package.json               # Dependencies
├── 📄 vite.config.js             # Vite configuration
├── 📄 vitest.setup.js            # Vitest setup
└── 📄 README.md                  # Dokumentasi
```

---

## 🔧 Instalasi

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v16 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/Vito28/UAS.git
   cd DinoMarket
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Generate Product Data (Opsional)**
   ```bash
   python scripts/generate_products.py
   python scripts/build_products.py
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Buka Browser**
   ```
   http://localhost:5173
   ```

---

## 💻 Penggunaan

### Development

```bash
# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Storybook

```bash
# Jalankan Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Deployment

```bash
# Deploy ke GitHub Pages
npm run deploy
```

---

## 🏗️ Arsitektur

### LocalStorage Backend Simulation

DinoMarket menggunakan arsitektur unik dengan **simulasi backend menggunakan localStorage**:

```javascript
// storage/localStorage.js - Core Layer
export const writeStorage = (key, value) => { ... }
export const readStorage = (key) => { ... }
export const removeStorage = (key) => { ... }

// storage/cartStorage.js - Business Logic Layer
export const addToCart = (item) => { ... }
export const removeFromCart = (productId) => { ... }
export const updateCartItemQuantity = (productId, quantity) => { ... }
export const getCartItems = () => { ... }

// storage/userStorage.js - User Management
export const getActiveUserId = () => { ... }
export const setActiveUser = (userId) => { ... }

// storage/authStorage.js - Authentication
export const isAuthenticated = () => { ... }
export const login = (credentials) => { ... }
export const logout = () => { ... }
```

### State Management Flow

```
User Action → Component → Redux Action → Reducer → LocalStorage
                ↑                                        ↓
                └────────────── State Update ────────────┘
```

### Data Persistence

- **Cart Data**: `ecom.cart.{userId}`
- **User Data**: `ecom.user.{userId}`
- **Auth State**: `ecom.auth.status`
- **Order History**: `ecom.orders.{userId}`

### Key Design Patterns

1. **Container/Presentational Pattern** - Pemisahan logic dan UI
2. **Custom Hooks** - Reusable stateful logic
3. **Service Layer** - API abstraction
4. **Storage Layer** - Data persistence abstraction
5. **Lazy Loading** - Code splitting untuk performa

---

## 🧪 Testing

### Unit Testing

Proyek ini menggunakan **Vitest** dan **Testing Library**:

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test -- --coverage
```

### Test Structure

```javascript
// Example: Components/__tests__/ProductCard.test.jsx
describe('ProductCard', () => {
  it('should render product information', () => {
    // Test implementation
  });
  
  it('should handle add to cart action', () => {
    // Test implementation
  });
});
```

### Storybook Testing

```bash
# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Stories tersedia untuk:
- ✅ ProductCard
- ✅ QuantityButton
- ✅ Dan komponen lainnya

---

## 🚀 Deployment

### GitHub Pages

Proyek ini dapat di-deploy ke GitHub Pages:

```bash
npm run build
npm run deploy
```

### Environment Variables

Tidak ada environment variables yang diperlukan karena menggunakan localStorage.

### Production Build

```bash
npm run build
```

Output akan berada di folder `dist/`.

---

## 🎨 Customization

### Mengubah Tema

Edit variabel SASS di `src/assets/Style/_variable.scss`:

```scss
// Colors
$primary-color: #your-color;
$secondary-color: #your-color;

// Typography
$font-family: 'Your Font', sans-serif;

// Spacing
$spacing-unit: 8px;
```

### Menambah Produk

Edit atau generate data produk:

```bash
# Edit manual
src/data/products.json

# Generate dengan Python
python scripts/generate_products.py
python scripts/build_products.py
```

### Custom Components

Buat komponen baru di `src/Components/`:

```jsx
// YourComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';

const YourComponent = ({ prop1, prop2 }) => {
  return (
    <div>Your Component</div>
  );
};

YourComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default YourComponent;
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Coding Standards

- ✅ Gunakan ESLint configuration yang sudah ada
- ✅ Tulis tests untuk fitur baru
- ✅ Tambahkan PropTypes untuk komponen
- ✅ Dokumentasikan dengan Storybook
- ✅ Ikuti struktur folder yang ada

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan portfolio.

---

## 👨‍💻 Author

**Vito28**

- GitHub: [@Vito28](https://github.com/Vito28)
- Repository: [DinoMarket](https://github.com/Vito28/UAS)

---

## 🙏 Acknowledgments

- React Team untuk library yang luar biasa
- Vite untuk build tool yang super cepat
- Redux Toolkit untuk state management yang mudah
- Bootstrap & TailwindCSS untuk styling yang fleksibel
- Komunitas open source untuk semua dependencies yang digunakan

---

## 📞 Support

Jika Anda menemukan bug atau memiliki saran:

1. [Buka Issue](https://github.com/Vito28/UAS/issues)
2. [Diskusi](https://github.com/Vito28/UAS/discussions)

---

<div align="center">

**Dibuat dengan ❤️ menggunakan React & Vite**

⭐ Star proyek ini jika Anda merasa terbantu!

[⬆ Kembali ke atas](#-dinomarket)

</div>
