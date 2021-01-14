import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Country from './Country';
import config from '../config.json';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [allCountries, setAllcountries] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: all } = await axios.get(config.api + '/all');

      setAllcountries(all);

      const randomCountry = all[Math.floor(Math.random() * 250)];
      setCountry(randomCountry);
    };
    init();
  }, []);

  const handleChange = async ({ currentTarget }) => {
    setSearchText(currentTarget.value);
  };

  const getCountries = () => {
    const all = [...allCountries];
    if (!searchText.length) {
      return all;
    }
    const searched = all.filter((i) =>
      i.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

    if (!searched.length) {
      const alternate = all.filter((i) =>
        i.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return alternate;
    }

    return searched;
  };

  const countries = getCountries();

  return (
    <div className="dashboard">
      <div
        className="sidebar"
        style={searchText ? { overflowY: 'scroll' } : {}}
      >
        <div className="search-box">
          <input
            type="text"
            placeholder="Search any country..."
            onChange={handleChange}
            value={searchText}
          />
          <span
            className={'clear-btn' + (searchText ? ' show' : '')}
            onClick={() => setSearchText('')}
          >
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className={'content' + (searchText ? ' show' : '')}>
          {!allCountries ? (
            <div className="loader">
              <div className="loadingio-spinner-double-ring-mvtk8gmmk4">
                <div className="ldio-l37ix2s2sxs">
                  <div></div>
                  <div></div>
                  <div>
                    <div></div>
                  </div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          ) : countries.length === 0 ? (
            <div className="empty-search">No such country is found...</div>
          ) : (
            countries.map((c, idx) => (
              <div className="country-row" key={idx}>
                <div className="flag">
                  <img
                    src={c.flag}
                    alt={c.name}
                    onClick={() => setCountry(c)}
                    title={c.name}
                  />
                </div>
                <div className="details">
                  <div
                    className="title"
                    title={c.name}
                    onClick={() => setCountry(c)}
                  >
                    {c.name}
                  </div>
                  <div className="capital" title={c.capital}>
                    {c.capital}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="main">
        {country && (
          <Country singleCountry={country} allCountries={allCountries} />
        )}
      </div>
    </div>
  );
}
