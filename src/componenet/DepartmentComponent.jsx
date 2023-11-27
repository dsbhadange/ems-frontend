import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const DepartmentComponent = () => {

    const [departmentName, setDepartmentsName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    const navigator = useNavigate();
    const { id } = useParams();

    function pageTitle() {
        if (id) {
            return <h3 className='text-center'>Update Department</h3>
        } else {
            return <h3 className='text-center'>Add Department</h3>
        }
    }


    useEffect(() => {
        if (id) {
            getDepartmentById(id).then((responce => {
                debugger
                setDepartmentsName(responce.data.departmentName);
                setDepartmentDescription(responce.data.departmentDescription);
            })).catch(errors => {
                console.error(errors);
            })
        }
    }, [id])

    function saveOrUpdateDepartment(e) {
        debugger
        e.preventDefault();

        const department = { departmentName, departmentDescription };
        console.log(department);

        if (id) {
            updateDepartment(id, department).then((responce => {
                console.log(responce.data);
                navigator('/departments')
            })).catch(error => {
                console.error(error);
            })
        } else {
            createDepartment(department).then((responce) => {
                console.log(responce.data);
                navigator('/departments')
            }).catch(error => {
                console.error(error);
            })
        }




    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='card col-md-6 offset-md-3 offset-md-3 mt-5'>
                    {/* <h3 className='text-center'>Add Department</h3> */}
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Name:</label>
                                <input
                                    type='text'
                                    name='departmentname'
                                    placeholder='Enter department Name'
                                    value={departmentName}
                                    onChange={(e) => setDepartmentsName(e.target.value)}
                                    className='form-control'
                                >
                                </input>

                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Description:</label>
                                <input
                                    type='text'
                                    name='departmentname'
                                    placeholder='Enter department description'
                                    value={departmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                    className='form-control'
                                >
                                </input>

                            </div>
                            <button onClick={saveOrUpdateDepartment} className='btn btn-success '>Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DepartmentComponent