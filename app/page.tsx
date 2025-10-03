"use client";

import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Card from 'antd/lib/card';
import { drinkList, Coffee, categories } from './types/DrinkList';

interface CartItem extends Coffee {
  quantity: number;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Filter coffees by category
  const filteredCoffees = activeCategory === 'All' 
    ? drinkList 
    : drinkList.filter(coffee => coffee.category === activeCategory);

  // Get total quantity for a specific coffee
  const getCartItemQuantity = (coffeeId: string) => {
    const item = cartItems.find(item => item.id === coffeeId);
    return item ? item.quantity : 0;
  };

  // Total items in cart
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add item to cart
  const handleAddToCart = (coffee: Coffee) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === coffee.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...coffee, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (coffeeId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === coffeeId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === coffeeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter(item => item.id !== coffeeId);
      }
    });
  };

  // Place order in Firebase
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Can't decide what to drink yet?");
      return;
    }

    try {
      const newOrderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      await addDoc(collection(db, "orders"), {
        items: cartItems,
        orderNumber: newOrderNumber,
        created: Timestamp.now()
      });

      setOrderNumber(newOrderNumber);
      setCartItems([]);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">ackerbrew ☕</h1>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          🛒
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {totalCartItems}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pb-20">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Coffee List */}
        <div className="space-y-4">
          {filteredCoffees.map(coffee => {
            const itemQuantity = getCartItemQuantity(coffee.id);
            return (
              <Card 
                key={coffee.id} 
                className="shadow-md hover:shadow-lg transition-shadow"
                cover={
                  <img 
                    alt={coffee.name} 
                    src={coffee.image}
                    className="h-48 object-cover"
                  />
                }
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{coffee.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{coffee.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {itemQuantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(coffee)}
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveFromCart(coffee.id)}
                          className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors font-bold"
                        >
                          −
                        </button>
                        <span className="font-semibold text-lg w-8 text-center">{itemQuantity}</span>
                        <button
                          onClick={() => handleAddToCart(coffee)}
                          className="bg-amber-600 text-white w-8 h-8 rounded-full hover:bg-amber-700 transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Cart Sidebar/Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some drinks to get started!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="bg-gray-200 text-gray-700 w-7 h-7 rounded-full hover:bg-gray-300 transition-colors"
                            >
                              −
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-amber-600 text-white w-7 h-7 rounded-full hover:bg-amber-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-700">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg mb-4">
                      <span className="font-semibold">Total Items:</span>
                      <span className="font-semibold">
                        {totalCartItems}
                      </span>
                    </div>
                    <button
                      onClick={placeOrder}
                      className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setIsCheckoutOpen(false)}>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-2">Your order number is:</p>
              <p className="text-3xl font-bold text-amber-600 mb-6">{orderNumber}</p>
              <p className="text-gray-500 text-sm mb-6">We&#39;ll start brewing soon ☕</p>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}