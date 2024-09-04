import PropTypes from 'prop-types';

const emotions = [
  { name: '행복', src: '/icons/mood/HappyMong.png', alt: '행복' },
  { name: '기쁨', src: '/icons/mood/SmileMong.png', alt: '기쁨' },
  { name: '보통', src: '/icons/mood/SosoMong.png', alt: '보통' },
  { name: '나쁨', src: '/icons/mood/BadMong.png', alt: '나쁨' },
  { name: '우울', src: '/icons/mood/SadMong.png', alt: '우울' },
];

const SelectMood = ({ isSelected, setSelected }) => {
  const handleClick = (name) => {
    setSelected(isSelected === name ? null : name);
  };

  const emotionItems = emotions.map((emotion) => (
    <li key={emotion.name}>
      <button
        type="button"
        onClick={() => handleClick(emotion.name)}
        aria-pressed={isSelected === emotion.name}
      >
        <img
          src={emotion.src}
          alt={emotion.alt}
          className={`w-full h-full transition-filter duration-300 ease-in-out ${
            isSelected === emotion.name ? 'filter-none' : 'filter grayscale'
          }`}
        />
        <span
          className={`text-xs font-medium ${
            isSelected === emotion.name ? 'text-blue-500' : 'text-gray-300'
          }`}
        >
          {emotion.name}
        </span>
      </button>
    </li>
  ));

  return (
    <div className="p-[0.9375rem] bg-white rounded-[15px] shadow-light flex-col justify-center items-center gap-[15px] flex">
      <h2 className="text-base font-semibold text-gray-450">
        오늘 하루는 어떠셨나요?
      </h2>
      <ul className="justify-start items-center gap-[17px] flex">
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
