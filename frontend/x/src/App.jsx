import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [active, setAvtive] = useState(false)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCount(count + 1)
  //   }, 100)
  // }, [])

  return (
    <>
      <button onClick={() => {setCount(count+1)}}>
        Clicked {count}
      </button>
    </>
  )
}

export default App
