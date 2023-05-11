import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AppRoute } from '../const';
import { redirectToAnotherRoute } from '../store/action';
import { AuthorizationStatus } from '../const';
import { loginAction } from '../store/api-actions/api-actions';
import { FormEvent, ChangeEvent, useEffect } from 'react';
import { getAuthorizationStatus } from '../store/selectors';

function Login() {
    const dispatch = useAppDispatch();
    const authorisationStatus = useAppSelector(getAuthorizationStatus);

    useEffect(() => {
        if (authorisationStatus === AuthorizationStatus.Auth) {
            dispatch(redirectToAnotherRoute(AppRoute.Root));
        }
    }, [dispatch, authorisationStatus]);

    const [emailField, setEmailField] = React.useState('');
    const [passwordField, setPasswordField] = React.useState('');

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(loginAction({ email: emailField, password: passwordField }));
    };

    const handleEmailFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setEmailField(evt.target.value);
    };

    const handlePasswordFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPasswordField(evt.target.value);
    };

    const isValid = passwordField.match(/^(?=.*\d)(?=.*[a-zA-Z]).{2,20}$/);

    return (

        <div className="page page--gray page--login" style={{ marginLeft: 'auto', marginRight:'auto', width: '300px', marginTop:'250px' }}>
            <main className="page__main page__main--login">
                <div className="page__login-container container">
                    <section className="login">
                        <h1 className="login__title">Sign in</h1>
                        <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">E-mail</label>
                                <input
                                    className="login__input form__input"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleEmailFieldChange}
                                    value={emailField}
                                    required
                                />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input
                                    className="login__input form__input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handlePasswordFieldChange}
                                    value={passwordField}
                                    required
                                />
                            </div>
                            <button
                                className="login__submit form__submit button"
                                type="submit"
                                disabled={!isValid}
                            >Sign in
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Login;