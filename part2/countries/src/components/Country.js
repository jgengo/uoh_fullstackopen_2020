import React from 'react';

import Weather from './Weather';

const Country = ({country}) => {
    return (
        <div>
            
            <h1>{country.name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td><img src={country.flag} alt={country.name} width="150" /></td>
                        <td>
                            <p>Capital: {country.capital}</p>
                            <p>Population: {country.population}</p>
                            <p><strong>Languages</strong></p>
                            <ul>{country.languages.map( (lang) => <li>{lang.name}</li>) }</ul>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Weather</h2>
            <Weather country={country} />
        </div>
    )
}

export default Country;