import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link} from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import LoadingOverlay from 'react-loading-overlay';
import avatar from './../image/login/avatar.png';
import sideimage from './../image/login/side.jpg';
import './../CSS/signin.css';
const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (

        <div className="container mt-2">
        <div className="row display-flex">
            <div className="col-sm-8 col-xs-10 col-md-4 offset-md-2 offset-sm-2 offset-xs-1 py-4 px-3 rounded-left">
                
                <div className="p-4 mb-3">
                    <img className="rounded-circle mx-auto d-block" src={avatar} width="100px" height="100px" alt="" />
                    <form>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Email</label>
                            <input
                             onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Password</label>
                            <input
                                onChange={handleChange("password")}
                                type="password"
                                className="form-control"
                                value={password}
                            />
                        </div>
                        <button onClick={clickSubmit} className="btn btn-dark btn-block rounded font-weight-bold text-center">
                        Submit
                        </button>
                    </form>
                    <div className="text-center">
                    <span className="text-center d-block text-dark font-weight-bold text-italic">or</span>
                    <Link to="/signup" className="text-dark font-weight-bold">Create an account here!! </Link>
                    </div>
                </div>

            </div>

        </div>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            // <div className="alert alert-info">
            //     <h2>Loading...</h2>
            // </div>
            <LoadingOverlay
        active={loading}
        spinner
        text='Loading......'
        className="loader">
        </LoadingOverlay>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            className="container-fluid"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
