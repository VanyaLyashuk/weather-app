import SpinnerIcon from '../../UI/icons/SpinnerIcon';

interface SpinnerProps {
  minHeightClass: string;
}

const Spinner: React.FC<SpinnerProps> = ({minHeightClass}) => {
  return (
    <div className={`grid place-items-center ${minHeightClass}`} role="status">
      <SpinnerIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
