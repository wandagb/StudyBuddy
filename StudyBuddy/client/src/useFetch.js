import { useState, useEffect } from "react";

// General GET fetch
// pass in URL and receive data

const useFetch = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
          // Saving the response we get from API as a json then storing it in our 'flashCard' variable
            .then((response) => response.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => console.log(error));
        }, [url]);

    return { data }
    
};

export default useFetch;