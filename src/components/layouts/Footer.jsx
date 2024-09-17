import { Calendar, Chart, Letter, Pencil, User } from '@/assets/icons/gnb';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { pb } from '@/api';
import { authUtils } from '@/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const navigate = useNavigate();

  const currentUrl = useLocation().pathname;
  const getLinkClassName = (path) => {
    return currentUrl.startsWith(path) ? 'fill-blue-500' : 'fill-gray-300';
  };

  const handleWriteDiary = async (e) => {
    e.preventDefault();

    const userId = authUtils.getAuth().user.id;
    const date = format(new Date(), 'yyyy-MM-dd');

    try {
      const data = await pb.collection('diary').getFullList({
        filter: `user = "${userId}" && date = "${date} 00:00:00.000Z"`,
      });

      if (data.length > 0) {
        toast.dismiss();
        toast.error('오늘 일기는 이미 작성하셨습니다.');
        return;
      }
    } catch (error) {
      console.error('서버 통신중 에러 발생', error);
    }
    navigate('/diary/new');
  };

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
        <Link to={'/diary/new'} onClick={handleWriteDiary} title="일기작성">
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

export default memo(Footer);
