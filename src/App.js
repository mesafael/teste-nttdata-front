import {Routes, Route, BrowserRouter} from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import { Produtor } from './pages/produtor/Produtor'
import { SideBar } from './componets/side-bar/SideBar';

function App() {
  return (
  <>
 
   <BrowserRouter>
   <SideBar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/produtor" element={<Produtor/>} />
    </Routes>
   </BrowserRouter>
  </>

  );
}

export default App;