import { Calendar, Chart, Letter, Pencil, User } from '@/assets/icons/gnb';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../';

const Footer = () => {
  const currentUrl = useLocation().pathname;
  const getLinkClassName = (path) => {
    return currentUrl.startsWith(path) ? 'fill-blue-500' : 'fill-gray-300';
  };

  if (currentUrl === '/diary/new') {
    return (
      <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-3 z-50 shadow-top -mx-5 px-5">
        <Button text="작성완료" size="large" />
      </footer>
    );
  }

  if (currentUrl.startsWith('/diary/detail')) {
    return (
      <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5 px-5">
        <Button text="교환하기" size="large" />
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5">
      <nav className="flex items-center justify-around">
        <h2 className="sr-only">메뉴 내비게이션</h2>
        <Link to={'/'} title="홈">
          <Calendar className={`cursor-pointer ${getLinkClassName('/home')}`} />
        </Link>
        <Link to={'/chart'} title="통계">
          <Chart className={`cursor-pointer ${getLinkClassName('/chart')}`} />
        </Link>
        <Link to={'/diary/new'} title="일기작성">
          <Pencil className="cursor-pointer fill-gray-300" />
        </Link>
        <Link to={'/post'} title="우편함">
          <Letter className={`cursor-pointer ${getLinkClassName('/post')}`} />
        </Link>
        <Link to={'/mypage'} title="내정보">
          <User className={`cursor-pointer ${getLinkClassName('/mypage')}`} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
