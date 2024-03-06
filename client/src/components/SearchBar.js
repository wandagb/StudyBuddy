import './Navbar.css'
import { useState } from 'react'
import useFetch from '../useFetch'

export default function SearchBar() {
    const [filteredData, setFilteredData] = useState([])
    const { data: sets } = useFetch(`/api/sets`)

    // Handle when user types
    const handleFilter = (event) => {
        const searchWord = event.target.value

        // Filter our data based on user input in our data 
        const newFilter = sets.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        // Check if the search is empty or has text in it
        if(searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }
    return (
        <>
        <div className ='search-box'>
        <input type="text" placeholder="Search for a set..." onChange={handleFilter}/>
        </div>
        {filteredData.length !== 0 && (
        <div className = "dataResult">
            {filteredData.slice(0, 5).map((value, key) => {
                return <a className="dataItem" href={`/set/${value._id}`} key={value._id}>
                        <p>{value.name}</p>
                        </a>
            })}
        </div>
        )}
        </>
    )
}