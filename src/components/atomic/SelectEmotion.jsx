import PropTypes from 'prop-types';
import { useState } from 'react';
import moodIcons from '@/assets/icons/mood/moodIcons'; // Importing moodIcons

const emotions = [
  { name: 'happy', src: moodIcons.happy, alt: 'Happy icon' },
  { name: 'smile', src: moodIcons.smile, alt: 'Smile icon' },
  { name: 'soso', src: moodIcons.soso, alt: 'Soso icon' },
  { name: 'bad', src: moodIcons.bad, alt: 'Bad icon' },
  { name: 'sad', src: moodIcons.sad, alt: 'Sad icon' },
];

const SelectEmotion = ({ title }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleClick = (emotion) => {
    setSelectedEmotion(emotion.name);
  };

  return (
    <div className="w-[356px] h-[108px] px-5 py-2.5 bg-white rounded-[15px] shadow-light flex-col justify-center items-center gap-[15px] flex">
      <div className="text-gray-450 text-base font-semibold">
        {title}
      </div>
      <div className="justify-start items-center gap-[17px] flex">
        {emotions.map((emotion) => (
          <div
            key={emotion.name}
            className="w-11 h-11 relative cursor-pointer"
            onClick={() => handleClick(emotion)}
          >
            <div
              className="w-full h-full flex justify-center items-center"
              style={{
                filter: selectedEmotion === emotion.name ? 'none' : 'grayscale(100%)',
                transition: 'filter 0.3s ease',
              }}
            >
              <img src={emotion.src} alt={emotion.alt} className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SelectEmotion.propTypes = {
  title: PropTypes.string.isRequired, 
};

export default SelectEmotion;
