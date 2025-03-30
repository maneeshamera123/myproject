import React, { useState } from 'react';
import axios from 'axios';
import '../css/ItemForm.css'; 

function ItemForm({ onItemAdded }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/items/', { name, category });
        setName('');
        setCategory('');
        onItemAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="input"
                />
                <button type="submit" className="button">
                    Add New Item
                </button>
            </div>
        </form>
    );
}

export default ItemForm;
