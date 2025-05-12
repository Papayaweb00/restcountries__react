import React, { useEffect, useState } from 'react'

function Searchinput({ onSearch }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (input.trim !== '') {
                onSearch(input)
            }
        }, 50);

        return () => clearTimeout(delayDebounce);
    })

    return (
        <form onSubmit={handleSubmit}>
            <input type="search" className='form-control' placeholder='Search a country.........'
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                }} />
        </form>
    )
}

export default Searchinput
