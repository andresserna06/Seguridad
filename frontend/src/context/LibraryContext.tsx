// src/context/LibraryContext.tsx
import React, { createContext, useContext, useState } from "react";

type LibraryType = "material" | "tailwind";

const LibraryContext = createContext({
    library: "material" as LibraryType,
    setLibrary: (lib: LibraryType) => { }
});

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [library, setLibrary] = useState<LibraryType>("material");
    return (
        <LibraryContext.Provider value={{ library, setLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
};
export default LibraryContext;