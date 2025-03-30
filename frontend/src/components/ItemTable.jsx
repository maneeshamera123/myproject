import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemTable({ refresh }) {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState({ id: null, name: '', category: '' });

    useEffect(() => {
        fetchItems();
    }, [search, refresh]);

    const fetchItems = async () => {
        const response = await axios.get(`http://localhost:5000/api/items/?search=${search}`);
        setItems(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchItems();
    };

    const handleUpdate = (id, currentName, currentCategory) => {
        setEditItem({ id, name: currentName, category: currentCategory });
        setShowModal(true);
    };

    const handleSubmitUpdate = async () => {
        if (editItem.name && editItem.category) {
            await axios.put(`http://localhost:5000/api/items/${editItem.id}`, {
                name: editItem.name,
                category: editItem.category
            });
            setShowModal(false);
            fetchItems();
        }
    };

    const groupedItems = items.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="🔍 Search items by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {Object.keys(groupedItems).map((category) => (
                <div key={category} style={styles.categorySection}>
                    <h2 style={styles.categoryHeader}>{category}</h2>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Item Name</th>
                                    <th style={styles.th}>Category</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedItems[category].map((item) => (
                                    <tr key={item.id} style={styles.tr}>
                                        <td style={styles.td}>{item.id}</td>
                                        <td style={styles.td}>{item.name}</td>
                                        <td style={styles.td}>
                                            <span style={styles.categoryBadge}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => handleUpdate(item.id, item.name, item.category)}
                                                style={styles.updateButton}
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Edit Item</h3>
                        <input
                            type="text"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            placeholder="Item Name"
                            style={styles.input}
                        />
                        <input
                            type="text"
                            value={editItem.category}
                            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                            placeholder="Category"
                            style={styles.input}
                        />
                        <button onClick={handleSubmitUpdate} style={styles.submitButton}>Submit</button>
                        <button onClick={() => setShowModal(false)} style={styles.cancelButton}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        margin: '2rem 0',
    },
    searchContainer: {
        marginBottom: '2rem',
        width: '97%',
    },
    searchInput: {
        width: '100%',
        padding: '0.8rem 1.2rem',
        border: '1px solid #ced4da',
        borderRadius: '25px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ':focus': {
            outline: 'none',
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)',
        },
    },
    categorySection: {
        marginBottom: '2.5rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    categoryHeader: {
        margin: 0,
        padding: '1rem 1.5rem',
        backgroundColor: '#e9ecef',
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#495057',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    tableHeader: {
        backgroundColor: '#f8f9fa',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.9rem',
        tableLayout: 'fixed' 
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid #dee2e6',
        verticalAlign: 'middle',
        wordWrap: 'break-word', 
        whiteSpace: 'normal',   
        minWidth: '120px',      
        maxWidth: '250px',      
        overflow: 'hidden'
    },
    tr: {
        transition: 'background-color 0.2s ease',
        ':hover': {
            backgroundColor: '#f8f9fa',
        },
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        color: '#495057',
        borderBottom: '2px solid #dee2e6',
        wordWrap: 'break-word', 
        whiteSpace: 'normal'
    },
    categoryBadge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        backgroundColor: '#e9ecef',
        borderRadius: '15px',
        fontSize: '0.8rem',
        fontWeight: '500',
        color: '#495057',
    },
    deleteButton: {
        padding: '0.4rem 0.8rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#c82333',
        },
    },
    updateButton: {
        padding: '0.4rem 0.8rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        marginRight: '0.5rem',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#0056b3',
        },
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.25)',
        textAlign: 'center',
        width: '400px',
    },
    input: {
        display: 'block',
        width: '100%',
        marginBottom: '10px',
        padding: '4px',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
    }
};

export default ItemTable;