# 🦕 DinoMarket - E-Commerce Platform UAS Semester 2

<div align="center">

![DinoMarket Logo](https://img.shields.io/badge/DinoMarket-E--Commerce-green?style=for-the-badge&logo=shopping-cart)

**Platform E-Commerce Modern dengan Simulasi Backend menggunakan LocalStorage**  
*Capstone Project: Semester 2 Web Development*

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.6-764abc?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![Testing](https://img.shields.io/badge/Testing-Vitest-green?style=flat&logo=vitest)](https://vitest.dev/)

[🔗 Demo Live](https://vito28.github.io/DinoMarket/) • [🐛 Report Issues](https://github.com/Vito28/UAS/issues) • [💡 Feature Request](https://github.com/Vito28/UAS/issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Learning Outcomes](#-learning-outcomes)
- [Konsep & Alur Sistem](#-konsep--alur-sistem)
- [Fitur Utama](#-fitur-utama)
- [Sistem Cart (Keranjang Belanja)](#-sistem-cart-keranjang-belanja)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**DinoMarket** adalah aplikasi e-commerce modern yang dibangun dengan **React 18** dan **Vite**, menampilkan sistem pemesanan keranjang belanja yang lengkap dengan **simulasi backend menggunakan LocalStorage**. Proyek ini dirancang sebagai **Capstone Project (UAS) Semester 2** dan mendemonstrasikan implementasi **clean architecture** dalam aplikasi frontend dengan state management yang robust, component-based architecture, dan design system yang konsisten.

### 🌟 Kenapa DinoMarket?

- ✅ **Zero Backend Required** - Simulasi lengkap sistem backend menggunakan localStorage dan custom events
- ✅ **Production-Ready Architecture** - Struktur folder yang terorganisir dan maintainable
- ✅ **Modern React Patterns** - Hooks, Context, Custom Hooks, dan Component Composition
- ✅ **State Management** - Redux Toolkit untuk authentication + localStorage untuk cart/persistence
- ✅ **Responsive UI** - Bootstrap 5.3 dengan mobile-first design
- ✅ **Data Persistence** - Multi-user support dengan localStorage untuk cart isolation
- ✅ **Component Testing** - Vitest & Testing Library terintegrasi
- ✅ **Component Documentation** - Storybook untuk katalog komponen interaktif
- ✅ **Form Validation** - Sistem checkout dengan validasi real-time

---

## 🎓 Learning Outcomes

Setelah mempelajari proyek ini, Anda akan memahami:

### Frontend Development (React)
- ✅ Component lifecycle dan React Hooks (useState, useEffect, useCallback, useMemo)
- ✅ Custom Hooks untuk reusable stateful logic
- ✅ React Router untuk client-side routing
- ✅ Context API dan Redux Toolkit untuk state management
- ✅ Form handling dengan validasi dan persistence

### Architecture & Design Patterns
- ✅ **Clean Architecture** - Separation of Concerns (Components, Pages, Services, Storage)
- ✅ **Container/Presentational Pattern** - Smart components vs Dumb components
- ✅ **Service Layer Pattern** - API abstraction layer
- ✅ **Storage/Persistence Layer** - Backend simulation dengan localStorage
- ✅ **Event-Driven Architecture** - Custom events untuk cross-component communication

### Full-Stack Simulation
- ✅ Frontend-only backend simulation menggunakan localStorage
- ✅ Data normalization dan deduplication
- ✅ Multi-user data isolation dan management
- ✅ Real-time synchronization antar tabs/windows
- ✅ Legacy data migration strategies

### Development Practices
- ✅ Component testing dengan Vitest & React Testing Library
- ✅ Component documentation dengan Storybook
- ✅ Build optimization dengan Vite
- ✅ Code quality dengan ESLint & formatting conventions
- ✅ Deployment automation dengan GitHub Pages

---

## 🔄 Konsep & Alur Sistem

### Alur Umum Aplikasi (User Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Landing (Home) → Browse Catalog → Search → Product Detail  │
│         ↓                                          ↓          │
│      View Products                            View Details   │
│         ↓                                          ↓          │
│      ├─────────────────→ Add to Cart ←──────────────┤       │
│      │                                              │        │
│      └─→ View Cart → Update Quantities → Checkout ─┘        │
│                      (add notes, remove items)               │
│                                                              │
│           Checkout Process:                                 │
│           ├─ Enter Shipping Address                         │
│           ├─ Choose Shipping Method                         │
│           ├─ Choose Payment Method                          │
│           ├─ Review Order Summary                           │
│           └─ Confirm Order (Save to localStorage)           │
│                                                              │
│           Order Confirmation → Order History                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     REACT COMPONENT LAYER                        │
├──────────────────────────────────────────────────────────────────┤
│  Pages (Home, Shop, Cart, Checkout) ↔ Components (ProductCard)  │
│                              ↓                                    │
├──────────────────────────────────────────────────────────────────┤
│                    STATE MANAGEMENT LAYER                        │
├──────────────────────────────────────────────────────────────────┤
│  Redux Store (Auth) + Custom Hooks (useCatalogData)              │
│                              ↓                                    │
├──────────────────────────────────────────────────────────────────┤
│                     SERVICES & API LAYER                         │
├──────────────────────────────────────────────────────────────────┤
│  catalogApi (fetch products) | authService (manage auth)         │
│                              ↓                                    │
├──────────────────────────────────────────────────────────────────┤
│               STORAGE & PERSISTENCE LAYER (Backend Simulation)   │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ cartStorage  │  │ authStorage  │  │ userStorage  │           │
│  │              │  │              │  │              │           │
│  │ - CRUD Items │  │ - Login/Auth │  │ - User Data  │           │
│  │ - Quantity   │  │ - Logout     │  │ - Profile    │           │
│  │ - Notes      │  │ - State      │  │ - Prefs      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│         ↓                  ↓                  ↓                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         localStorage (Browser Storage)                   │   │
│  │  - ecom.cart.{userId}     (Cart items per user)          │   │
│  │  - ecom.auth.status       (Auth state)                   │   │
│  │  - ecom.user.{userId}     (User profile)                 │   │
│  │  - ecom.orders.{userId}   (Order history)                │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Event-Driven Communication

```
Cart Storage Updates
        ↓
   emitCartUpdate()
        ↓
CustomEvent: 'cart:updated'
        ↓
Window Event Listeners (Cart.jsx, PopupCart.jsx)
        ↓
Component Re-render
```

---

---

## ✨ Fitur Utama

### 🛍️ Shopping Experience
- **Katalog Produk Dinamis** - Browse produk dengan data JSON dari `/public/product.json`
- **Pencarian Real-time** - Cari produk dengan instant feedback dan filter
- **Detail Produk** - Informasi lengkap: harga, diskon, deskripsi
- **Responsive Gallery** - Foto produk dengan UI interaktif

### 🛒 Advanced Cart Management (Sistem Keranjang Belanja)
- **Add to Cart** - Tambah produk dengan quantity validation (1-100)
- **Quantity Control** - Atur/tambah/kurang jumlah dengan validasi
- **Cart Notes per Item** - Tambahkan catatan khusus untuk setiap produk (max 500 chars)
- **Persistent Cart** - Data tersimpan di localStorage (tidak hilang saat refresh)
- **Multi-User Support** - Setiap user memiliki cart terpisah
- **Real-time Sync** - Sinkronisasi antar tabs/windows secara real-time
- **Deduplication** - Mencegah duplikasi item di cart
- **Legacy Migration** - Support untuk data cart lama (backward compatibility)

### 💳 Checkout & Order Management
- **Order Summary** - Ringkasan pesanan dengan kalkulasi harga otomatis
- **User Authentication** - Simulasi login/logout dengan data persisten
- **Shipping Methods** - Pilih metode pengiriman (Standard, Express, Overnight)
- **Payment Options** - Bank Transfer, E-Wallet (diskon 2%), Credit Card (fee 1.5%)
- **Form Validation** - Real-time validation untuk semua field checkout
- **Order History** - Riwayat pembelian tersimpan per user
- **Order Persistence** - Semua order disimpan di localStorage dengan timestamp

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach, works on semua screen size
- **Bootstrap Components** - Modal, Card, Form, Button, Badge, etc.
- **Loading States** - Loading indicators untuk better UX
- **Error Handling** - 404 page dan error boundaries
- **Icons Library** - React Icons (50+ icons) untuk UI yang lebih visual
- **Toast Notifications** - Feedback untuk user actions

---

## 🛒 Sistem Cart (Keranjang Belanja)

Ini adalah **core feature** dari DinoMarket yang mendemonstrasikan backend simulation menggunakan localStorage. Mari kita pelajari bagaimana sistem ini bekerja:

### Cart Data Structure

```javascript
// Struktur data di localStorage
{
  "ecom.cart.user123": {
    "items": [
      {
        "productId": 1,           // ID produk (unique identifier)
        "shopId": null,           // ID toko (optional)
        "quantity": 5,            // Jumlah (1-100)
        "note": "Warna merah"      // Catatan custom (optional)
      },
      {
        "productId": 42,
        "shopId": 1,
        "quantity": 2,
        "note": "Pengiriman cepat"
      }
    ]
  }
}
```

### Cart API Functions

#### 1. **Add to Cart** - Menambah item ke keranjang
```javascript
upsertCartItem({
  productId: 1,      // Required: Product ID
  quantity: 3,       // Optional: Qty (default 1, auto-clamp 1-100)
  note: "Catatan"    // Optional: Item notes
})
// Hasil: Item ditambah, atau jika sudah ada, quantity dijumlah
```

#### 2. **Update Quantity** - Ubah jumlah item tertentu
```javascript
updateCartItemQuantity(productId, newQuantity)
// Contoh: updateCartItemQuantity(1, 5) → Set qty item ID 1 jadi 5
// Auto-clamping: jika < 1 menjadi 1, jika > 100 menjadi 100
```

#### 3. **Adjust Quantity** - Tambah/kurang quantity dengan delta
```javascript
adjustCartItemQuantity(productId, delta)
// Contoh: adjustCartItemQuantity(1, +2) → Tambah 2
//         adjustCartItemQuantity(1, -1) → Kurang 1
```

#### 4. **Get Cart Items** - Ambil semua items di cart
```javascript
const items = getCartItems()
// Result: Array of cart items
```

#### 5. **Get Single Item** - Ambil detail 1 item
```javascript
const item = getCartItem(productId)
// Result: Item object atau null
```

#### 6. **Add/Update Notes** - Update catatan untuk item
```javascript
setCartItemNote(productId, "Catatan baru")
// Update note untuk item tertentu
```

#### 7. **Remove Item** - Hapus item dari cart
```javascript
removeCartItem(productId)
// Menghapus item dengan ID tertentu
```

#### 8. **Clear Cart** - Kosongkan seluruh cart
```javascript
clearCart()
// Hapus semua items (reset ke empty state)
```

#### 9. **Get Cart Totals** - Hitung total harga
```javascript
const totals = getCartTotals(productsCatalog)
// Result: { count: 5, subtotal: 150000, total: 135000 }
// count: total items, subtotal: sebelum diskon, total: setelah diskon
```

### Cart Features - Validation & Safety

#### Quantity Validation
- **Min**: 1 item (tidak boleh 0 atau negatif)
- **Max**: 100 items per produk
- **Type**: Auto-converted ke number, NaN → default 1
- **Clamping**: Otomatis menyesuaikan jika out of range

```javascript
sanitiseQuantity(quantity)
// -5 → 1 (invalid negative)
// 0 → 1 (zero not allowed)
// 250 → 100 (exceeds max)
// 3.7 → 3 (floored to integer)
// "abc" → 1 (NaN default)
```

#### Item Deduplication
- Setiap cart hanya boleh 1 entry per `productId`
- Jika add item yang sudah ada → quantity dijumlah, bukan duplikat
- Automatic cleanup saat load dari storage

#### Multi-User Support
- Cart key: `ecom.cart.{userId}` atau `ecom.cart.guest` untuk anonymous
- Setiap user memiliki cart terpisah
- Switching user otomatis switch cart

```javascript
// Cart key generation
getCartStorageKey() // → "ecom.cart.user123" atau "ecom.cart.guest"
```

### Real-Time Synchronization

Cart system menggunakan **custom events** untuk notifikasi real-time:

```javascript
// Saat ada perubahan cart, emit custom event
window.dispatchEvent(
  new CustomEvent('cart:updated', {
    detail: {
      key: 'ecom.cart.user123',
      items: [...items]
    }
  })
)

// Component bisa listen ke event ini
window.addEventListener('cart:updated', handleCartUpdate)
```

**Benefit**: 
- ✅ Antar tab/window sinkronisasi otomatis
- ✅ Multiple components bisa react terhadap perubahan cart
- ✅ Tidak perlu prop drilling atau context API
- ✅ Event-driven architecture yang scalable

### Cart Operations Flow

```
User Action
    ↓
Component calls cartStorage function
    ↓
getCartItems() → Read current state from localStorage
    ↓
Validate & Normalize data
    ↓
Apply changes (add/update/remove)
    ↓
Deduplication (ensure no duplicates)
    ↓
persistCartState() → Write to localStorage
    ↓
emitCartUpdate() → Dispatch custom event
    ↓
Component listeners react & re-render
```

### Legacy Migration (Data Migration Strategy)

System mendukung backward compatibility untuk data cart lama:

```javascript
migrateLegacyCart()
// Cek stored_products (old format)
// Cek ecom.cart (old structured format)
// Transformasi ke format baru
// Delete old keys setelah migrate
// Ini penting untuk smooth upgrade dari versi lama
```

### Usage Examples

#### Contoh 1: Add Product to Cart
```javascript
// File: Components/ProductCard.jsx
import { upsertCartItem } from '../storage/cartStorage'

const handleAddToCart = () => {
  upsertCartItem({
    productId: product.id,
    quantity: selectedQty,
    note: userNote
  })
  // Cart automatically updated & persisted
}
```

#### Contoh 2: Listening to Cart Changes
```javascript
// File: Pages/Cart.jsx
import { CART_UPDATED_EVENT, getCartItems } from '../storage/cartStorage'

useEffect(() => {
  const handleCartUpdate = () => {
    setItems(getCartItems()) // Update component state
  }
  
  window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate)
  window.addEventListener('storage', handleCartUpdate) // Cross-tab sync
  
  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    window.removeEventListener('storage', handleCartUpdate)
  }
}, [])
```

#### Contoh 3: Calculate Checkout Total
```javascript
// File: Pages/Checkout.jsx
import { getCartTotals } from '../storage/cartStorage'

const totals = getCartTotals(productsCatalog)
// totals.count → 5 items
// totals.subtotal → Rp 500.000
// totals.total → Rp 450.000 (after discount)
```

---

## 🚀 Teknologi

### Frontend Core
| Library | Version | Purpose |
|---------|---------|---------|
| **React** | 18.3.1 | UI Library & Component Framework |
| **Vite** | Latest | Modern build tool dengan HMR super cepat |
| **React Router** | 6.24.1 | Client-side routing & navigation |
| **Redux Toolkit** | 2.2.6 | State management (auth state) |
| **Bootstrap** | 5.3.3 | UI Component framework & styling |
| **React Bootstrap** | 2.10.4 | Bootstrap components sebagai React components |

### Development & Testing
| Tool | Version | Purpose |
|------|---------|---------|
| **Vitest** | 3.2.4 | Unit testing framework (super cepat) |
| **Testing Library** | 16.3.0 | React component testing utilities |
| **Storybook** | 8.6.14 | Component development & documentation |
| **ESLint** | 8.57.0 | Code linting & quality |
| **SASS** | 1.77.6 | CSS preprocessing |

### Utilities
| Package | Purpose |
|---------|---------|
| **React Icons** | Icon library (50+ icons) |
| **React Helmet Async** | Document head management |
| **Framer Motion** | Animation library (optional, installed) |
| **gh-pages** | GitHub Pages deployment automation |

---

## 🏗️ Arsitektur Sistem

### Architectural Patterns

#### 1. **Clean Architecture / Clean Code**
```
Presentation Layer (Pages, Components)
           ↓
Business Logic Layer (Hooks, Services)
           ↓
Data Access Layer (Storage, API)
           ↓
Infrastructure Layer (localStorage, JSON files)
```

#### 2. **Container/Presentational Pattern**
```javascript
// Container Component (Smart)
// File: Pages/Cart.jsx
- Handles state management
- Calls API/storage functions
- Passes data to presentational components

// Presentational Component (Dumb)
// File: Layout/ProductsInCart.jsx
- Receives props
- Renders UI
- Calls callbacks (onDelete, onQuantityChange)
```

#### 3. **Service Layer Pattern**
```
Components
    ↓
Services (catalogApi.js, API abstraction)
    ↓
External Data (JSON, API calls)
```

#### 4. **Storage Layer (Backend Simulation)**
```
Components/Pages
    ↓
Storage Functions (cartStorage, userStorage, authStorage)
    ↓
localStorage (Data Persistence)
```

#### 5. **Event-Driven Architecture**
```
Cart Update
    ↓
emitCartUpdate() → CustomEvent
    ↓
Global Event Listeners (Window)
    ↓
Component Re-renders
```

### Technology Stack Integration

```javascript
// Redux for Auth State
store/index.js
├─ Auth slice (user login state)
├─ Redux middleware
└─ Store configuration

// Custom Hooks for Business Logic
hooks/useCatalogData.js
├─ Data fetching
├─ Loading states
└─ Error handling

// Storage Layer for Persistence
storage/
├─ localStorage.js (core layer)
├─ cartStorage.js (cart operations)
├─ authStorage.js (auth persistence)
└─ userStorage.js (user data)

// Services for API Abstraction
services/catalogApi.js
├─ Fetch products
├─ Handle loading states
└─ Centralized API logic

// React Router for Navigation
Components/
├─ Navigation.jsx (route links)
└─ Pages route definitions in App.jsx
```

---

## 📁 Struktur Proyek

```
DinoMarket/
│
├── 📂 public/                          # Static assets & data
│   ├── product.json                    # Main product catalog (data source)
│   ├── CNAME                           # GitHub Pages CNAME config
│   ├── note.xsd                        # XML Schema (notes validation)
│   └── tes.html                        # Testing HTML file
│
├── 📂 scripts/                         # Utility scripts
│   ├── build_products.py               # Build products data from source
│   └── generate_products.py            # Generate dummy/test products
│
├── 📂 src/
│   │
│   ├── 📂 Pages/                       # Page-level components (Full pages)
│   │   ├── Home.jsx                    # Landing/homepage
│   │   ├── Shop.jsx                    # Product detail page
│   │   ├── Cart.jsx                    # Shopping cart page
│   │   ├── Checkout.jsx                # Checkout & order page
│   │   ├── SearchResults.jsx           # Search results page
│   │   ├── 404.jsx                     # Not found page
│   │   └── 📂 __tests__/
│   │       └── Checkout.test.jsx       # Checkout page tests
│   │
│   ├── 📂 Components/                  # Reusable UI components
│   │   ├── AuthButton.jsx              # Auth button (login/logout)
│   │   ├── Navigation.jsx              # Navbar with routing
│   │   ├── Footer.jsx                  # Footer component
│   │   ├── ProductCard.jsx             # Single product card
│   │   ├── ProductCard.stories.jsx     # Storybook story for ProductCard
│   │   ├── QuantityButton.jsx          # Quantity selector component
│   │   ├── QuantityButton.stories.jsx  # Storybook story
│   │   ├── Search.jsx                  # Search bar component
│   │   ├── 📂 Popup/
│   │   │   ├── PopupCart.jsx           # Cart popup modal
│   │   │   └── PopupCart.scss          # Popup styles
│   │   └── 📂 __tests__/
│   │       └── ProductCard.test.jsx    # ProductCard unit tests
│   │
│   ├── 📂 Layout/                      # Layout components
│   │   ├── ProductsInCart.jsx          # Layout for cart with items
│   │   └── ProductsNotInCart.jsx       # Layout for empty cart
│   │
│   ├── 📂 storage/                     # Storage layer (Backend Simulation)
│   │   ├── localStorage.js             # Core storage utilities
│   │   │   ├─ writeStorage(key, value)
│   │   │   ├─ readStorage(key, default)
│   │   │   └─ removeStorage(key)
│   │   ├── cartStorage.js              # Cart CRUD operations
│   │   │   ├─ addToCart() / upsertCartItem()
│   │   │   ├─ getCartItems()
│   │   │   ├─ updateCartItemQuantity()
│   │   │   ├─ removeCartItem()
│   │   │   ├─ getCartTotals()
│   │   │   └─ Custom events for sync
│   │   ├── authStorage.js              # Auth state management
│   │   │   ├─ login() / logout()
│   │   │   ├─ isAuthenticated()
│   │   │   └─ loadAuthState()
│   │   └── userStorage.js              # User data management
│   │       ├─ getActiveUserId()
│   │       ├─ setActiveUser()
│   │       └─ User preferences
│   │
│   ├── 📂 store/                       # Redux store configuration
│   │   └── index.js
│   │       ├─ Auth slice (Redux Toolkit)
│   │       ├─ Store configuration
│   │       ├─ Actions (setUser, clearUser)
│   │       └─ CatalogApi middleware
│   │
│   ├── 📂 services/                    # API & service layer
│   │   └── catalogApi.js               # RTK Query for products fetching
│   │       ├─ getCatalog (query)
│   │       ├─ Cache management
│   │       └─ Loading/error states
│   │
│   ├── 📂 hooks/                       # Custom React hooks
│   │   └── useCatalogData.js           # Hook untuk data katalog
│   │       ├─ Fetches products
│   │       ├─ Handles loading states
│   │       └─ Error handling
│   │
│   ├── 📂 utils/                       # Utility functions
│   │   └── format.js                   # Formatting helpers
│   │       ├─ formatCurrency()
│   │       ├─ formatDate()
│   │       └─ Other formatters
│   │
│   ├── 📂 data/                        # Static data
│   │   └── products.json               # Product data fallback
│   │
│   ├── 📂 assets/                      # Static assets
│   │   ├── 📂 Image/                   # Product images
│   │   └── 📂 Style/                   # Global styles
│   │       ├── _variable.scss          # SASS variables
│   │       ├── index.css               # Global CSS
│   │       ├── 📂 Components/          # Component-scoped styles
│   │       └── 📂 Pages/               # Page-scoped styles
│   │
│   ├── App.jsx                         # Root component
│   │   ├─ Redux provider
│   │   ├─ Router setup
│   │   └─ Route definitions
│   │
│   └── main.jsx                        # Entry point
│       ├─ React render
│       └─ Provider wrapping
│
├── 📄 index.html                       # HTML template
├── 📄 package.json                     # Dependencies & scripts
├── 📄 vite.config.js                   # Vite configuration
├── 📄 vitest.setup.js                  # Vitest test setup
└── 📄 README.md                        # Documentation (this file)
```

### Folder Structure Rationale

| Folder | Purpose | Pattern |
|--------|---------|---------|
| `Pages/` | Full page components | Route-level components |
| `Components/` | Reusable UI components | Single responsibility |
| `Layout/` | Layout templates | Multiple component composition |
| `storage/` | Data persistence | Backend simulation layer |
| `store/` | Redux configuration | Global state management |
| `services/` | API abstraction | Data fetching layer |
| `hooks/` | Custom React hooks | Reusable stateful logic |
| `utils/` | Helper functions | Pure functions |
| `assets/` | Static files | Images, styles, fonts |
| `data/` | Static data | JSON data fallback |

---

## 🔧 Instalasi & Setup

### Prerequisites

Pastikan Anda memiliki:
- **Node.js** v16+ (download dari https://nodejs.org)
- **npm** / **yarn** / **pnpm** (biasanya bundled dengan Node.js)
- **Git** (untuk clone repository)
- **Code Editor** (VS Code recommended)

Verify installation:
```bash
node --version    # v18.x.x atau lebih tinggi
npm --version     # 9.x.x atau lebih tinggi
git --version     # 2.x.x atau lebih tinggi
```

### Step-by-Step Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Vito28/UAS.git
cd DinoMarket
```

#### 2. Install Dependencies
```bash
npm install
# atau dengan yarn: yarn install
# atau dengan pnpm: pnpm install
```
*Tunggu beberapa saat hingga semua dependencies terinstall*

#### 3. (Optional) Generate Product Data
Jika ingin membuat dummy products:
```bash
python scripts/generate_products.py    # Generate products
python scripts/build_products.py       # Build data
```

#### 4. Start Development Server
```bash
npm run dev
```

Output akan terlihat seperti:
```
  VITE v5.3.1  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h + enter to show help
```

#### 5. Open in Browser
Navigate to: **http://localhost:5173**

🎉 **Selesai!** Aplikasi sudah siap digunakan

---

## 💻 Penggunaan (Development)

### Available Scripts

```bash
# Development server dengan HMR
npm run dev

# Build untuk production
npm run build

# Preview production build secara lokal
npm run preview

# Run unit tests
npm run test

# Run tests dalam watch mode
npm run test:watch

# Run linting
npm run lint

# Storybook untuk dokumentasi komponen
npm run storybook

# Build Storybook untuk deployment
npm run build-storybook

# Deploy ke GitHub Pages
npm run deploy
```

### Typical Development Workflow

1. **Start dev server**
   ```bash
   npm run dev
   ```
   - HMR (Hot Module Replacement) otomatis reload
   - Sangat cepat berkat Vite

2. **Make changes** - Edit file di `src/`
   - Auto-reload di browser
   - Error ditampilkan di overlay

3. **Run tests** (in another terminal)
   ```bash
   npm run test:watch
   ```
   - Run tests saat ada file changes

4. **Check linting**
   ```bash
   npm run lint
   ```
   - Sebelum commit/push

5. **Build & deploy**
   ```bash
   npm run build      # Create dist/
   npm run deploy     # Push ke GitHub Pages
   ```

---

## 🧪 Testing

### Unit Testing dengan Vitest

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- ProductCard.test.jsx

# Run with coverage
npm run test -- --coverage
```

### Test Examples

#### Component Test - ProductCard.test.jsx
```javascript
import { render, screen } from '@testing-library/react'
import ProductCard from '../ProductCard'

describe('ProductCard', () => {
  it('should render product name', () => {
    const product = { id: 1, name: 'Test', price: 1000 }
    render(<ProductCard product={product} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  
  it('should handle add to cart click', () => {
    // Test implementation
  })
})
```

### Component Documentation dengan Storybook

```bash
# Launch Storybook
npm run storybook

# Build static Storybook
npm run build-storybook
```

Access di: **http://localhost:6006**

Tersedia untuk:
- ✅ ProductCard.stories.jsx
- ✅ QuantityButton.stories.jsx
- ✅ Komponen lainnya

---

## 🚀 Deployment

### GitHub Pages Deployment

Aplikasi ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages:

#### Step 1: Update `package.json`
```json
{
  "homepage": "https://[YOUR-GITHUB-USERNAME].github.io/DinoMarket"
}
```

#### Step 2: Build & Deploy
```bash
npm run build    # Create optimized dist/
npm run deploy   # Push dist/ ke gh-pages branch
```

#### Step 3: Enable GitHub Pages
1. Go to Repository Settings
2. → Pages section
3. Source: Deploy from branch
4. Branch: `gh-pages` / `root`
5. Save

**URL**: `https://[YOUR-USERNAME].github.io/DinoMarket/`

### Production Build Tips

```bash
# Build with analysis
npm run build

# Check build size
npm run preview    # Preview production build locally
```

Build output:
- ✅ Optimized bundle
- ✅ Code splitting
- ✅ CSS minification
- ✅ Asset optimization

---

## 🎨 Customization

### Mengubah Tema & Style

Edit SASS variables di `src/assets/Style/_variable.scss`:

```scss
// Color Scheme
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$danger-color: #dc3545;

// Typography
$font-primary: 'Segoe UI', sans-serif;
$font-size-base: 1rem;

// Spacing
$spacing-unit: 8px;
$container-max-width: 1200px;
```

### Menambah Produk

#### Option 1: Manual Edit
Edit file `public/product.json` atau `src/data/products.json`:

```json
{
  "id": 999,
  "name": "Produk Baru",
  "price": 50000,
  "discount_percentage": 10,
  "description": "Deskripsi produk"
}
```

#### Option 2: Generate dengan Python
```bash
python scripts/generate_products.py
python scripts/build_products.py
```

### Membuat Component Baru

#### Structure:
```jsx
// src/Components/MyComponent.jsx
import React from 'react'
import PropTypes from 'prop-types'

const MyComponent = ({ title, onAction }) => {
  return (
    <div className="my-component">
      <h3>{title}</h3>
      <button onClick={onAction}>Action</button>
    </div>
  )
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
}

MyComponent.defaultProps = {
  onAction: () => {},
}

export default MyComponent
```

#### Add Storybook Story:
```jsx
// src/Components/MyComponent.stories.jsx
import MyComponent from './MyComponent'

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
}

export const Default = {
  args: {
    title: 'My Component',
  },
}
```

#### Add Tests:
```jsx
// src/Components/__tests__/MyComponent.test.jsx
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('should render title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

---

## 📚 Learn More

### React Documentation
- [React Official Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com)

### State Management
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Context API](https://react.dev/reference/react/useContext)

### Frontend Tools
- [Vite Guide](https://vitejs.dev/guide)
- [Bootstrap Components](https://react-bootstrap.github.io/)
- [Vitest](https://vitest.dev)
- [Storybook](https://storybook.js.org)

### Frontend Best Practices
- Clean Architecture: [Clean Code, Uncle Bob](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- Design Patterns: [Refactoring Guru](https://refactoring.guru/design-patterns)
- React Patterns: [patterns.dev](https://patterns.dev/react)

---

## 🤝 Kontribusi

Kami menerima kontribusi! Cara berkontribusi:

### 1. Fork Repository
```bash
# Di GitHub, klik tombol Fork
```

### 2. Clone Forked Repository
```bash
git clone https://github.com/YOUR-USERNAME/DinoMarket.git
cd DinoMarket
```

### 3. Create Feature Branch
```bash
git checkout -b feature/AmazingFeature
```

### 4. Make Changes & Commit
```bash
git add .
git commit -m 'Add: Amazing feature description'
# Commit messages: 'Add:', 'Fix:', 'Refactor:', 'Docs:'
```

### 5. Push ke Branch
```bash
git push origin feature/AmazingFeature
```

### 6. Create Pull Request
- Go ke repository
- Klik "Compare & Pull Request"
- Describe perubahan Anda

### Coding Standards

```javascript
// ✅ DO:
- Use descriptive variable names
- Write comments untuk complex logic
- Add PropTypes untuk semua props
- Write tests untuk new features
- Keep functions small & focused

// ❌ DON'T:
- Don't use `var`, use `const` or `let`
- Don't commit console.log statements
- Don't hardcode magic numbers
- Don't skip PropTypes
- Don't ignore ESLint warnings
```

### Pre-commit Checklist

Sebelum push:
```bash
# Run linting
npm run lint

# Run tests
npm run test

# Build successfully
npm run build

# No console errors
```

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan pendidikan dan portfolio. Silakan gunakan sebagai referensi pembelajaran.

---

## 👨‍💻 Author

**Vito28**

- GitHub: [@Vito28](https://github.com/Vito28)
- Repository: [UAS/DinoMarket](https://github.com/Vito28/UAS)
- Live Demo: [vito28.github.io/DinoMarket](https://vito28.github.io/DinoMarket/)

---

## 🙏 Acknowledgments

Terima kasih kepada:
- **React Team** untuk library yang amazing
- **Vite Team** untuk build tool yang super cepat
- **Redux Team** untuk state management yang elegant
- **Bootstrap Team** untuk UI components yang comprehensive
- **Community Open Source** untuk semua dependencies & tools

---

## 📞 Support & Feedback

### Report Bugs
[Open Issue](https://github.com/Vito28/UAS/issues/new?template=bug_report.md)

### Request Features
[Open Issue](https://github.com/Vito28/UAS/issues/new?template=feature_request.md)

### Diskusi
[GitHub Discussions](https://github.com/Vito28/UAS/discussions)

---

<div align="center">

### Made with ❤️ using React & Vite

**DinoMarket** - Capstone Project Semester 2  
Learning Full-Stack Development Simulation in Frontend

⭐ **Star this repository** if you find it helpful!

[⬆ Back to top](#-dinomarket---e-commerce-platform-uas-semester-2)

</div>
