import { useAppSelector } from '../hooks';
import { AuthorizationStatus, AppRoute } from '../const';
import { Link } from 'react-router-dom';
//import { useAppDispatch } from '../hooks';
import { getAuthorizationStatus, getUserEmail } from '../store/selectors';

function MainHeader() {
    const authStatus = useAppSelector(getAuthorizationStatus);
    const userEmail = useAppSelector(getUserEmail);
    const isAuthed = (authStatus === AuthorizationStatus.Auth);
    //const dispatch = useAppDispatch();

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
                            <img
                                className="header__logo"
                                src="img/logo.svg"
                                alt="6 cities logo"
                                width="81"
                                height="41"
                            />
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item user">
                                {isAuthed ?
                                    <a className="header__nav-link header__nav-link--profile" href="/#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">{userEmail}</span>
                                    </a>
                                    :
                                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__login">Sign in</span>
                                    </Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
export default MainHeader;