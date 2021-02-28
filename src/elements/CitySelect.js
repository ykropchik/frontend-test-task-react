import React from 'react';

export default function CitySelect(props) {
    if (props.cities !== null) {
        return(
            <select
                defaultValue={props.defaultCity}
                onChange={props.onChange}>
                {
                   props.cities.map((city, index) => {
                        return (
                        <option
                            key={city.id}
                            value={index}>
                                {city.name}
                        </option>
                        );
                    })
                }
            </select>
        )
    } else {
        return(<select/>);
        
    }   
}