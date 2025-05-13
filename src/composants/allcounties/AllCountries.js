import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../api-util/fetchAPI';
import { Link } from 'react-router';
import Searchinput from '../searchinput/SearchInput';
import FilterCountry from '../filtercountry/FilterCountry';

function AllCountries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState('')

    useEffect(() => {
        const addCountriesAll = async () => {
            try {
                const res = await fetch(`${fetchAPI}/all`);
                if (!res) {
                    throw new Error("URL is deleted")
                }
                const data = await res.json();
                const alphafilter = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(alphafilter);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setErreur(error.message)
            }
        }

        addCountriesAll()
        // getCountryByName()
    }, [])

    const getCountryByName = async (countryName) => {
        if (!countryName) {
            return
        }

        try {
            const res = await fetch(`${fetchAPI}/name/${countryName}`);
            if (!res) {
                throw new Error('No data for this search')
            }
            const data = await res.json();

            setCountries(data);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setErreur(error.message)
        }
    }

    const getCountryByregion = async (continent) => {
        try {
            const res = await fetch(`${fetchAPI}/region/${continent}`);
            if (!res) {
                throw new Error('Not found');
            }

            const data = await res.json();
            const alphafilter = data.sort((a, b) => 
                a.name.common.localeCompare(b.name.common)
            )

            setCountries(alphafilter);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setErreur(error.message);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col position-fixed filtRec'>
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Rechercher ou filter
                    </button>

                    <div className="collapse " id="collapseExample">
                        <div className="row d-flex flex-column flex-md-row justify-content-start">
                            <div className="search col-12 col-md-8">
                                <Searchinput onSearch={getCountryByName} />
                            </div>
                            <div className=" col-7 col-md-4 col-lg-3">
                                <FilterCountry onselect={getCountryByregion} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col country_flexible py-5 mt-5">
                {/* <div > */}
                {loading && !erreur && <div className="spinner-border text-primary p-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {!loading && erreur && <h1 className='text-danger fw-bold'>{erreur}</h1>}
                {/* </div> */}

                {
                    Array.isArray(countries) && countries.map((donnees, k) => {
                        return (
                            <Link to={`/country/${donnees.name.common}`} key={k} className='text-decoration-none taille_link_country'>
                                <div className="card taille_card_country mb-4 mb-lg-3">
                                    <img src={donnees.flags.png} className="country_img" alt="Drapeau" />
                                    <div className="card-body">
                                        <h3 className='card-title'>{donnees.name.common}</h3>
                                        <h6 className='card-text'>Region : {donnees.region}</h6>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCountries
