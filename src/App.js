
import './App.css';
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile'
import UserContextProvider from './context/UserContextProvider';
import Edit from './components/Edit';
import Alluser from './components/Alluser';
import Page404 from './components/Page404';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
     <Route path='' element={<Signin /> }/>
     <Route path='signup' element={<Signup /> }/>
     <Route path='profile' element={<Profile /> }/>
     <Route path='profile/edit' element={<Edit /> }/>
     <Route path='profile/alluser' element={<Alluser/> }/>
     <Route path='/*' element={<Page404/>} />
    </Route>
  )
)

function App() {
  return (
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
