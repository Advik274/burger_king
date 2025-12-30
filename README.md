# QuickBite Kiosk Pro 🍔🍟✨

QuickBite Kiosk is an advanced, touch-optimized self-ordering web application and back-office management system. It bridges the gap between high-speed customer ordering and efficient kitchen operations.

## 🚀 Pro Features

### 👤 Customer Experience
- **Dynamic Menu & Search:** Real-time filtering and category-based navigation.
- **Advanced Customization:** Interactive modal for adding extras with dynamic pricing.
- **Live Order Tracking:** A dedicated "Status Board" (similar to modern fast-food chains) showing orders in "Preparing" vs "Ready to Pickup" stages.
- **Kiosk Mode:** Full-screen optimized, high-contrast UI with zero-hover dependency.

### ⚙️ Administration & Back-office
- **Live Kitchen Display (KDS):** Real-time incoming order queue. Staff can update order statuses (Preparing -> Ready -> Complete) instantly.
- **AI-Powered Inventory:** Integration with **Google Gemini 3 Flash** to generate professional, mouth-watering product descriptions automatically.
- **Inventory Control:** Instantly toggle "Out of Stock" status to prevent customers from ordering unavailable items.
- **Rich Analytics:** Visual dashboard featuring:
  - Total Revenue tracking.
  - Daily order volume.
  - Average check size.
  - Weekly sales trend charts (CSS-optimized).

## 🛠 Tech Stack

- **Frontend:** React 19 (Functional Components & Hooks).
- **Styling:** Tailwind CSS (Responsive Utility-First Design).
- **AI Integration:** `@google/genai` (Gemini 3 Flash Preview).
- **Icons/Images:** Lucide-style emojis and Unsplash API placeholders.
- **State Management:** Centralized React State for real-time Order/Inventory syncing.

## 📁 Project Structure

```text
/root
├── components/
│   ├── AdminDashboard.tsx      # Multi-tab admin portal (Orders, Inventory, Stats)
│   ├── OrderTracking.tsx       # Public-facing live status board
│   ├── LoginPage.tsx           # Entry point for role-based access
│   ├── CategorySidebar.tsx     # Vertical category navigation
│   ├── ProductGrid.tsx         # Responsive item display with "Out of Stock" logic
│   ├── CartSidebar.tsx         # Order summary and checkout
│   ├── CustomizationModal.tsx  # Product options and extras
│   └── OrderConfirmation.tsx   # Order success screen
├── types.ts                    # TypeScript definitions for Orders, Products, and Statuses
├── constants.tsx               # Initial menu data
├── App.tsx                     # Main state engine and kiosk router
└── services/
    └── api.ts                  # Mock & Real API service layer
```

## ⚙️ Setup & AI Configuration

1. **Environment:** This project uses ESM modules. Serve via any local web server.
2. **AI Descriptions:** The Admin portal uses Gemini. Ensure `process.env.API_KEY` is available in your environment for the "AI ✨" button to function.
3. **Model:** Uses `gemini-3-flash-preview` for low-latency text generation.

## 📋 Data Architecture (MySQL)

For full-stack persistence, the following schema is recommended:

```sql
-- Core Inventory
CREATE TABLE categories (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100), icon VARCHAR(10));
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY, 
    category_id VARCHAR(50), 
    name VARCHAR(255), 
    price DECIMAL(10, 2), 
    is_out_of_stock BOOLEAN DEFAULT FALSE,
    description TEXT
);

-- Order Management
CREATE TABLE orders (
    id VARCHAR(10) PRIMARY KEY,
    total_price DECIMAL(10, 2),
    status ENUM('PENDING', 'PREPARING', 'READY', 'COMPLETED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---
*Developed for high-performance touch displays. QuickBite Kiosk Pro ensures no order is missed and every description is perfect.*
