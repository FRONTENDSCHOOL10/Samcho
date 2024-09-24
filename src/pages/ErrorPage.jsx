import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

const ERROR_404_HEADER = `죄송합니다.\n현재 찾을 수 없는 페이지를\n요청하셨습니다.`;
const ERROR_404_PHRASE = `페이지의 주소가 잘못 입력되었거나,\n주소가 변경 혹은 삭제되어\n요청하신 페이지를 찾을 수 없습니다`;

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main
      className="flex flex-col items-center justify-center w-full h-screen gap-10 px-12"
      aria-label="페이지를 찾을 수 없음"
    >
      <img src="/errormong.webp" alt="에러 페이지 안내 이미지" />
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-bold text-center whitespace-pre-wrap text-blue">
          {ERROR_404_HEADER}
        </h1>
        <p className="text-sm font-medium text-center whitespace-pre-wrap">
          {ERROR_404_PHRASE}
        </p>
      </div>

      <div className="flex w-full justify-evenly">
        <Button
          text="이전으로"
          type="secondary"
          className="flex-1"
          onClick={handleGoBack}
          aria-label="이전 페이지로 이동"
        />
        <Button
          text="메인으로"
          type="primary"
          className="flex-1"
          to="/"
          aria-label="메인 페이지로 이동"
        />
      </div>
    </main>
  );
};

export default ErrorPage;
