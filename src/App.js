import React from 'react';
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";

import { useStateValue } from './StateProvider';

function App() {
	const [{ playerStats, playerName, status }, dispatch] = useStateValue();
  return (
    <div className="bg-gray-800">
		<Header />
		{
			!playerStats ? (
				<main className="h-100 max-w-7xl mx-auto px-8 sm:px-16">
					<h1 className="text-white text-center text-4xl mt-20">{status}</h1>
				</main>
			) :(
				<main className="h-100 max-w-7xl mx-auto px-8 sm:px-16">
					<h1 className="text-white text-center text-3xl mt-5">{playerName} - </h1>
					<section className="flex-grow p-8">
						<div className="flex flex-col justify-between">
							{Object.entries(playerStats?.data.attributes.gameModeStats).map(([gameMode, data]) => (
								<StatsCard 
									key={gameMode}
									title={gameMode}
									data={data}
								/>
							))}
						</div>
					</section>
				</main>
			)
			
		}
		
    </div>
  );
}

export default App;
