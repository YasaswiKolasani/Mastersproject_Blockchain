import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";

import Navigationbar from "./components/navbar/Navbar.js";
import Homepage from "./components/homepage/Homepage.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Student from "./contracts/Student.json";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Student.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Student.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <Navigationbar/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage state={state} />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
