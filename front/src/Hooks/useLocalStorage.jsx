import React from 'react';

function useLocalStorage(itemName, initialValue) {
    const [item, setItem] = React.useState(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            return localStorageItem ? JSON.parse(localStorageItem) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage", error);
            return initialValue;
        }
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            if (localStorageItem) {
                setItem(JSON.parse(localStorageItem));
            }
        } catch (error) {
            setError(true);
        }
    }, []);

    const updateStorageItem = (newItem) => {
        try {
            localStorage.setItem(itemName, JSON.stringify(newItem));
            setItem(newItem);
        } catch (error) {
            setError(true);
        }
    };

    return {
        item,
        updateStorageItem,
        loading,
        error,
    };
}

export { useLocalStorage };
