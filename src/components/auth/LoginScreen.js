import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import validator from "validator";
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui)

    const [values, handleInputChange, reset] = useForm({
        email: 'sebasgarcia288@hotmail.com',
        password: '123456'
    })

    const { email, password } = values

    const handleLogin = (e) => {
        e.preventDefault();
        if (isformValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isformValid = () => {

        if (!validator.isEmail(email)) {
            console.log('Email is not valid!');
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password.length < 5) {
            console.log('Password min 5 length')
            dispatch(setError('Password min 5 length'));
            return false;
        }


        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>

                {msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
