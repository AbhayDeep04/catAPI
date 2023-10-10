import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
const App = () => {
  const [catData, setCatData] = useState({});
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomCat = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      const cat = response.data[0];
      setCatData(cat);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cat:', error);
    }
  };

  const addAttributeToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  const renderAttributes = () => {
    return Object.keys(catData).map((key) => {
      if (!banList.includes(key)) {
        return (
          <button key={key} onClick={() => addAttributeToBanList(key)} className="button">
            {catData[key]}
          </button>
        );
      }
      return null;
    });
  };

  const renderBannedAttributes = () => {
    return banList.map((attribute) => (
      <button key={attribute} className="button banned">
        {attribute}
      </button>
    ));
  };

  return (
    <div className="container">
      <h1>Random Cat Viewer</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <img src={catData.url} alt="Random Cat" className="cat-image" />
          <p>Attributes:</p>
          <div className="attributes">{renderAttributes()}</div>
          <button onClick={fetchRandomCat} className="button">
            Discover
          </button>
        </div>
      )}

      <div>
        <h2>Banned Attributes</h2>
        <div className="banned-attributes">{renderBannedAttributes()}</div>
      </div>
    </div>
  );
};

export default App;