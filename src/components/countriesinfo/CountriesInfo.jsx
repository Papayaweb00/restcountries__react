import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ApiURL } from '../util/Api';

function CountriesInfo() {
  const [countryInfo, setCountryInfo] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { countryName } = useParams()

  const infoCountry = async () => {
    try {
      const res = await fetch(`${ApiURL}/name/${countryName}`)

      if (!res.ok) throw new Error('Could not found!');

      const data = await res.json();

      // console.log(data);

      setCountryInfo(data)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    infoCountry()
  }, [countryName])

  return (
    <div className='pt-5 mt-5'>
      <a href="/" className='btn btn-light mx-4 mb-5 position-fixed'>Back</a>
      <div className='text-center'>
        {loading && !error && <h3 className='text-light'>Loading...</h3>}
        {!loading && error && <h3 className='text-light'>{error}</h3>}
      </div>
      {
        countryInfo.map((country, k) => {
          const nativeName = country.name.nativeName;
          const cur = country.currencies;
          const firstNative = nativeName ? Object.values(nativeName)[0]?.symbol : "Nom officiel indisponible";
          const firsycur = cur ? Object.values(cur)[0]?.name + " (" + Object.values(cur)[0]?.symbol + ")" : "Nom de la monnaie indisponible";

          return <div className="container country__info__container flex-column gap-5" key={k}>
            {/* <div className='d-flex justify-content-start gap-5 align-items-center'>
           <a href="/" className='btn btn-light mx-4 mb-5'>Back</a> */}
            <h1 className='text-light text-center'>{firstNative}</h1>
            {/* </div> */}
            <div className="row d-flex mx-auto my-0 my-md-5 align-items-center" >
              <div className="country__info-img col-12 col-md-6">
                <img src={country.flags.png} alt="flag" className='w-100 ' />
              </div>
              <div className="country__info col-12 col-md-6 mt-5 mt-md-0">
                <div className='country__info-left'>
                  <h3>Native Name: <span> {country.name.common}</span></h3>
                  <h3>Monnaie : <span> {firsycur}</span></h3>
                  <h3>Population: <span> {country.population}</span></h3>
                  <h3>Region: <span> {country.region}</span></h3>
                  <h3>Sub-region: <span> {country.subregion}</span></h3>
                  <h3>Capital: <span> {country.capital}</span></h3>
                </div>

              </div>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default CountriesInfo
