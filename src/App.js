import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Coin from './Coin';
import LoadingSpinner from './LoadingSpinner';

import './App.css';

const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error => {

      console.log(error);

    })

  }, []);

  const handleChange = (e) => {

    setSearch(e.target.value)

  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  if (coins.length <= 0) return <LoadingSpinner />

  return (

    <div className="coin-app">
      
      <div className="coin-search">

        <h1 className="coin-text">Search a currency</h1>

        <form>

          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>

        </form>

      </div>

      {
        filteredCoins.map(coin => {

          return (

            <Coin
              name={coin.name}
              symbol={coin.symbol}
              image={coin.image}
              key={coin.id}
              volume={coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />

          )

        })
      }

    </div>

  )

}

export default App;