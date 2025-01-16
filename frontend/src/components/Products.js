import React, { useState, useEffect } from 'react';
import axios from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('/product');
    setProducts(response.data);
  };

  const addProduct = async () => {
    await axios.post('/product', { name, price });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/product/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
