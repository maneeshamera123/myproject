import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ItemTable.css'; 

function ItemTable({ refresh }) {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState({ id: null, name: '', category: '' });

    useEffect(() => {
        fetchItems();
    }, [search, refresh]);

    const fetchItems = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/?search=${search}`);
        setItems(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`);
        fetchItems();
    };

    const handleUpdate = (id, currentName, currentCategory) => {
        setEditItem({ id, name: currentName, category: currentCategory });
        console.log("hiii");
        setShowModal(true);
    };

    const handleSubmitUpdate = async () => {
        if (editItem.name && editItem.category) {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/items/${editItem.id}`, {
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
        <div className="container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search items by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            {Object.keys(groupedItems).map((category) => (
                <div key={category} className="category-section">
                    <h2 className="category-header">{category}</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th className="th">ID</th>
                                    <th className="th">Item Name</th>
                                    <th className="th">Category</th>
                                    <th className="th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedItems[category].map((item) => (
                                    <tr key={item.id} className="tr">
                                        <td className="td">{item.id}</td>
                                        <td className="td">{item.name}</td>
                                        <td className="td">
                                            <span className="category-badge">{item.category}</span>
                                        </td>
                                        <td className="td">
                                            <button onClick={() => handleUpdate(item.id, item.name, item.category)} className="update-button">
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="delete-button">
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
                <div className="modal-overlay">
                    <div className="modal1">
                        <h3>Edit Item</h3>
                        <input
                            type="text"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            className="input"
                        />
                        <input
                            type="text"
                            value={editItem.category}
                            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                            className="input"
                        />
                        <button onClick={handleSubmitUpdate} className="submit-button">Submit</button>
                        <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemTable;
