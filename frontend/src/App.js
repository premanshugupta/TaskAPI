import React from 'react';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management System</h1>
      </header>
      <main>
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;
