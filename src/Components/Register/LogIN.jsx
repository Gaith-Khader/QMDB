import React, { useState } from 'react'
import style from './SignUP.module.css'
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIN(props) {

    let navigate=useNavigate();
    let [errorList,setErrorList]=useState([]);
    let [user,setUser]=useState({
        email:'',
        password:''
    })

    function getUserData(e){
        let newUser=user;
        newUser[e.target.name]=e.target.value;
        setUser(newUser);
    }
    let refresh= function () {
        window.location.reload(false);
    }
    async function submitForm(e){
        e.preventDefault();
        let resultValidation=validationUser(user);
        if(resultValidation.error){
            // list of errors
            setErrorList(resultValidation.error.details)
        }else{
            let {data}= await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",user);
            console.log(data);
            if (data.message==='success'){
                localStorage.setItem("userToken",data.token)
                navigate('/home');
                refresh();
                props.getUserData();
            }
        }
    }

    function validationUser(){
        let schema=Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.string().required(),
        })
        return schema.validate(user,{abortEarly:false});
    }

    return (
        <div className={`${style.formBody}`}>
            <div className='container'>
                    <form onSubmit={submitForm} className={`${style.form} col-12 col-md-10 col-lg-6 m-auto`}>
                        <h2 className='mb-3 text-center'>Log in</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={getUserData} name="email" type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={getUserData} name="password" type="password" className="form-control" id="password" />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className={style.subBtn}>Log in</button>
                        </div>
                        <div className='errors mt-5'>
                    {errorList&&errorList.map((error,indx)=> 
                    <div className='alert alert-danger'>
                        {error.message}
                    </div>
                    )}
                </div>
                    </form>
                    <div className='d-flex justify-content-center'>
                    <span className={style.already}>Already Have an Account <Link to='/signup'>Sign Up</Link> </span>
                </div>
            </div>
        </div>
    )
}

export default LogIN