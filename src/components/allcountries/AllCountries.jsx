import React, { useEffect, useState } from 'react'
import { ApiURL } from '../util/Api';
import Searchinput from '../search/Searchinput';
import FilterCountry from '../filtercountry/FilterCountry';
import { Link } from 'react-router-dom';

function AllCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const getAllCountries = async () => {
    try {
      const res = await fetch(`${ApiURL}/all`);

      if (!res.ok) throw new Error('The data are deleted');

      const data = await res.json();
      const alphafilter = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountries(alphafilter)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const getCountryByName = async (countryName) => {
    if (!countryName) return;

    try {
      const res = await fetch(`${ApiURL}/name/${countryName}`)

      if (!res.ok) throw new Error('Not found any country');

      const data = await res.json();
      const alphafilter = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(alphafilter);
      // setLoading(false)

    } catch (error) {
      // setLoading(false);
      setError(error.message);
    }
  }

  const getCountryByregion = async (countryRegion) => {
    try {
      const res = await fetch(`${ApiURL}/region/${countryRegion}`)

      if (!res.ok) throw new Error('No data for this region')

      const data = await res.json();
      const alphafilter = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(alphafilter);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }

  useEffect(() => {
    // getAllCountries();
    // getCountryByName()
    getAllCountries()
  }, [])


  return (
    <div className='container all__country__wrapper '>
      <div className=' position-fixed all__country__wrapper_top w-100 '>
        <button className="btn btn-light w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Rechercher ou filter
        </button>

        <div className="collapse " id="collapseExample">
          <div className="country__top row d-flex flex-column flex-md-row justify-content-between">
            <div className="search col-9">
              <Searchinput onSearch={getCountryByName} />
            </div>
            <div className="filter col-9 col-md-4 col-lg-3">
              <FilterCountry onselect={getCountryByregion} />
            </div>
          </div>
        </div>
      </div>


      <div className="country__bottom pt-5">
        {loading && !error && <h3 className='text-light'>Loading...</h3>}
        {!loading && error && <h3 className='text-light'>{error}</h3>}

        {
          countries.map((country, k) => (
            <Link to={`/country/${country.name?.common}`} key={k} >
              <div className="card country__card mt-5">
                <div className="country__img">
                  <img src={country.flags.png} alt="flag" className='card-img-top' />
                </div>
                <div className="card-body country__data">
                  <h3 className='card-title'>{country.name.common}</h3>
                  {/* <h6 className='card-text'>Population : {country.population}</h6> */}
                  <h6 className='card-text'>Region : {country.region}</h6>
                  {/* <h6 className='card-text'>Capital : {country.capital}</h6> */}
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default AllCountries
