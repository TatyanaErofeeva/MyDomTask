import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
function NotFound() {
    return (
        <div style={{ marginLeft: '500px', marginTop: '200px' }}>
            <h1 style={{ color: 'red' }}>
                404
                <br />
                <small> NOT FOUND</small>
            </h1>
            <div style={{ color: 'blue' }}>
                <Link to={AppRoute.Root}>
                    <p>
                        Вернуться на главную страницу
                    </p>
                </Link>
            </div>
        </div>

    );
}

export default NotFound;