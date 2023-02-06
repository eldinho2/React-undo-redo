import { useState } from 'react'
import './App.css'

function App() {

  const [list, setList] = useState([])
  const [redoList, setRedoList] = useState([])

  const handleClick = (event) => {
    const newDot = {
      x : event.clientX,
      y : event.clientY
    }

    setList((prev) => [...prev, newDot])
  }

  const handleClickUndo = (event) => {
    event.stopPropagation()

    if (list.length === 0) return

    const lastDot = list[list.length - 1]
    setRedoList((prev) => [...prev, lastDot])

    setList((prev) => {
      const newList = [...prev].slice(0, -1)
      return newList
    })
  };

  const handleClickRedo = (event) => {
    event.stopPropagation()

    if (redoList.length === 0) return

    const lastDot = redoList[redoList.length - 1]

    setRedoList((prev) => {
      const newArray = [...prev].slice(0, -1)
      return newArray
    })

    setList((prev) => [...prev, lastDot])

  }

  const handleClickDell = (event) => {
    event.stopPropagation()

    setList([])
  }

  return (
    <div id="page" onClick={handleClick}>
      {list.map((dot) => (
        <span id="dot" key={dot.x} style={{top: dot.y, left: dot.x}}/>
      ))}
      <div id='btndiv'>
        <button id='button' onClick={handleClickUndo}>Desfazer</button>
        <button id='button' onClick={handleClickRedo}>Refazer</button>
        <button id='button' onClick={handleClickDell}>Desfazer Tudo</button>
      </div>
    </div>
  )
}

export default App
