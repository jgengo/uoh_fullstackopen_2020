import React from 'react';

import Country from './Country';



const Countries = ({countries, setSearch}) => {
    const handleShow = (e) => {
        setSearch(e.target.value)
    }

    if (countries.length > 1)
    {
        return (
            <ul>
                {countries.map( (country) => <li>{country.name} <button onClick={handleShow} value={country.name}>show</button></li> )}
            </ul>
        );
    } else {
        return (
            <Country country={countries[0]} />
        );
    }
}

export default Countries