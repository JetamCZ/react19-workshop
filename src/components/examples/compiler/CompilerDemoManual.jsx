import React, {useCallback, useState} from 'react';
import SlowComponent from "./SlowComponent.jsx";
import CounterButton from "./CounterButton.jsx";

const SlowComponentMemo = React.memo(SlowComponent)
const CounterButtonMemo = React.memo(CounterButton)

const CompilerDemoManual = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('#000');

    const setCountCallback = useCallback(() => {
        setCount((count) => count + 1);
    }, [])

    return (
        <div className="flex">
            <div className="card">
                <div style={{backgroundColor: color, height: 50, width: 100}}></div>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
            </div>

            <div className="card">
                <CounterButtonMemo count={count} onClick={setCountCallback}/>
            </div>

            <div className="card" style={{maxWidth: "200px"}}>
                <SlowComponentMemo unused={{hello: "world"}}/>
            </div>

        </div>
    )
}

export default CompilerDemoManual