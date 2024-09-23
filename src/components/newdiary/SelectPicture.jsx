import { useState, useEffect, memo } from 'react';
import CameraIcon from '@/assets/icons/diary/camera.svg';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const SelectPicture = ({ picture, setPicture }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchImage = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    };

    const handleFileLoad = (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleHEICFile = async (file) => {
      toast.loading('파일 변환 중...', { duration: 2000 });

      try {
        const loadHeic2any = () => import('heic2any');
        const heic2anyModule = await loadHeic2any();
        const jpegBlob = await heic2anyModule.default({
          blob: file,
          toType: 'image/jpeg',
        });

        const jpegFile = new File([jpegBlob], 'image.jpg', {
          type: 'image/jpeg',
        });
        setPicture(jpegFile);
        setPreview(URL.createObjectURL(jpegFile));
        toast.success('파일 변환 완료!', { duration: 2000 });
      } catch (error) {
        console.error('HEIC conversion error:', error);
        setPreview(null);
        toast.error('HEIC 변환 오류 발생', { duration: 2000 });
      }
    };

    switch (true) {
      case picture instanceof File:
        switch (picture.type) {
          case 'image/heic':
          case 'image/heif':
            handleHEICFile(picture);
            break;
          default:
            handleFileLoad(picture);
        }
        break;
      case typeof picture === 'string':
        fetchImage(picture);
        break;
      default:
        setPreview(null);
    }
  }, [picture, setPicture]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
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
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        {!preview && (
          <>
            <img
              src={CameraIcon}
              className="w-10 h-9"
              alt="Camera icon"
              width={40}
              height={36}
            />
            <span>
              원하는 사진 1장을 선택해주세요 <br /> (선택사항)
            </span>
          </>
        )}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg, image/png, image/heic, image/heif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

SelectPicture.propTypes = {
  picture: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
  setPicture: PropTypes.func.isRequired,
};

export default memo(SelectPicture);
