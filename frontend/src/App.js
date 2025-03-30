import React, { useState } from 'react';
import ItemTable from './components/ItemTable';
import ItemForm from './components/ItemForm';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleItemAdded = () => setRefresh(!refresh);

    return (
        <div style={styles.appContainer}>
            <div style={styles.mainContainer}>
                <h1 style={styles.header}>📦 Inventory Management System</h1>
                <ItemForm onItemAdded={handleItemAdded} />
                <ItemTable refresh={refresh} />
            </div>
        </div>
    );
}

const styles = {
    appContainer: {
        minHeight: '100vh',
        backgroundColor: '#f1f3f5',
        padding: '2rem',
    },
    mainContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        color: '#2d3436',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #ced4da',
        fontSize: '2rem',
        fontWeight: '700',
    },
};

export default App;