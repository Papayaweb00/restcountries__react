import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../api-util/fetchAPI';
import { Link, useParams } from 'react-router';

function CountryInfo() {
    const [infoCountry, setInfoCountry] = useState([]);
    const [infoLoading, setInfoLoading] = useState(true);
    const [infoErreur, setInfoErreur] = useState('');

    const { countryName } = useParams();

    useEffect(() => {
        const getInfoContry = async () => {
            try {
                const res = await fetch(`${fetchAPI}/name/${countryName}`);
                if (!res) {
                    throw new Error('Could not found')
                }

                const data = await res.json();
                console.log(data);

                setInfoCountry(data)
                setInfoLoading(false)
            } catch (error) {
                setInfoLoading(false);
                setInfoErreur(error.message)
            }
        }

        getInfoContry()
    }, [countryName])

    return (
        <div className='mt-5'>
            {infoLoading && !infoErreur && <div className="spinner-border text-primary p-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {!infoLoading && infoErreur && <h1 className='text-danger fw-bold'>{infoErreur}</h1>}

            {
                infoCountry.map((country, k) => {
                    const nativeName = country.name.nativeName;
                    const cur = country.currencies;
                    const firstNative = nativeName
                        ? Object.values(nativeName)[0]?.official
                        : "Nom officiel indisponible";
                    const currency = cur ? Object.values(cur)[0]?.name + " (" + Object.values(cur)[0]?.symbol + ")" : "Nom de la monnaie indisponible";

                    return (
                        <div className="container pt-3" key={k}>
                            <div className="d-flex align-items-center mt-3  flex-column gap-3">
                                <Link to={"/"} className='btn btn-primary position-fixed filtRec w-75' >Back</Link>
                                <h1 className='fw-bold text-center pt-5'>{country.name.official}</h1>
                            </div>
                            <div className='row d-flex mx-auto my-0 my-md-5 align-items-center'>
                                <div className="col-12 col-md-6 mt-3 mt-md-0">
                                    <img src={country.flags.png} alt="Drapeau" className='w-100' />
                                </div>

                                <div className=" col-12 col-md-6 mt-5 mt-md-0">
                                    <h3>Native Name: <span> {country.name.common}</span></h3>
                                    <h3>Monnaie : <span> {currency}</span></h3>
                                    <h3>Population: <span> {country.population}</span></h3>
                                    <h3>Region: <span> {country.region}</span></h3>
                                    <h3>Sub-region: <span> {country.subregion}</span></h3>
                                    <h3>Capital: <span> {country.capital}</span></h3>
                                </div>

                                <div className="col-12 mt-0 mt-md-5">
                                    <h1 className='fw-bold text-center mb-0 mt-4 my-md-3 mb-md-5'>{firstNative}</h1>
                                    <iframe
                                        src={country.maps.googleMaps}
                                        width="100%"
                                        height="450"
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Carte OpenStreetMap"
                                    ></iframe>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>)
}

export default CountryInfo
