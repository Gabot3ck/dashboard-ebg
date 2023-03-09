import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Login } from "./components/pages/auth/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./components/pages/home/Home";
import {AuthProvider} from './context/authContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';


function App() {
  


  return (<>
    <Provider store={ store }>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/home/*" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </>)
}

export default App;
