import React from 'react'
import { useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);


    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        getDepartmentList();
    }, [])

    useEffect(() => {
        if (id) {
            getEmployee(id).then((responce => {
                debugger
                setFirstName(responce.data.firstName);
                setLastName(responce.data.lastName);
                setEmail(responce.data.email);
                setDepartmentId(responce.data.departmentId)
            })).catch(errors => {
                console.error(errors);
            })
        }
    }, [id])


    function getDepartmentList() {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
        // getAllDepartments().then(responce => {
        //     setDepartments(responce.data)
        // }).catch(error => {
        //     console.error(error);
        // })
    }


    function validateForm() {
        let valid = true;

        const errocopy = { ...errors }

        if (firstName.trim()) {
            errors.firstName = '';
        } else {
            errocopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errors.lastName = '';
        } else {
            errocopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errors.email = '';
        } else {
            errocopy.email = 'Email is required';
            valid = false
        }
        if (departmentId) {
            errocopy.department = '';
        } else {
            errocopy.department = 'Department is required';
            valid = false;
        }
        setErrors(errocopy);
        return valid;
    }
    // function handleFirstName() {
    //     setFirstName(e.target.value);
    // }

    function saveORUpdateEmployee(e) {
        debugger;
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email, departmentId }
            console.log(employee);

            if (id) {
                debugger
                updateEmployee(id, employee).then((responce) => {
                    console.log(responce.data);
                    navigator('/employees')
                }).catch(errors => {
                    console.error(errors);
                })
            } else {
                createEmployee(employee).then((responce) => {
                    console.log(responce.data);
                    navigator('/employees');
                }).catch(errors => {
                    console.error(errors);
                })
            }


        }

    }


    // Chagen page title dynamically
    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }



    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='card mt-5 col-md-6 offset-md-3 offset-md-3'>
                    {/* <h2 className='text-center mt-2'>Add Employee</h2> */}
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={e => { setFirstName(e.target.value); }}
                                ></input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={e => { setLastName(e.target.value); }}
                                ></input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter Employee email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={e => { setEmail(e.target.value); }}
                                ></input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                            </div>

                            <div className='form-group mb-2'>
                                <label>Select Department:</label>
                                <select
                                    className={`form-control ${errors.department ? 'is-invalid' : ''}`} value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value='Select Department'> Select Department:</option>
                                    {
                                        departments.map(department => 
                                            <option key={department.id} value={department.id} >{department.departmentName}</option>
                                        )
                                        

                                    }
                                </select>
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}

                            </div>
                            <button className='btn btn-success' onClick={saveORUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EmployeeComponent