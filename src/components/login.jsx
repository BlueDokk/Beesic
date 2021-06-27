import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import { Form } from '../hooks/useForm.js';
import authService from '../services/authService';
import firestoreService from '../services/firestoreService';
import validate from '../utils/validateForm';
import bannerPng from '../assets/images/banner.png';
import bannerPng2x from '../assets/images/banner@2x.png';
import bannerWebp from '../assets/images/banner.webp';
import bannerWebp2x from '../assets/images/banner@2x.webp';


const Login = (props) => {

    // Set initial state of form fields.
    const [userState, setUserState] = useState({
        email: '',
        password: '',
    });

    // Set initial state of errors.
    const [errorState, setErrorState] = useState({});

    // Set the current state of form fields
    const handleChange = ({ target }) => {

        // Fields validation.
        const error = validate(target);

        // Save or delete errors.
        if (error) {
            setErrorState({
                ...errorState,
                [target.name]: error
            });
        }
        else delete errorState[target.name];

        // Set user information.
        setUserState({
            ...userState,
            [target.name]: target.value.trim(),
        })
    };

    const onSubmit = async (e) => {

        e.preventDefault();

        const { email, password } = userState;
        const errors = Object.keys(errorState).length;

        // If there are no errors, send user information
        if (errors === 0) {

            await authService.login(email, password)
                .then(() => {
                    toast.success('Successful login');
                    authService.currentUser((userCredential) => {
                        if (userCredential) {
                            firestoreService.getDataUser(userCredential.uid)
                                .then((doc) => {
                                    if (doc.exists) {
                                        const data = doc.data();
                                        data['id'] = userCredential.uid;
                                        localStorage.setItem('user', JSON.stringify(data));

                                        // Redirect to home page.
                                        props.history.push('/');
                                        // window.location.pathname = '/';

                                    }
                                });
                        }
                    });
                }).catch(error => {
                    toast.error('Error: invalid credentials.');
                });
        } else toast.error('Error: please complete the fields correctly');
    };

    // Rendering methods of the Custom Hook userForm
    const { renderInput, renderButton } = Form();

    return (
        <div className="row">
            <div className="col-lg-5 animated fadeIn">
                <div className="block-form">
                    <h1 className="title text-center" >Login</h1>
                    <p className="text text-white text-center">Connect with your favorite music.</p>
                    <form className="mt-5 mb-3">
                        {renderInput('email', 'Email address', 'email', handleChange, errorState['email'] || null)}
                        {renderInput('password', 'Password', 'password', handleChange, errorState['password'] || null)}
                        {renderButton('Log In', 'large', 'primary', 'submit', onSubmit)}
                        <Link to='/signup'>{renderButton('Create New Account', 'large', 'accent', 'button')}</Link>
                    </form>
                </div>
            </div>
            <div className="banner col-lg-7 d-none d-md-none d-lg-block">

                <picture>
                    <source type="image/webp"
                        srcSet={`${bannerWebp} 1x, ${bannerWebp2x} 2x`} />
                    <source type="image/png"
                        srcSet={`${bannerPng} 1x, ${bannerPng2x} 2x`} />
                    <img className="img-fluid" src={bannerPng} alt="" />
                </picture>

            </div>
        </div>
    )
}

export default withRouter(Login);
