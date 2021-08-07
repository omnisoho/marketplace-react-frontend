// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import MyProductsList from './components/MyProducts';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const logOut = () => {};

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={'/'} className="navbar-brand">
          Marketplace
        </Link>
        <div className="navbar-nav mr-auto">
          {currentUser && (
            <li className="nav-item">
              <Link to={'/productList'} className="nav-link">
                Search Products
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={'/addProduct'} className="nav-link">
                Add Product
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/myProducts'} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={'/register'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3 d-flex justify-content-center">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/productList" component={ProductList} />
          <Route exact path="/myProducts" component={MyProductsList} />
          <Route exact path="/addProduct" component={AddProduct} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
