import React from 'react';

const CounterButton = (props) => {
  return (
    <>
        <button onClick={props.onClick}>Click ME! ({props.count})</button>
    </>
  )
}

export default CounterButton