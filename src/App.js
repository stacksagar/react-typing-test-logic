import React, { useRef, useState } from 'react';

const getCloud = () =>
  `stacksagar typing keyboard programming languages appreciate greate person html engineear developer designer tailwindcss bootstrap html css javascript php python java c++ c# go rust ruby`.split(
    ' '
  );

function Word(props) {
  const { text, active, correct } = props;
  if (correct === true) {
    return <span className="text-green-500 bg-gray-900"> {text} </span>;
  }
  if (correct === false) {
    return <del className="text-red-900 bg-gray-900"> {text} </del>;
  }
  if (active) {
    return <span className="text-indigo-200 text-3xl active"> {text} </span>;
  }
  return <span className="text-gray-400"> {text} </span>;
}

const App = () => {
  const [userInput, setUserInput] = useState('');
  const cloud = useRef(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const [correctWordArray, setCorrectWordArray] = useState([]);

  function processInput(value) {
    if (value.endsWith(' ')) {
      setActiveWordIndex((index) => index + 1);
      setUserInput('');

      // correct word
      setCorrectWordArray((data) => {
        const word = value.trim(); 
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        console.log('newResult ', newResult);
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="p-10 w-full rounded bg-gray-600 flex flex-col justify-center items-start">
      <h1 className="py-2 px-10 bg-gray-900 rounded-lg shadow">Typing Test</h1>
      <div className="bg-gray-800 py-2 px-6 rounded shadow my-5 h-32 flex items-center">
        <p className="text-2xl">
          {cloud.current.map((word, index) => {
            return (
              <Word
                key={index}
                active={index === activeWordIndex}
                text={word}
                correct={correctWordArray[index]}
              />
            );
          })}
        </p>
      </div>
      <input
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
        type="text"
        className="bg-gray-300 text-gray-900 rounded focus:outline-none p-3 focus:ring"
      />
    </div>
  );
};
export default App;
