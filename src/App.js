import  {useState, useEffect } from "react";
import env from "react-dotenv";

import Header from "./components/Header";

function App() {
	const [playerStats, setPlayerStats] = useState([])

	useEffect(() => {
		const options = {
			headers: {
				Authorization: env.REACT_APP_PUBG,
				Accept: "application/vnd.api+json"
			}
		}

		const fetchData = async () => {
            await fetch('https://api.pubg.com/shards/steam/players?filter[playerNames]=panflutejam', options)
            .then(response => response.json())
            .then(data => {
				console.log("DATA: ", data)
                setPlayerStats(data.data)
            });
        }
        fetchData();
		
	}, [])
	console.log('stats', playerStats)

  return (
    <div className="App bg-gray-400 h-screen w-screen">
		<Header />
		
      	{playerStats.map(player => (
			  <div>
				  <h1>{player.attributes.shardId}</h1>
			  	<h1>{player.attributes.name}</h1>
			  	<h1>{player.id}</h1>
			  </div>
		  ))
		}
    </div>
  );
}

export default App;
