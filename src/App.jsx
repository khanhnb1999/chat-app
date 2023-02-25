import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Avatar from './pages/Avatar';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path='/*' element={<Layout />} />
               <Route path='/sign-up' element={<SignUp />} />
               <Route path='/sign-in' element={<SignIn />} />
               <Route path='/avatar' element={<Avatar />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
