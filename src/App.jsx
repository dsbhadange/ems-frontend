
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListEmployeeComponent from './componenet/ListEmployeeComponent';
import HeaderComponent from './componenet/HeaderComponent';
import FooterComponent from './componenet/FooterComponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeComponent from './componenet/HomeComponent';
import EmployeeComponent from './componenet/EmployeeComponent';
import ListDepartmentsComponent from './componenet/ListDepartmentsComponent';
import DepartmentComponent from './componenet/DepartmentComponent';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />} />
          <Route path='/employees' element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<EmployeeComponent/>} />
          <Route path = '/edit-employee/:id' element = {<EmployeeComponent/>}></Route>
          <Route path='/departments' element = {<ListDepartmentsComponent/>}></Route>
          <Route path='/add-department' element = {<DepartmentComponent/>}></Route>
          <Route path='/edit-department/:id' element ={<DepartmentComponent/>}></Route>

        </Routes>
        {/* <ListEmployeeComponent />
        */}
        <FooterComponent/>
      </BrowserRouter>




    </>
  )
}

export default App
