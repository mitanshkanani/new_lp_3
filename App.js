
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Signup from './Components/SignUp';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/SignUp' element={<Signup></Signup>}/>
        <Route path='/SignIn' element={<SignIn></SignIn>}/>
        <Route path='/' element={<Home></Home>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
