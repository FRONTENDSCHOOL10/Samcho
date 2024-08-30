import { Calendar, Chart, Letter, Pencil, User } from '@/assets/icons/gnb';
import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-light">
      <nav className="flex items-center justify-around">
        <Calendar className="cursor-pointer fill-blue-500" />
        <Chart className="cursor-pointer fill-gray-300" />
        <Letter className="cursor-pointer fill-gray-300" />
        <Pencil className="cursor-pointer fill-gray-300" />
        <User className="cursor-pointer fill-gray-300" />
        <DayCircle className="fill-blue" />
      </nav>
    </footer>
  );
};

export default Footer;
