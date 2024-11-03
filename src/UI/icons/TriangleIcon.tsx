type TriangleIconProps = {
  showDetails: boolean;
};

const TriangleIcon = ({ showDetails }: TriangleIconProps) => {
  const triangleClasses = showDetails
    ? "transform rotate-180"
    : "transform rotate-0";

  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-neutral-800 dark:fill-yellow-50 sm:w-2.5 transition-all duration-[400ms] ${triangleClasses}`}
    >
      <path d="M0.668913 0.578906L0.710528 0.628125L3.85474 4.29609C3.96109 4.42031 4.12061 4.49766 4.29863 4.49766C4.47664 4.49766 4.63617 4.41797 4.74252 4.29609L7.88441 0.635156L7.93759 0.574219C7.97689 0.515625 8.00001 0.445313 8.00001 0.370313C8.00001 0.166406 7.82893 0 7.61623 0H0.985646C0.77295 0 0.601868 0.166406 0.601868 0.370313C0.601868 0.447656 0.627299 0.520312 0.668913 0.578906Z" />
    </svg>
  );
};

export default TriangleIcon;
