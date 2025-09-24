"use client";

import React from 'react';
import MenuItem from "./components/MenuItem";
import { useCart } from './components/CartContext';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";


export default function Home() {
  const { cart } = useCart();

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Can't decide what to drink yet?");

    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        created: Timestamp.now()
      });
      alert("Order placed! We'll start brewing soon ☕");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <main className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>ackerbrew ☕</h1>

      <MenuItem 
        name="africano de negro"
        description="Black coffee, best in the Netherlands!"
        onOrder={() => alert('Ordered Africano!')}
      />

      <MenuItem 
        name="leche ka!"
        description="Milk and espresso is equals filipino "
        onOrder={() => alert('Ordered Latte!')}
        />

      <MenuItem 
        name="asiano pero no chino"
        description="Espresso with steamed milk and foam"
        onOrder={() => alert('Ordered Cappuccino!')}
      />  

    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold mb-2">🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <>
            <ul className="list-disc pl-5">
              {cart.map((item, index) => (
                <li key={index}>{item.name}</li>
              )
              )}
            </ul>
            <button
              onClick={placeOrder}
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Place Order
            </button>
          </>
        )}
    </div>

    </main>
  );
}