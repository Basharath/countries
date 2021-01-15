import React from 'react';

import Loader from './Loader';

export default function Sidebar({
  handleChange,
  searchText,
  countries,
  handleClick,
  allCountries,
  handleClearText,
}) {
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search any country..."
          onChange={handleChange}
          value={searchText}
        />
        <span
          className={'clear-btn' + (searchText ? ' show' : '')}
          onClick={handleClearText}
        >
          <i className="fas fa-times"></i>
        </span>
      </div>
      <div className={'content'}>
        {!allCountries ? (
          <Loader />
        ) : countries.length === 0 ? (
          <div className="empty-search">No such country is found...</div>
        ) : (
          countries.map((c, idx) => (
            <div className="country-row" key={idx}>
              <div className="flag">
                <img
                  src={c.flag}
                  alt={c.name}
                  onClick={() => handleClick(c)}
                  title={c.name}
                />
              </div>
              <div className="details">
                <div
                  className="title"
                  title={c.name}
                  onClick={() => handleClick(c)}
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
    </>
  );
}
