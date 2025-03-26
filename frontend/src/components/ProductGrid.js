import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import './ProductGrid.css';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   
    const fetchProducts = async (search = '') => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('https://fakestoreapi.com/products');
            
           
            const filteredProducts = response.data.filter(product => 
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
            
            setProducts(filteredProducts);
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

   
    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            fetchProducts(searchTerm);
        }, 500),
        []
    );

   
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

  
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="product-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="product-image"
                        />
                        <h3>{product.title}</h3>
                        <p>{product.description.substring(0, 100)}...</p>
                        <div className="product-details">
                            <span className="price">${product.price.toFixed(2)}</span>
                            <span className="category">{product.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid; 
