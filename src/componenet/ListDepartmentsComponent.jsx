import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import 'bootstrap/dist/css/bootstrap.min.css';


const ListDepartmentsComponent = () => {

    // let dumydata = [
    //     {
    //         "departmentId": 1,
    //         "departmentName": "R&D",
    //         "departmentDescription": "Research and developement"
    //     },
    //     {
    //         "departmentId": 2,
    //         "departmentName": "sprots",
    //         "departmentDescription": "Sprot developement"
    //     },
    //     {
    //         "departmentId": 3,
    //         "departmentName": "Hisotry",
    //         "departmentDescription": "History"
    //     },

    // ]
    const [departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        debugger
        getAllDepartmentsList();
    }, [])

    // function getAllDepartmentsList() {
    //     debugger;
    //     getAllDepartments().then((responce) => {
    //         console.log(responce.data);
    //         setDepartments(responce.data);

    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }
    function getAllDepartmentsList() {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewDepartment() {
        navigator('/add-department')
    }
    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }
    function removeDepartment(id) {
        debugger
        deleteDepartment(id).then((respoce) => {
            getAllDepartmentsList()
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h4 className='text-center mt-5 p-2'>List of Departments</h4>
            <button className='btn btn-primary mt-2' onClick={addNewDepartment}>Add Department</button>
            <div className='table-responsive'>
                <table className='table table-striped table-fixed table-sm'>
                    <thead className='sticky-top'>
                        <tr>
                            <th>Department ID</th>
                            <th>DepartMent Name</th>
                            <th>Department Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map(department =>
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.departmentName}</td>
                                    <td>{department.departmentDescription}</td>
                                    <td>
                                        <button className='btn btn-info btn-sm' onClick={() => updateDepartment(department.id)}>update</button>
                                        <button className='btn btn-danger btn-sm' style={{ marginLeft: '10px' }} onClick={() => removeDepartment(department.id)}>Delete</button>
                                    </td>
                                    {/* <td>{employee.email}</td> */}
                                    {/* <td>
                                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-danger' style={{marginLeft:'10px'}} onClick={() => removeEmployee(employee.id)}>Delete</button>
                                    </td> */}
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ListDepartmentsComponent