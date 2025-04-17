import Board from './Board';
import './App.css';
/*
import MyB from "./MyButton";
import { Button1, Button3 } from "./ButtonLib";
import AP from "./AboutPage";
import Profile from "./Profile";
import { useState } from 'react';
*/

export default function App() {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board/>
    </div>
  )
}







/*
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function App() {
  const [sharedCount, setSharedCount] = useState(0);

  function handleSharedClick() {
    setSharedCount(sharedCount + 1);
  }

  const listItems = products.map(product => (
    <li key={product.id}>{product.title}</li>
  ));

  return (
    <div className="wrapper">
      <h1>Hello React</h1>
      <MyB /><br />
      <Button1 />&nbsp;
      <Button3 />
      <AP />
      <Profile />
      <ul>{listItems}</ul>

      <h1>Counters that update separately</h1>
      <IndividualButton />
      <IndividualButton />

      <h1>Counters that update together</h1>
      <SharedButton count={sharedCount} onClick={handleSharedClick} />
      <SharedButton count={sharedCount} onClick={handleSharedClick} />
    </div>
  );
}

function IndividualButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function SharedButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
*/