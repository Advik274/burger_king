
import { Category, Product, CartItem } from '../types';

/**
 * Service to handle all interactions with the Flask backend.
 * Currently uses mock logic but structured for easy URL replacement.
 */
const API_BASE_URL = '/api';

export const fetchCategories = async (): Promise<Category[]> => {
  // const res = await fetch(`${API_BASE_URL}/categories`);
  // return res.json();
  return []; // Mocked in constants for now
};

export const fetchProducts = async (categoryId: string): Promise<Product[]> => {
  // const res = await fetch(`${API_BASE_URL}/products/${categoryId}`);
  // return res.json();
  return [];
};

export const submitOrder = async (cart: CartItem[], total: number) => {
  const payload = {
    items: cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      options: item.selectedOptions.map(o => o.id)
    })),
    total_price: total
  };

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    console.error("Order submission failed:", error);
    throw error;
  }
};
