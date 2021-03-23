import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)
    console.log(msgError)

    const [values, handleInputChange, reset] = useForm({
        name: 'Sebastian Garcia Alvarez',
        email: 'sebasgarcia288@hotmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isformValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isformValid = () => {

        if (name.trim().length === 0) {
            console.log('Name in required!');
            dispatch(setError('Name in required'));
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Email is not valid!');
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Password min 5 length')
            dispatch(setError('Password min 5 length'));
            return false;
        }


        dispatch(removeError());
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password2}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
