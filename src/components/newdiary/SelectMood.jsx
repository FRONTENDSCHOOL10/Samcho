import PropTypes from 'prop-types';
import moods from '@/assets/icons/mood/moods';

const SelectMood = ({ isSelected, setSelected }) => {
  const handleClick = (name) => {
    setSelected(isSelected === name ? '' : name);
  };

  const emotionItems = Object.entries(moods).map(([key, src]) => (
    <li key={key}>
      <button
        type="button"
        onClick={() => handleClick(key)}
        aria-pressed={isSelected === key}
      >
        <img
          src={src}
          alt={key}
          className={`w-full h-full transition-filter duration-300 ease-in-out ${
            isSelected === key ? 'filter-none' : 'filter grayscale'
          }`}
          width={44}
          height={44}
        />
        <span
          className={`text-xs font-medium ${
            isSelected === key ? 'text-blue-500' : 'text-gray-300'
          }`}
        >
          {key}
        </span>
      </button>
    </li>
  ));

  return (
    <div className="p-[0.9375rem] bg-white rounded-[15px] shadow-light flex-col justify-center items-center gap-[15px] flex">
      <h2 className="text-base font-semibold text-gray-450">
        오늘 하루는 어떠셨나요?
      </h2>
      <ul className="flex items-center justify-between w-full px-5">
        {emotionItems}
      </ul>
    </div>
  );
};

SelectMood.propTypes = {
  isSelected: PropTypes.string,
  setSelected: PropTypes.func,
};

export default SelectMood;
