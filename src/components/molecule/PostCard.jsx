import CheckIcon from '@/assets/icons/postcard/check.svg';
import DeleteIcon from '@/assets/icons/postcard/delete.svg';
import { PropTypes } from 'prop-types';

const PostCard = ({ type = 'postalert', text }) => {
  return (
    <div
      className={`w-full bg-white rounded-[14px] flex felx-row justify-between shadow-light ${
        type === 'postalert' ? 'p-[18px]' : 'p-[13px]'
      }`}
    >
      <span className="self-center block overflow-hidden text-base font-medium whitespace-nowrap text-ellipsis text-gray-450">
        {text}
      </span>
      {type === 'postalert' ? (
        <div className="flex flex-row gap-[15px] ml-[1px] ">
          <button type="button" className="w-[22px] h-[22px]" aria-label="확인">
            <img src={CheckIcon}></img>
          </button>
          <button type="button" className="w-[22px] h-[22px]" aria-label="삭제">
            <img src={DeleteIcon}></img>
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-[10px] ml-1">
          <button
            type="button"
            className="text-white bg-blue-500 w-12 px-[10px] py-[5px] rounded-[5px]"
          >
            수락
          </button>
          <button
            type="button"
            className="text-white bg-red w-12 px-[10px] py-[5px] rounded-[5px]"
          >
            거절
          </button>
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  type: PropTypes.oneOf(['postalert', 'bestfriendconfirm']),
  text: PropTypes.string.isRequired,
};

export default PostCard;
