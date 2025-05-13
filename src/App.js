import React from 'react'
import Header from './composants/header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import AllCountries from './composants/allcounties/AllCountries'
import './App.css';
import CountryInfo from './composants/countryinfo/CountryInfo';

function App() {
    return (
        <div>
            <Header />
            {/* <BrowserRouter> */}
            <Router>
                <Routes>
                    <Route path='/' element={<AllCountries />} />
                    <Route path='/country/:countryName' element={<CountryInfo />} />
                </Routes>
            </Router>
            {/* </BrowserRouter> */}
        </div>
    )
}

export default App
