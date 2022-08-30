import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login.js'
import Home from './Home.js';
import Feed from "./Feed"
import Friends from './Friends';
import Books from './Books';
import Users from './Users'
import Read from './Read';
import Branch from "./Branch"
import Search from './Search'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/edit" element={<Home />}>
        <Route path=":documentId" element={<Home />} />
      </Route>
      <Route path="/feed" element={<Feed />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/books" element={<Books />} />
      <Route path="/users" element={<Users />}>
        <Route path=":username" element={<Users />} />
      </Route>
      <Route path={"/read"} element={<Read />}>
        <Route path={":documentId"} element={<Read />} />
      </Route>
      <Route path={"/branch"} element={<Branch />}>
        <Route path={":documentId"} element={<Branch />} />
      </Route>
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
);

