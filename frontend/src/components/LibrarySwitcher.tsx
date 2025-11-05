// src/components/LibrarySwitcher.tsx
import React from 'react';
import { useLibrary } from '../context/LibraryContext';

const LibrarySwitcher: React.FC = () => {
    const { library, setLibrary } = useLibrary();

    const handleToggle = () => {
        setLibrary(library === 'material' ? 'tailwind' : 'material');
    };

    return (
        <button onClick={handleToggle} style={{ margin: '10px', padding: '5px 10px', borderRadius: '5px', border: '2px solid #4a4a4aff' }}>
            Switch to {library === 'material' ? 'Tailwind' : 'Material UI'}
        </button>

    );
};

export default LibrarySwitcher;
