import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Country from './Country';
import config from '../config.json';
import Loader from './Loader';
import Sidebar from './Sidebar';

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

  const handleClearText = () => {
    setSearchText('');
  };

  const handleClick = (c) => {
    setCountry(c);
    if (window.innerWidth < 500) setSearchText('');
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
    <div className={'dashboard' + (searchText ? ' show' : '')}>
      <div className={'sidebar'}>
        <Sidebar
          handleChange={handleChange}
          countries={countries}
          searchText={searchText}
          allCountries={allCountries}
          handleClick={handleClick}
          handleClearText={handleClearText}
        />
      </div>
      <div className="main">
        {!country ? (
          <Loader />
        ) : (
          <Country singleCountry={country} allCountries={allCountries} />
        )}
      </div>
    </div>
  );
}
