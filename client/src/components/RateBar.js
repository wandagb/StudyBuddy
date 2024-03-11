import './styling/Navbar.css'
import { useState } from 'react'
import useFetch from '../useFetch'

export default function RateBar({ onSelect }) {
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const { data: sets } = useFetch(`/api/sets`)

    // Handle when user types
    const handleFilter = (event) => {
        const searchWord = event.target.value

        // Filter our data based on user input in our data 
        const newFilter = sets.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        setFilteredData(newFilter);
        setSearchValue(searchWord);

    }
    const handleSelectSet = (setName) => {
        onSelect(setName);
        setSearchValue(setName);
        setFilteredData([]);
    };
    return (
        <>
        <div className ='search-box'>
        <input type="text" placeholder="Select a set..." value={searchValue} onChange={handleFilter}/>
        </div>
        {filteredData.length !== 0 && (
        <div className = "dataResult">
            {filteredData.slice(0, 5).map((value, key) => {
                return <div className="dataItem"key={value._id} onClick={() => handleSelectSet(value.name)}>
                        <p>{value.name}</p>
                        </div>
            })}
        </div>
        )}
        </>
    )
}