import { Calendar, Chart, Letter, Pencil, User } from '@/assets/icons/gnb';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../';

const Footer = () => {
  const currentUrl = useLocation().pathname;
  console.log(currentUrl);
  const getLinkClassName = (path) => {
    return currentUrl === path ? 'fill-blue-500' : 'fill-gray-300';
  };

  if (currentUrl === '/diary/new') {
    return (
      <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5 px-5">
        <Button text="작성완료" size="large" />
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5">
      <nav className="flex items-center justify-around">
        <Link to={'/'}>
          <Calendar className={`cursor-pointer ${getLinkClassName('/')}`} />
        </Link>
        <Link to={'/chart'}>
          <Chart className={`cursor-pointer ${getLinkClassName('/chart')}`} />
        </Link>
        <Link to={'/diary/new'}>
          <Pencil className={`cursor-pointer fill-gray-300`} />
        </Link>
        <Link to={'/post'}>
          <Letter className={`cursor-pointer ${getLinkClassName('/post')}`} />
        </Link>
        <Link to={'/mypage'}>
          <User className={`cursor-pointer ${getLinkClassName('/mypage')}`} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
