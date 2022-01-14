import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import axios from 'axios';

const App = () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    axios
        .get('/api/todos')
        .then(({ data }) => console.log(data))
        .catch(console);
    return (
        <BrowserRouter>
            <div>
                App
                <span>1211551asd11</span>
            </div>
            <NavLink to="/">首頁</NavLink>
            <NavLink to="/about">關於</NavLink>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/about'} element={<About />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
