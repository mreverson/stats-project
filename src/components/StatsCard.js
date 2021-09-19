import React from 'react';
import _ from "lodash";

function StatsCard({title, data}) {

    const keyMapper = (key) => {
        if(key === "dBNOs") {
            return "dBNOs";
        } else if(key === "top10s"){
            return "Top 10s";
        }else{
            return _.startCase(key);
        } 
    };

    return (
        <div className="bg-gray-900 flex mt-3 border border-gray-900 rounded-lg cursor-pointer hover:opacity-90 hover:shadow-xl transition duration-200 ease-out first:border-t">
            <div className="flex flex-col flex-grow">
                <h4 className="text-2xl font-bold uppercase border border-blue-400 rounded-t-lg bg-blue-400 text-white py-4 px-4">{title}</h4>
                <div className="grid grid-cols-4 max-w-screen">
                    {Object.entries(data).map(([key,val]) => (
                        <p key={key}
                            className="m-3 flex flex-col text-blue-400 text-lg"
                        >
                            <b className="text-xl">{keyMapper(key)}:</b> {val}
                        </p>            
                    ))}
                
                </div>
            </div>
        </div>
    )
}

export default StatsCard

