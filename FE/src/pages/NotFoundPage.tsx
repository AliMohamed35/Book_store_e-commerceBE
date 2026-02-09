import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page not found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
