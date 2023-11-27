import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react'
import { deleteEmployee, listEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const ListEmployeeComponent = () => {
    const navigator = useNavigate();

    const [employees, setEmployee] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getAllEmployee();
    }, [])

    function getAllEmployee() {
        listEmployee().then((response) => {
            setEmployee(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployee();
        }).catch(error => {
            console.error(error)
        })
    }


    return (
        <div className='container'>
            <div className='text-center mt-5'>
                <h4 className='p-2'>Employee List</h4>
            </div>
            <button className='btn btn-primary mt-2' onClick={addNewEmployee}>Add Employee</button>
            <div className='table-responsive'>
                <table className='table table-striped table-fixed table-sm'>
                    <thead className='sticky-top'>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <button className='btn btn-info btn-sm' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-danger btn-sm' style={{marginLeft:'10px'}} onClick={() => removeEmployee(employee.id)}>Delete</button>
                                    </td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListEmployeeComponent