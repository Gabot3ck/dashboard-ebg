import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Login } from "./components/pages/auth/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./components/pages/home/Home";
import {AuthProvider} from './context/authContext';
import './App.css';


function App() {
  


  return (<>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Login />}/>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
        
            
  </>)
}

export default App;
