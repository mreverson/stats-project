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
    const [shard, setShard] = useState("pc");
    const [region, setRegion] = useState("na");

    const searchPlayer = async () => {
        dispatch({
            type: actionTypes.REMOVE_STATS,
        });
        dispatch({
            type: actionTypes.REMOVE_NAME,
        });
        dispatch({
            type: actionTypes.SET_STATUS,
            status: "Searching..."
        });

        const options = {
			headers: {
				Authorization: env.REACT_APP_PUBG,
				Accept: "application/vnd.api+json"
			}
		}

        await fetch(`https://api.pubg.com/shards/${shard}-${region}/players?filter[playerNames]=${searchInput}`, options)
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

                fetch(`https://api.pubg.com/shards/${shard}-${region}/players/${playerId}/seasons/lifetime?filter[gamepad]=false`, options)
                .then(response2 => response2.json())
                .then(data2 => {
                    if(data2.errors) {
                        console.log(data2.errors[0]?.detail)
                        dispatch({
                            type: actionTypes.SET_STATUS,
                            status: data2.errors[0]?.detail
                        })
                    }else{
                        dispatch({
                            type: actionTypes.SET_NAME,
                            playerName: searchInput
                        })
                        dispatch({
                            type: actionTypes.SET_STATS,
                            playerStats: data2
                        })
                        console.log("STATS", data2)
                    }
                })
            } 
        });
    };

    const getRegionList = (shard) => {
        if(shard === "pc") {
            return (
                <>
                <option value="na" selected>N. America</option>
                <option value="as">Asia</option>
                <option value="eu">Europe</option>
                <option value="jp">Japan</option>
                <option value="kakao">Kakao</option>
                <option value="krjp">Korea</option>
                <option value="oc">Oceania</option>
                <option value="ru">Russia</option>
                <option value="sa">S. America</option>
                <option value="sea">SE. Asia</option>
                </>
            )
        }else if(shard === "psn"){
            return (
                <>
                <option value="na" selected>N. America</option>
                <option value="as">Asia</option>
                <option value="eu">Europe</option>
                <option value="oc">Oceania</option>
                </>
            )
        }else{
            return (
                <>
                <option value="na" selected>N. America</option>
                <option value="as">Asia</option>
                <option value="eu">Europe</option>
                <option value="oc">Oceania</option>
                <option value="sa">S. America</option>
                </>
            )
        }
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-gray-500 shadow-md p-5 md:px-10">
            <div className="relative flex items-center h-10 my-auto">
                <div className="flex mr-10 items-center md:border-2 rounded-lg py-2 md:shadow-sm bg-white">
                    <select
                        className="flex-grow p-4 w-100 bg-transparent rounded-lg outline-none text-gray-800 placeholder-gray-800"
                        onChange={(e) => setShard(e.target.value)}
                    >
                        <option value="pc" selected>PC</option>
                        <option value="psn">PSN</option>
                        <option value="xbox">XBOX</option>
                    </select>

                    

                    
                </div>
                <div className="flex items-center md:border-2 rounded-lg py-2 md:shadow-sm bg-white">

                    <select
                        className="flex-grow p-4 w-100 bg-transparent rounded-lg outline-none text-gray-800 placeholder-gray-800"
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        {getRegionList(shard)}
                        
                    </select>
                </div>
            </div>
            <div onKeyPress={(e) => e.code === "Enter" && searchPlayer} className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm bg-white">
                <input 
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    // onKeyPress={(e) => e.code === "Enter" && searchPlayer}
                    placeholder={placeholder || "search for player"}
                    className="flex-grow p-4 bg-transparent rounded-lg outline-none text-gray-800 placeholder-gray-800" 
                />
                <SearchIcon onClick={searchPlayer} className="hidden md:inline-flex h-12 bg-white text-blue-400 rounded-full p-2 cursor-pointer md:mx-2" />
            </div>
        </header>
    );
}

export default Header

