import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import AllCountries from './components/allcountries/AllCountries';
import CountriesInfo from './components/countriesinfo/CountriesInfo';

function App() {
  return (
    <div className=''>
      <Header/>
      <Routes>
        <Route path='/' element={<AllCountries/>} />
        <Route path='/country/:countryName' element={<CountriesInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
