import React from "react";
import { useState } from "react";
import { 
    SearchIcon,
    
} from "@heroicons/react/solid";

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState("");
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-green-800 shadow-md p-5 md:px-10">
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm bg-white">
                <input 
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={placeholder || "search for player"}
                    className="flex-grow p-4 bg-transparent rounded-lg outline-none text-gray-800 placeholder-gray-800" 
                />
                <SearchIcon className="hidden md:inline-flex h-12 bg-white text-green-800 rounded-full p-2 cursor-pointer md:mx-2" />
            </div>
        </header>
    );
}

export default Header

