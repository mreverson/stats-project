import React from 'react'

function StatsCard({title, data}) {
    return (
        <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
            <div className="flex flex-col flex-grow pl-5">
                <h4 className="text-xl">{title}</h4>
                
                
            </div>
        </div>
    )
}

export default StatsCard

