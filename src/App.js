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
              <Route path="/*" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }/>
              <Route path="/login" element={<Login />}/>
            </Routes>
        </AuthProvider>
      </BrowserRouter>
        
            
  </>)
}

export default App;
