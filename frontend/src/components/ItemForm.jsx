import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Add New Item
                </button>
            </div>
        </form>
    );
}

const styles = {
    form: {
        margin: '2rem 0',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    inputGroup: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: '0.8rem',
        border: '1px solid #ced4da',
        borderRadius: '6px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
        ':focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)',
        },
    },
    button: {
        padding: '0.8rem 1.5rem',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#218838',
        },
    },
};

export default ItemForm;