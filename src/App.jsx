import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router';
// import Header from './components/Header';
// import HomePage from './pages/home';
// import AboutPage from './pages/about';
// import NotFoundPage from './pages/not-found';
// import CoinDetailsPage from './pages/coin-details';
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (<div>
    <h1>Crypto Dash</h1>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <div className="grid">
      {coins.map((coin) => (
        <div key={coin.id} className="coin-card">
          <div className="coin-header">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <div>
              <h2>{coin.name}</h2>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <p>Price: ${coin.current_price.toLocaleString()}</p>
          <p className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
            24h: {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  </div>);
}

export default App;