import PropTypes from 'prop-types';
import { useState } from 'react';
import { HappyMong } from '@/assets/icons/mood';
import { SmileMong } from '@/assets/icons/mood';
import { SosoMong } from '@/assets/icons/mood';
import { BadMong } from '@/assets/icons/mood';
import { SadMong } from '@/assets/icons/mood';

const emotions = [
  { name: 'happy', src: HappyMong, alt: 'Happy icon', color: '#FFD700' },
  { name: 'smile', src: SmileMong, alt: 'Smile icon', color: '#00FF00' },
  { name: 'soso', src: SosoMong, alt: 'Soso icon', color: '#0000FF' },
  { name: 'bad', src: BadMong, alt: 'Bad icon', color: '#FF0000' },
  { name: 'sad', src: SadMong, alt: 'Sad icon', color: '#800080' },
];

const SelectEmotion = ({ title }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleClick = (emotion) => {
    setSelectedEmotion(emotion.name);
  };

  return (
    <div className="w-[356px] h-[108px] px-5 py-2.5 bg-white rounded-[15px] shadow flex-col justify-center items-center gap-[15px] inline-flex">
      <div className="text-[#555555] text-base font-semibold font-['Pretendard']">
        {title}
      </div>
      <div className="justify-start items-center gap-[17px] inline-flex">
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
