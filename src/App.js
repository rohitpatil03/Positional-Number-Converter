import { useReducer, useRef, useState } from 'react';
import './App.css';
import data from './data.js'

const initialState = [
      {output:1111,property:'binary'},
      {output:'F', property:'hexadecimal'},
      {output:15, property:'decimal'},
      {output:17, property:'octal'}
    ]



const action = {
    type:'binary'
};



const conversion = (number, actionType) => {
  const bin = parseInt(number, actionType).toString(2).toUpperCase();
  const hexa = parseInt(number, actionType).toString(16).toUpperCase();
  const decimal = parseInt(number, actionType).toString(10).toUpperCase();
  const octal = parseInt(number, actionType).toString(8).toUpperCase();

  return [
    
      {output:bin,property:'binary'},
      {output:hexa, property:'hexadecimal'},
      {output:decimal, property:'decimal'},
      {output:octal, property:'octal'}
    
  ]
}



function App() {

  const inputGrabber = useRef();

  const [activeBinary, setActiveBinary] = useState(true);
  const [activeHexadecimal, setActiveHexadecimal] = useState(false);
  const [activeDecimal, setActiveDecimal] = useState(false);
  const [activeOctal, setActiveOctal] = useState(false);

  

  const reducer = (state, action) => {
    
    switch (action.type) {

      case 'binary':
        return conversion(inputGrabber.current.value, 2);
      case 'hexadecimal':
        return conversion(inputGrabber.current.value, 16);
      case 'decimal':
        return conversion(inputGrabber.current.value, 10);
      case 'octal':
        return conversion(inputGrabber.current.value, 8);
      default:
        throw new Error();
    }
  }

  const [newState, dispatch] = useReducer(reducer, initialState);

  
  

  const checkPattern = () =>{
    switch (action.type) {
      case 'binary':
        const binPattern = /^[0-1]+$/
        if (binPattern.test(inputGrabber.current.value)){
          console.log("#")
          return true
        }
        else{
          return false;
        }
      case 'hexadecimal':
        const hexaPattern = /^[0-9a-fA-F]+$/
        if (hexaPattern.test(inputGrabber.current.value)){
          return true
        }
        else{
          return false;
        }
      case 'decimal':
        const deciPattern = /^[0-9]+$/
        if (deciPattern.test(inputGrabber.current.value)){
          return true
        }
        else{
          return false;
        }
      case 'octal':
        const octalPattern = /^[0-7]+$/
        if (octalPattern.test(inputGrabber.current.value)){
          return true
        }
        else{
          return false;
        }
      default:
        break;
    }
  }

  const copyClipboard = (copyMaterial) => {
    navigator.clipboard.writeText(copyMaterial);
  }

  const showInput = (e) => {
    e.preventDefault();
    const checking = checkPattern();
    if (checking){
      inputGrabber.current.className = '';
      dispatch({type : action.type})
    }
    else{
      inputGrabber.current.className = 'error';
    }
  }

  const actionChanger = (buttonPressed) => {
    inputGrabber.current.value = "";
    switch (buttonPressed) {
      case 'binary':
        action.type = 'binary';
        inputGrabber.current.placeholder = 'Enter the Binary number';
        setActiveBinary(true);
        setActiveHexadecimal(false);
        setActiveDecimal(false);
        setActiveOctal(false);
        break;
      case 'hexadecimal':
        action.type = 'hexadecimal';
        inputGrabber.current.placeholder = 'Enter the Hexadecimal number';
        setActiveBinary(false);
        setActiveHexadecimal(true);
        setActiveDecimal(false);
        setActiveOctal(false);
        break;
      case 'decimal':
        action.type = 'decimal';
        inputGrabber.current.placeholder = 'Enter the Decimal number';
        setActiveBinary(false);
        setActiveHexadecimal(false);
        setActiveDecimal(true);
        setActiveOctal(false);
        break;
      case 'octal':
        action.type = 'octal';
        inputGrabber.current.placeholder = 'Enter the Octal number';
        setActiveBinary(false);
        setActiveHexadecimal(false);
        setActiveDecimal(false);
        setActiveOctal(true);
        break;
      default:
        break;
    }
  }
  return (
    <>
      <section className="section-center">

        <h2>Positional number Convertor</h2>
        <br />

        <form onSubmit={(e)=>showInput(e)}>
          <button type={'button'} className={activeBinary ? 'active-btn' : 'filter-btn'} onClick={()=>actionChanger('binary')}>Binary</button>
          <button type={'button'} className={activeHexadecimal ? 'active-btn' : 'filter-btn'} onClick={()=>actionChanger('hexadecimal')}>Hexadecimal</button>
          <button type={'button'} className={activeDecimal ? 'active-btn' : 'filter-btn'} onClick={()=>actionChanger('decimal')}>Decimal</button>
          <button type={'button'} className={activeOctal ? 'active-btn' : 'filter-btn'} onClick={()=>actionChanger('octal')}>Octal</button>
          <br /><br />
          <input type="text" placeholder='Enter the Binary number' ref={inputGrabber}/>
          <button type={'submit'} className='btn'>Convert</button>
        </form>

      </section>
      <br /><br /><br />
      <section className='cards'>
        {data.map((item, index)=>{
          const {id, text} = item;
          const {output, property} = newState[index];
          return (
            <div>
              <div className="flip-card" key={id}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <br /><br />
                    <h2>{id}</h2>
                    <br /><br />
                    <textarea value={output} readOnly>{output}</textarea>
                  </div>
                  <div className="flip-card-back">
                    <br /><br />
                    <h2>{id}</h2>
                    <br /><br />
                    <h3>{text}</h3>
                  </div>
                </div>
              </div>
              <br />
              <button className='copy-btn' onClick={()=>copyClipboard(output)}>Copy to Clipboard</button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
