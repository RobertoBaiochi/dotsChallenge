import { useState } from "react";

import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setList((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const handleUndo = (event) => {
    handleStopClick;

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };

  const handleRedo = (event) => {
    handleStopClick;

    if (undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    setList((prev) => [...prev, recoveredDot]);
  };

  const handleClear = (event => {
    event.stopPropagation();
    setList([])
    setUndid([])
  })

  const handleStopClick = (event) => {
    event.stopPropagation();
  }
  
  return (
    <div id="page" onClick={handleClick}>
      {list.map((item, index) => (
        <span
          key={index}
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}

      <div className='protectionZone' onClick={handleStopClick}>
        <button onClick={handleUndo}>Desfazer</button>
        <button onClick={handleClear}>Limpar</button>
        <button onClick={handleRedo}>Refazer</button>
      </div>
    </div>
  );
}

export default App;
