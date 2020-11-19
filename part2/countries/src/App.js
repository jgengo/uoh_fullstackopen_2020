import React, { useState } from 'react';
import axios from 'axios';

import Countries from './components/Countries'
import Error from './components/Error'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ error, setError ] = useState('')


  const handleSearch = (e) => {
    setCountries([])
    setSearch(e.target.value)

    if (e.target.value.length > 0) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then( (res) => {
          if (res.data.length > 10) {
            setError('too many countries, be more specific please.')
            return
          }
          setError('')
          setCountries(res.data)
        })
        .catch( (err) => {
          if (err.response) {
            if (err.response.status === 404) setError("no country matching");
          }
        })

    }
  }

  return (
    <div>
      <div>
        <label>search a country: </label>
        <input value={search} onChange={handleSearch} /> 
      </div>
      <div>
        {error !== '' ? ( <Error error={error} /> ) : ('') }
        {countries.length > 0 && countries.length < 10 ? ( <Countries countries={countries} />) : ('')}
      </div>
    </div>
  );
}

export default App;
