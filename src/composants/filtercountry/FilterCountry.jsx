import React from 'react'

function FilterCountry({onselect}) {
    const handleSelect = (e) => {
        const regionName = e.target.value;
        onselect(regionName)
    }

    return (
        <select onChange={handleSelect} className='form-select'>
            <option>all</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    )
}

export default FilterCountry
