import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
 const error = useRouteError();
 return (
  <div className="flex flex-col justify-center min-h-screen items-center">
   <h1 className="text-3xl font-bold">Opps</h1>
   <p className="italic my-2 text-xl">Sorry, an unexpected error has occured</p>
   <p className="text-lg">{error.statusText || error.message}</p>
  </div>
 );
};
