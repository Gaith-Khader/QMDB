import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './SignUP.module.css'

function SignUP() {

    let [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    let [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();

    function getUserData(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function submitFrom(e) {
        e.preventDefault();
        let validationResult = userValidation(user);
        if (validationResult.error) {
            setErrorList(validationResult.error.details)
        } else {
            let { data } = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup", user)
            if (data.message === 'success') {
                navigate('/login')
            }
        }
    }

    function userValidation() {
        let schema = Joi.object({
            name: Joi.string().min(3).max(20).required().messages({ "string.empty": "Please Enter Your Name" }),
            email: Joi.string().required().messages({ "string.empty": "Please Enter Your Email" }),
            password: Joi.string().min(5).max(20).required().messages({ "string.empty": "Please Enter Your Password" }),
            cPassword: Joi.valid(Joi.ref('password')).required().messages({ "string.empty": "Please confirm Your Password" })
        })
        return schema.validate(user, { abortEarly: false });
    }

    return (
        <div className={`${style.formBody}`}>
            <div className='container'>
                <form onSubmit={submitFrom} className={`${style.form} col-12 col-md-10 col-lg-6 m-auto`}>
                    <h2 className='mb-3 text-center'>Sign UP</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onChange={getUserData} name="name" type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={getUserData} name="email" type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={getUserData} name="password" type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                        <input onChange={getUserData} name="cPassword" type="Password" className="form-control" id="cPassword" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className={style.subBtn}>Sign UP</button>
                    </div>
                    <div className={`${style.errors} my-2`}>
                        {errorList.map((error, indx) =>
                            <div className={style.err}>
                                {error.message}
                            </div>
                        )}
                    </div>
                </form>
                <div className='d-flex justify-content-center'>
                    <span className={style.already}>Already Have an Account <Link to='/login'>Sign In</Link> </span>
                </div>
            </div>
        </div>
    )
}


export default SignUP