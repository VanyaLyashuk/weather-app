import React from "react";
import ErrorIcon from "../../UI/icons/ErrorIcon";

interface ErrorMessageProps {
  minHeightClass?: string;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  minHeightClass,
  message = "Ooops! Something went wrong.",
}) => {
  return (
    <div className={`grid place-items-center ${minHeightClass}`}>
      <div className="grid place-items-center">
        <ErrorIcon />
        <h2 className="text-lg font-bold text-center dark:text-slate-400">{message}</h2>
      </div>
    </div>
  );
};

export default ErrorMessage;
