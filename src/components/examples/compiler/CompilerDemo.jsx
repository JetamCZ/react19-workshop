import React, {useState} from 'react';
import SlowComponent from "./SlowComponent.jsx";
import CounterButton from "./CounterButton.jsx";

const CompilerDemo = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('#000');

    return (
        <div className="flex">
            <div className="card">
                <div style={{backgroundColor: color, height: 50, width: 100}}></div>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
            </div>

            <div className="card">
                <CounterButton count={count} onClick={() => setCount(count+1)}/>
            </div>

            <div className="card" style={{maxWidth: "200px"}}>
                <SlowComponent/>
            </div>

        </div>
    )
}

export default CompilerDemo