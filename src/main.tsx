import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Dashboard from './pages/Dashboard';
import Cookies from 'js-cookie';
import Starlink from './pages/StarlinkPage/Starlink';
import Launch from './pages/LaunchPage/Launch';
import { Login } from './pages/landing/Login';


interface ProtectedRouteProps {
	element: any;
	[key: string]: any;
}

const isAuthenticated = () => {
	return Boolean(Cookies.get('auth_token'));
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
	return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const allRoutes = [
	{ path: '/', element: <Login />, isPrivate: false },
	{ path: '/dashboard', element: <Dashboard />, isPrivate: true },
	{ path: '/starlink/:id', element: <Starlink />, isPrivate: true },
	{ path: '/launch/:id', element: <Launch />, isPrivate: true },
]

export const routes = [
	{
		path: '/',
		element: <App />,
		children: allRoutes?.map(({ path, element, isPrivate }) => {
			return {
				path,
				element: isPrivate ? <ProtectedRoute element={element} /> : element,
			}
		})
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
