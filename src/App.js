import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react'


const App = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>
            <div>App</div>
            <button onClick={() => { setNumber(number + 1) }}>Add</button>
            <div>Number: {number}</div>
            <div>here we go!!!!!!!</div>
        </div>
    )
}

export default hot(App);
