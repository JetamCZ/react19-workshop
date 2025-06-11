import React from 'react';

const SlowComponent = () => {
    function randomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }


    return (
    <div className="flex-grid2" style={{height: "300px", overflowY: "auto"}}>
        {
            [...Array(10000)].map((_, i) => (
                <div key={i} style={{width: 10, height: 10, backgroundColor: randomHexColor()}}></div>
            ))
        }
    </div>
  )
}

export default SlowComponent