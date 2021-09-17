import React from "react";

import { useState } from "react";
import { 
    SearchIcon,
} from "@heroicons/react/solid";
import env from "react-dotenv";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer"

function Header({placeholder}) {
    const [state, dispatch] = useStateValue();
    const [searchInput, setSearchInput] = useState("");

    const searchPlayer = async () => {
        dispatch({
            type: actionTypes.REMOVE_STATS,
        });
        dispatch({
            type: actionTypes.REMOVE_NAME,
        });

        const options = {
			headers: {
				Authorization: env.REACT_APP_PUBG,
				Accept: "application/vnd.api+json"
			}
		}

        await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${searchInput}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.errors) {
                console.log(data.errors[0]?.detail)
                dispatch({
                    type: actionTypes.SET_STATUS,
                    status: data.errors[0]?.detail
                })
            } else {
                const playerId = data.data[0]?.id;

                fetch(`https://api.pubg.com/shards/steam/players/${playerId}/seasons/lifetime?filter[gamepad]=false`, options)
                .then(response2 => response2.json())
                .then(data2 => {
                    dispatch({
                        type: actionTypes.SET_NAME,
                        playerName: searchInput
                    })
                    dispatch({
                        type: actionTypes.SET_STATS,
                        playerStats: data2
                    })
                    console.log("STATS", data2)
                })
            }
            
        });
    };

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-green-800 shadow-md p-5 md:px-10">
            <div className="relative flex items-center h-10 my-auto">
                {/* SET STATE FOR SELECTING SHARD - XBOX/STEAM/PS */}
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm bg-white">
                <input 
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={placeholder || "search for player"}
                    className="flex-grow p-4 bg-transparent rounded-lg outline-none text-gray-800 placeholder-gray-800" 
                />
                <SearchIcon onClick={searchPlayer} className="hidden md:inline-flex h-12 bg-white text-green-800 rounded-full p-2 cursor-pointer md:mx-2" />
            </div>
        </header>
    );
}

export default Header

