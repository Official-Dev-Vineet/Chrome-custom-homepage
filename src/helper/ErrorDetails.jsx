import { useRouteError } from "react-router-dom";
import "./error.css";
import {BiSolidError} from "react-icons/bi"

export const ErrorDetails = () => {
  const error = useRouteError();
  return (
    <div className="error fixed-center tac flex flex-col gap-md padding-md shadow-3d radius-init">

        <h1 className="t-dander"> <BiSolidError /> </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="t-info">
          <big> {error && (error.message || error.statusCode)}</big>
        </p>
   
    </div>
  );
};
