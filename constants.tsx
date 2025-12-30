
import React from 'react';
import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍦' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'b1',
    categoryId: 'burgers',
    name: 'Classic Cheeseburger',
    description: '100% beef patty with melted cheddar, lettuce, and tomato.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    options: [
      { id: 'opt1', name: 'Extra Cheese', price: 1.00 },
      { id: 'opt2', name: 'Bacon', price: 1.50 },
      { id: 'opt3', name: 'Jalapenos', price: 0.50 },
    ]
  },
  {
    id: 'b2',
    categoryId: 'burgers',
    name: 'Spicy BBQ Burger',
    description: 'Smoky BBQ sauce, jalapeños, and crispy onions.',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400',
    options: [
      { id: 'opt1', name: 'Extra Cheese', price: 1.00 },
      { id: 'opt2', name: 'Bacon', price: 1.50 },
    ]
  },
  {
    id: 's1',
    categoryId: 'sides',
    name: 'Regular Fries',
    description: 'Golden crispy potato fries with sea salt.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400',
    options: [
      { id: 'opt4', name: 'Large Size', price: 1.00 },
      { id: 'opt5', name: 'Cheese Dip', price: 0.75 },
    ]
  },
  {
    id: 'd1',
    categoryId: 'drinks',
    name: 'Fresh Lemonade',
    description: 'House-made lemonade with real lemons.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1523362628242-f513a30ef2b1?auto=format&fit=crop&q=80&w=400',
    options: [
      { id: 'opt6', name: 'Extra Ice', price: 0 },
      { id: 'opt7', name: 'Large', price: 0.50 },
    ]
  }
];
