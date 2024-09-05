import { useState } from 'react';
import CameraIcon from '@/assets/icons/diary/camera.svg';

const SelectPicture = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white rounded-[13px] px-5 py-[15px] flex flex-col gap-4 shadow-light">
      <h2 className="text-base font-semibold text-gray-450">오늘의 사진</h2>
      <label
        htmlFor="fileInput"
        className="w-full min-h-[323px] bg-blue-10 text-center text-blue-500 text-sm font-medium flex flex-col items-center gap-[13.59px] justify-center cursor-pointer rounded-[9px] border border-blue-100"
        style={{
          backgroundImage: preview ? `url(${preview})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!preview && (
          <>
            <img src={CameraIcon} className="w-10 h-9" />
            <span>
              원하는 사진 1장을 선택해주세요 <br /> (선택사항)
            </span>
          </>
        )}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SelectPicture;
