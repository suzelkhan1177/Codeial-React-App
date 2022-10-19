import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";


function AuthRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to='/login' />;
}


const Page404 = () => {
  return <h1>Page Error 404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={[]} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
       <Route  exact  path='/settings' element={<AuthRoute><Settings /></AuthRoute> } />
       <Route exact  path='/user/:userId' element={<AuthRoute><UserProfile /></AuthRoute> } />
          <Route path="*"  element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
