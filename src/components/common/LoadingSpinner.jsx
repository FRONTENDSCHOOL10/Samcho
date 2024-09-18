import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';

const LoadingSpinner = ({ text }) => {
  return (
    <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <SyncLoader color="#4D82BE" size={10} margin={4} />
      <p className="w-full font-medium text-center text-gray-400">{text}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  text: PropTypes.string,
};

export default LoadingSpinner;
