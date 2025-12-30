# QuickBite Kiosk 🍔🍟

QuickBite Kiosk is a professional-grade, touch-optimized self-ordering web application designed for high-traffic food service environments. It features a clean, minimal UI focused on speed and accessibility.

## 🚀 Features

### Customer Experience
- **Touch-Optimized UI:** Large buttons, no-hover interactions, and smooth transitions designed for kiosk tablets.
- **Dynamic Menu:** Categorized browsing (Burgers, Sides, Drinks, Desserts).
- **Item Customization:** Add extras like cheese or bacon with real-time price updates.
- **Smart Cart:** Easy quantity management and clear checkout flow.
- **Order Confirmation:** Automated order number generation and success feedback.

### Administration
- **Role-Based Access:** Dedicated portal for staff and customers.
- **Inventory Management:** Add new items with names, prices, categories, and custom images.
- **Real-time Updates:** Instant reflection of inventory changes on the customer menu.
- **Dashboard Overview:** Quick stats on total items and categories.

## 🛠 Tech Stack

- **Frontend:** React 19 (Functional Components, Hooks)
- **Styling:** Tailwind CSS (Responsive Utility-First Design)
- **Logic:** TypeScript (Strongly typed models and state)
- **Icons/Images:** Lucide-style emoji icons and high-quality Unsplash placeholders.

## 📁 Project Structure

```text
/src
├── components/
│   ├── AdminDashboard.tsx      # Inventory management portal
│   ├── LoginPage.tsx           # Entry point for role selection
│   ├── CategorySidebar.tsx     # Vertical category navigation
│   ├── ProductGrid.tsx         # Responsive item display
│   ├── CartSidebar.tsx         # Order summary and checkout
│   ├── CustomizationModal.tsx  # Product options and extras
│   └── OrderConfirmation.tsx   # Post-purchase success screen
├── types.ts                    # TypeScript interfaces & enums
├── constants.tsx               # Mock data and configuration
├── App.tsx                     # Main state machine and routing
└── index.tsx                   # React DOM entry point
```

## ⚙️ Setup & Installation

1. **Prerequisites:** Ensure you have a modern web browser.
2. **Execution:** This project uses ESM modules directly via `index.html`. 
3. **Environment:** No build step is strictly required if served via a local server (e.g., Live Server or Vite).
4. **API Key:** If integrating with Google Gemini for smart descriptions (optional), ensure `process.env.API_KEY` is configured.

## 📋 Database Schema (Conceptual)

For the full-stack implementation, use the following MySQL structure:

```sql
CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100),
  icon VARCHAR(10)
);

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50),
  name VARCHAR(255),
  price DECIMAL(10, 2),
  description TEXT,
  image_url TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_price DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---
*Note: This application is optimized for 1080p and 4K touch displays.*
