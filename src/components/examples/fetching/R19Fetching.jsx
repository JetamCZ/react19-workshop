import React, {Suspense, use, useMemo} from 'react';

const promise = fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => response.json())

const R19Fetching = () => {
    return (
        <Suspense fallback={"loading..."}>
            <R19FetchingData/>
        </Suspense>
    )
}

const R19FetchingData = () => {
    const data = use(promise)

    return (
        <>
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

export default R19Fetching