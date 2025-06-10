import React, {useEffect, useState} from 'react';


const R18Fetching = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {loading ? "Loading..." : null}

            <div className="flex-grid">
                {
                    data?.map(img => (
                        <img src={img.url} key={img.id} alt="" style={{maxHeight: 250}}/>
                    ))
                }
            </div>
        </>
    )
}

export default R18Fetching