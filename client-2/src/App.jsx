import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import './App.css';
import axios from "axios";
import PhoneDetails from './components/PhoneDetails';

function App() {
  const [phones, setPhones] = useState([]);

  const {phoneId} = useParams;
  
  const getAllPhones = () => {
    axios
    .get(`${import.meta.env.VITE_API_URL}/phones`)
    .then((response) => {
      console.log(response)
      setPhones(response.data);
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPhones();
  }, []);

  return (
    <>
    <div>
      <h1>List of the phones</h1>
      <ul>
        {phones && phones.map((curr) => (
          <li key={curr._id}>
            <h1>{curr.name}</h1>
          </li>
        ))}
      </ul>
    </div>

    {phoneId && <PhoneDetails phoneId={phoneId} />}
    </>
  )
}

export default App
