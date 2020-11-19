import React from 'react';

import Country from './Country';

const ListCountry = ({country}) => {
    return (
        <li>{country.name}</li>
    )
};

const Countries = ({countries}) => {
    if (countries.length > 1)
    {
        return (
            <ul>
                {countries.map( (country) => <ListCountry key={country.name} country={country} />)}
            </ul>
        );
    } else {
        return (
            <Country country={countries[0]} />
        );
    }
}

export default Countries