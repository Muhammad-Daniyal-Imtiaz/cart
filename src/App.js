import {React,  useState } from 'react';
import Records from './records.json';

import './App.css';

function App() {
  // State to store the records
  const [r, setR] = useState(Records.products); // Initialize with the 'products' property

  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [filterPrice, setFilterPrice] = useState(null); // State to store the selected price filter
  const [priceFilterMessage, setPriceFilterMessage] = useState(''); // State to store the price filter message

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  function Add(newitem) {
    // Add the product name to the cart
    setCart((previousItems) => [...previousItems, newitem]);
    alert(newitem.name + ' is successfully Added to Cart');
  }

  const filteredProducts = r.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function filt(minprice, maxprice) {
    // Filter products by price range
    const filteredByPrice = r.filter(
      (product) => product.price >= minprice && product.price <= maxprice
    );

    // Update the filtered products directly in the state
    setR(filteredByPrice);
    setFilterPrice({ min: minprice, max: maxprice });

    // Check if there are no products in the filtered list and show a message
    if (filteredByPrice.length === 0) {
      setPriceFilterMessage('No products available for this price range.');
    } else {
      setPriceFilterMessage(''); // Clear the message if products are available
    }
  }

  function clearFilter() {
    // Reset filter and display all products
    setR(Records.products);
    setFilterPrice(null);
    setPriceFilterMessage(''); // Clear the message
  }

  return (
    <div className="app">


      <header>E-Store</header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div>
        <button onClick={() => filt(0, 10)}>0 to 10</button>
        <button onClick={() => filt(11, 20)}>11 to 20</button>
        <button onClick={() => filt(21, 30)}>21 to 30</button>
        <button onClick={() => filt(31, 40)}>31 to 40</button>
        <button onClick={clearFilter}>Clear Filter</button>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-container">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">
              {product.name} price is ${product.price}
            </h3>
            <button onClick={() => Add(product)}>ADD to cart</button>
          </div>
        ))}
      </div>
      <h2>Cart:</h2>
      <ul>
        {cart.map((cartItem, index) => (
          <li key={index}>
            {cartItem.name}
            <img src={cartItem.image} alt={cartItem.name} />
          </li>
        ))}
      </ul>
      {priceFilterMessage && (
        <div className="popup-message">{priceFilterMessage}</div>
      )}
    </div>
  );
}

export default App;
