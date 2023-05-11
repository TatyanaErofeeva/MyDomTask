import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import MainPage from '../pages/main-page';

function App(): JSX.Element {
    return (
        <Routes>
            <Route
                path={AppRoute.Root}
            >
                <Route
                    index element={<MainPage/>}
                />
                <Route
                    path={AppRoute.Login}
                    element={<Login />}
                />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;