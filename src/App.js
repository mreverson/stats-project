import React from 'react';
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";

import { useStateValue } from './StateProvider';

function App() {
	const [{ playerStats, playerName, status }, dispatch] = useStateValue();
  return (
    <div className="App bg-white h-screen w-screen">
		<Header />
		{
			!playerStats ? (
				<h1 className="text-center text-3xl mt-5">{status}</h1>
			) :(
				<main className="max-w-7xl mx-auto px-8 sm:px-16">
					<h1 className="text-center text-3xl mt-5">{playerName}</h1>
					<section className="flex-grow pt-14 px-6">
						<div className="flex justify-between">
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
