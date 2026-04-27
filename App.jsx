import React, { useState } from 'react';
import ProductCard from './src/ProductCard';
import laptopImg from './assets/laptop.jpg';
import coffeeImg from './assets/coffeemaker.jpg';
import headphonesImg from './assets/headphones.jpg';



const products = [
  { id: 1, title: 'Laptop', category: 'Electronics', price: 999, image: laptopImg },
  { id: 2, title: 'Coffee Maker', category: 'Home Appliances', price: 49, image: coffeeImg },
  { id: 3, title: 'Headphones', category: 'Electronics', price: 199, image: headphonesImg },
];

export default function App() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter ? product.category === filter : true;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">ShopEase</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 border rounded w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
        <button className="px-3 py-2 sm:px-4 bg-blue-500 text-white rounded text-sm sm:text-base" onClick={() => setFilter('Electronics')}>Electronics</button>
        <button className="px-3 py-2 sm:px-4 bg-green-500 text-white rounded text-sm sm:text-base" onClick={() => setFilter('Home Appliances')}>Home Appliances</button>
        <button className="px-3 py-2 sm:px-4 bg-gray-500 text-white rounded text-sm sm:text-base" onClick={() => setFilter('')}>All</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg sm:text-xl font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="font-bold mt-1">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="w-full lg:w-80 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in cart</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{item.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <hr className="my-3" />
              <p className="font-bold text-sm sm:text-base">Total: ${total}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded text-sm sm:text-base">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
