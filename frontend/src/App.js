import React, { useState } from 'react';
import ItemTable from './components/ItemTable';
import ItemForm from './components/ItemForm';
import './css/App.css';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleItemAdded = () => setRefresh(!refresh);

    return (
        <div className="app-container">
            <div className="main-container">
                <h1 className="header">📦 Inventory Management System</h1>
                <ItemForm onItemAdded={handleItemAdded} />
                <ItemTable refresh={refresh} />
            </div>
        </div>
    );
}

export default App;