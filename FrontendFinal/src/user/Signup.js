import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import './../CSS/signup.css';
import towerimage from "./../image/signup/bg2.jpeg";
import welcome from './../image/login/Signup.jpeg';
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword:'',
        error: '',
        success: false
    });

    const { name, email, password, confirmpassword,success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, confirmpassword }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    confirmpassword:'',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="container mt-2">
        <div className="row display-flex">
        
        <div className="p-3 my-2 rounded moveCenter" style={{"margin-left":"10px" }}>
        <h2 className="my-2 p-2 text-dark font-weight-bold text-center h2 border-bottom">Signup</h2>
            <form>
            <div className="form-group">
                <label className="text-dark font-weight-bold">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-dark font-weight-bold">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-dark font-weight-bold">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <div className="form-group">
                <label className="text-dark font-weight-bold">Password</label>
                <input onChange={handleChange('confirmpassword')} type="password" className="form-control" value={confirmpassword} />
            </div>

            <button onClick={clickSubmit} className="btn btn-dark text-white btn-block font-weight-bold mt-4">
                Submit
            </button>
            <div className="text-center py-3 my-2">
                    <span className="text-dark">Already have an Account ?  &nbsp;</span>
                    <Link to="/signin" className="text-dark font-weight-bold" style={{textDecoration : "underline"}}>Signin here</Link>
            </div>
            </form>
            </div>
            <div className="p-3 my-2 rounded moveCenter" style={{"margin-left":"100px" }}>
                    <img className="rounded-circle mx-auto d-block" src={welcome} width="500px" height="500px" alt="" />
            </div>
        </div>
    </div>
    );

    const showError = () => (
        <div className="alert alert-danger mt-3" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info mt-3" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin" style={{textDecoration : "underline"}}>Signin</Link>
        </div>
    );

    return (
        <Layout
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
