import { useCallback, useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook 
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789" 
    if(char) str += "!@#$%^&*()_+"  

    for(let i=1; i<=length; i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char)
    }
  setPassword(pass)
  },[length,number,char,setPassword]) 

  const copyPassToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])

  

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700 ">
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          type='text'
          value = {password}
          className='outline-none w-full py-1 px-3' 
          placeholder='Password'
          readOnly  
          ref={passwordRef }
          />
          <button 
          className='bg-blue-700 text-white px-3 py-1 shrink-0'
          onClick={copyPassToClipBoard}
          >
            Copy
            </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            className='cursor-pointer'
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            id="numberInput"
            onChange={()=>{
              setNumber((prev)=>!prev)
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={char}
            id="charterInput"
            onChange={()=>{
              setChar((prev)=>!prev)
            }}
            />
            <label htmlFor='charterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
