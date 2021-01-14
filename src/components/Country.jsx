import React, { useEffect, useState } from 'react';

export default function Country({ singleCountry = '', allCountries }) {
  const [country, setCountry] = useState(singleCountry);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCountry(singleCountry);
  }, [singleCountry]);

  const handleCountryClick = async (code) => {
    const country = allCountries.filter((c) => c.alpha3Code === code)[0];

    setCountry(country);
  };

  return (
    <div className="country">
      {!country ? (
        "Wait it's loading"
      ) : (
        <>
          <div className="title">{country.name}</div>
          <div className="info">
            <div className="flag">
              <img src={country.flag} alt={country.name} />
            </div>
            <div className="text-info">
              <div className="capital">
                <span className="label">Capital city:</span> {country.capital}
              </div>
              <div className="currency">
                <span className="label">Currency:</span>{' '}
                {country.currencies[0].name} ({country.currencies[0].symbol})
              </div>
              <div className="languages">
                <span className="label">Official languages:</span>{' '}
                {country.languages.map((i) => ' ' + i.name).toString()}
              </div>
              <div className="callingCode">
                <span className="label">Calling code:</span> +
                {country.callingCodes}
              </div>
              <div className="region">
                <span className="label">Region:</span> {country.region}
              </div>
              <div className="region">
                <span className="label">Sub region:</span> {country.subregion}
              </div>
              <div className="population">
                <span className="label">Population:</span>{' '}
                {country.population.toLocaleString()}
              </div>

              <div className={'more-info' + (show ? ' show' : '')}>
                <div className="demonym">
                  <span className="label">Demonym:</span> {country.demonym}
                </div>
                <div className="timezone">
                  <span className="label">Time zones:</span>{' '}
                  {country.timezones.map((t) => ' ' + t).toString()}
                </div>
                <div className="borders">
                  <span className="label">Border countries:</span>{' '}
                  {country.borders.map((b, idx) => (
                    <span
                      className="border"
                      key={idx}
                      onClick={() => handleCountryClick(b)}
                    >
                      {' '}
                      &nbsp;
                      {b.toString()}
                    </span>
                  ))}
                </div>
                <div className="domain">
                  <span className="label">Top level domain:</span>{' '}
                  {country.topLevelDomain[0]}
                </div>
                <div className="latlang">
                  <span className="label">Latitute &amp; Langitude:</span>{' '}
                  {country.latlng.map((l) => ' ' + l).toString()}
                </div>
                <div className="area">
                  <span className="label">Area:</span>{' '}
                  {country.area.toLocaleString()}sq.km
                </div>
              </div>

              <div className="btn" onClick={() => setShow(!show)}>
                {!show ? 'See more info' : 'Hide info'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
