import React from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from "./Visualize/Home"
import VisualPage from "./Visualize/VisualPage"
import "./App.css"


function DropDown() {
    var navigate = useNavigate();                                      // Any keyword which starts with "use" is a hook and hooks can only be used inside a functional component
    return (
        <div className="drop-down" >
            <select id="algorithm" onChange={(e)=>{navigate(e.target.value)}} >
                <option value="/"  > Home</option>
                <option value="edmondskarp/visualize"> Edmond's Karp </option>
                <option value="fordfulkerson/visualize" > Ford Fulkerson </option>
            </select>
        </div>
    );

}


function App() {
    return (
        <BrowserRouter>
            <div>
                <DropDown />
                <Routes>                                            {/* Routes is wrapped because everything outside routes will be present in every component */}
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/edmondskarp/visualize" element={ <VisualPage algorithm='EdmondsKarp'/>} />
                <Route exact path="/fordfulkerson/visualize" element={<VisualPage algorithm='FordFulkerson'/>} />
                </Routes>
            </div>
            <footer> @author Harsh Parihar</footer>
        </BrowserRouter>
    )
}

export default App

