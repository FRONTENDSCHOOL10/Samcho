import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { pb } from '@/api';
import imageCompression from 'browser-image-compression';
import { format } from 'date-fns';
import { debounce } from 'lodash';

const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

const useDiaryActions = (diaryDetail, defaultTitle, diaryId) => {
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (diaryDetail) {
      setSelectedMood(diaryDetail.mood);
      setSelectedEmotions(diaryDetail.emotion || []);
      setSelectedWeathers(diaryDetail.weather || []);
      setText(diaryDetail.content);
      if (diaryDetail.picture) {
        setPicture(`${baseImageUrl}/${diaryDetail.id}/${diaryDetail.picture}`);
      }
    }
  }, [diaryDetail]);

  useEffect(() => {
    if (!diaryId) {
      const autosaveData = sessionStorage.getItem('autosave');

      if (autosaveData) {
        const { selectedMood, selectedEmotions, selectedWeathers, text } =
          JSON.parse(autosaveData);

        if (selectedMood) {
          setSelectedMood(selectedMood);
        }

        if (selectedEmotions && Array.isArray(selectedEmotions)) {
          setSelectedEmotions(selectedEmotions);
        }

        if (selectedWeathers && Array.isArray(selectedWeathers)) {
          setSelectedWeathers(selectedWeathers);
        }

        if (text) {
          setText(text);
        }
      }
    }
  }, [
    setSelectedEmotions,
    setSelectedMood,
    setSelectedWeathers,
    setText,
    diaryId,
  ]);

  useEffect(() => {
    if (!diaryId) {
      const saveData = debounce(() => {
        const autosaveData = {
          selectedMood,
          selectedEmotions,
          selectedWeathers,
          text,
        };

        sessionStorage.setItem('autosave', JSON.stringify(autosaveData));
      }, 500);

      saveData();
      return () => saveData.cancel();
    }
  }, [selectedMood, selectedEmotions, selectedWeathers, text, diaryId]);

  const handleEmotionClick = useCallback(
    (text) => {
      if (selectedEmotions.includes(text)) {
        setSelectedEmotions(
          selectedEmotions.filter((emotion) => emotion !== text)
        );
      } else if (selectedEmotions.length < 5) {
        setSelectedEmotions([...selectedEmotions, text]);
      } else {
        toast.dismiss();
        toast.error('감정은 5개까지 선택 가능합니다.');
      }
    },
    [selectedEmotions]
  );

  const handleWeatherClick = useCallback(
    (text) => {
      if (selectedWeathers.includes(text)) {
        setSelectedWeathers(
          selectedWeathers.filter((weather) => weather !== text)
        );
      } else if (selectedWeathers.length < 2) {
        setSelectedWeathers([...selectedWeathers, text]);
      } else {
        toast.dismiss();
        toast.error('날씨는 2개까지 선택 가능합니다.');
      }
    },
    [selectedWeathers]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (
        selectedMood === '' ||
        selectedEmotions === '' ||
        selectedWeathers === '' ||
        text === ''
      ) {
        toast.dismiss();
        toast.error('입력하지 않은 필수 값이 있습니다.');
        setIsSubmitting(false);
        return;
      }

      if (!diaryId) {
        try {
          const data = await pb.collection('diary').getFullList({
            filter: `user = "${userId}" && date = "${defaultTitle} 00:00:00.000Z"`,
          });

          if (data.length > 0) {
            toast.dismiss();
            toast.error('오늘 일기는 이미 작성하셨습니다.');
            setIsSubmitting(false);
            return;
          }
        } catch (error) {
          console.error('서버 통신중 에러 발생', error);
          setIsSubmitting(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append('user', userId);
      formData.append('date', defaultTitle);
      formData.append('mood', selectedMood);
      selectedEmotions.forEach((emotion) => {
        formData.append('emotion', emotion);
      });
      selectedWeathers.forEach((weather) => {
        formData.append('weather', weather);
      });
      formData.append('content', text);

      if (picture) {
        try {
          const webpFile = await convertToWebP(picture);
          formData.append('picture', webpFile);
        } catch (error) {
          console.error('이미지 변환 중 오류 발생:', error);
          setIsSubmitting(false);
          return;
        }
      }

      const submitPromise = diaryId
        ? pb.collection('diary').update(diaryId, formData)
        : pb.collection('diary').create(formData);

      toast
        .promise(submitPromise, {
          loading: diaryId ? '일기 수정 중...' : '일기 저장 중...',
          success: diaryId
            ? '일기 수정을 완료했습니다!'
            : '일기 작성을 완료했습니다!',
          error: diaryId
            ? '일기 수정에 실패했습니다...'
            : '일기 작성에 실패했습니다...',
        })
        .then(() => {
          setIsSubmitting(false);
          sessionStorage.removeItem('autosave');
          navigate(`/home/calendar?date=${format(defaultTitle, 'yyyy-MM')}`);
        })
        .catch((error) => {
          console.error('[Error] 일기작성: ', error);
          setIsSubmitting(false);
        });
    },
    [
      diaryId,
      defaultTitle,
      userId,
      selectedMood,
      selectedEmotions,
      selectedWeathers,
      text,
      picture,
      navigate,
    ]
  );

  const deleteDiary = async (id, closeModal, onDelete) => {
    try {
      const post = await pb.collection('post').getFullList({
        filter: `requester_diary = "${id}" || recipient_diary = "${id}"`,
      });

      if (post.length > 0 && post.some((item) => item.status === 'accepted')) {
        toast.error('교환 중인 일기는 삭제할 수 없습니다 🙅‍♀️');
        if (closeModal) closeModal();
        return;
      }

      await toast.promise(pb.collection('diary').delete(id), {
        loading: '일기를 삭제하는 중입니다...⏳',
        success: '일기를 성공적으로 삭제했습니다.',
        error: '일기 삭제 중 오류가 발생했습니다. 다시 시도해주세요 😥',
      });

      if (closeModal) closeModal();
      if (onDelete) onDelete(id);
      navigate('/');
    } catch (error) {
      console.error('[error] 다이어리 삭제 실패: ', error);
      throw error;
    }

    // if (!onDelete) navigate('/');
  };

  const exchangeDiary = useCallback(
    async (buddy, closeModal) => {
      try {
        const existingRequest = await pb
          .collection('notification')
          .getFullList({
            filter: `recipient = "${buddy}" && requester = "${userId}" && type = "교환일기"`,
          });

        if (existingRequest.length > 0) {
          toast.error('이미 해당 사용자와 교환중인 일기가 있습니다.');
          return;
        }

        const post = await pb.collection('post').create({
          recipient: buddy,
          requester: userId,
          requester_diary: diaryDetail.id,
          status: 'pending',
        });

        await pb.collection('notification').create({
          recipient: buddy,
          requester: userId,
          type: '교환일기',
          type_id: post.id,
        });

        toast.success('일기 교환 신청을 보냈습니다!');
        if (closeModal) closeModal('buddyListModal');
      } catch (error) {
        toast.error('일기 교환 신청에 실패했습니다.');
        console.error(error);
      }
    },
    [diaryDetail, userId]
  );

  return {
    selectedMood,
    selectedEmotions,
    selectedWeathers,
    setSelectedEmotions,
    setSelectedWeathers,
    text,
    setText,
    picture,
    setPicture,
    setSelectedMood,
    handleEmotionClick,
    handleWeatherClick,
    isSubmitting,
    handleSubmit,
    deleteDiary,
    exchangeDiary,
  };
};

// Webp 변환 함수
const convertToWebP = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // Canvas를 사용하여 이미지 생성
    const img = await createImageBitmap(compressedFile);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // WebP 지원 여부 확인
    const isWebPSupported =
      canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

    if (isWebPSupported) {
      // WebP 지원되는 경우
      const webpBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.5);
      });
      return new File([webpBlob], 'image.webp', { type: 'image/webp' });
    } else {
      // WebP 지원되지 않는 경우 JPEG로 대체
      const jpegBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.5);
      });
      return new File([jpegBlob], 'image.jpg', { type: 'image/jpeg' });
    }
  } catch (error) {
    console.error('이미지 변환 중 오류 발생:', error);
    return file; // 변환에 실패하면 원본 파일 반환
  }
};

export default useDiaryActions;
