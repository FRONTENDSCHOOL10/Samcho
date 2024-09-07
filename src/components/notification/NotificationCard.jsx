import BuddyIcon from '@/assets/icons/notification/buddy.svg';
import ExchangeDiaryIcon from '@/assets/icons/notification/exchangediary.svg';
import { PropTypes } from 'prop-types';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  parse,
  isValid,
} from 'date-fns';

const NotificationCard = ({
  type = 'buddyRequest',
  buddyName = 'buddy',
  notificationTime,
}) => {
  const now = new Date();

  // 'yyyy-MM-dd HH:mm:ss' 형식의 날짜 문자열을 Date 객체로 변환
  const parsedNotificationTime = parse(
    notificationTime,
    'yyyy-MM-dd HH:mm:ss',
    new Date()
  );

  // 날짜가 유효한지 검사
  if (!isValid(parsedNotificationTime)) {
    return <div>잘못된 날짜 형식입니다.</div>;
  }

  const minutesDifference = differenceInMinutes(now, parsedNotificationTime);
  const hoursDifference = differenceInHours(now, parsedNotificationTime);
  const daysDifference = differenceInDays(now, parsedNotificationTime);
  const weeksDifference = differenceInWeeks(now, parsedNotificationTime);

  let timeAgoText;

  if (minutesDifference < 1) {
    timeAgoText = '방금 전';
  } else if (minutesDifference < 60) {
    timeAgoText = `${minutesDifference}분 전`;
  } else if (hoursDifference < 24) {
    timeAgoText = `${hoursDifference}시간 전`;
  } else if (daysDifference < 7) {
    timeAgoText = `${daysDifference}일 전`;
  } else {
    timeAgoText = `${weeksDifference}주 전`;
  }

  return (
    <section className="flex flex-col gap-[10px] bg-white p-[15px] rounded-[10px] shadow-light">
      <h2>
        {type === 'buddyRequest' ? (
          <>
            <span className="sr-only">단짝 신청</span>
            <img src={BuddyIcon} alt="단짝 신청 아이콘" />
          </>
        ) : (
          <>
            <span className="sr-only">교환일기 신청</span>
            <img src={ExchangeDiaryIcon} alt="교환일기 신청 아이콘" />
          </>
        )}
      </h2>
      <div className="overflow-hidden text-base font-medium text-gray-450 text-ellipsis whitespace-nowrap">
        <strong>{buddyName}</strong>님이{' '}
        <strong>{type === 'buddyRequest' ? '단짝' : '교환일기'}</strong> 신청을
        하셨습니다.
      </div>
      <div className="flex flex-row justify-between">
        <span className="text-sm font-medium text-gray-300">{timeAgoText}</span>
        <div className="flex flex-row gap-[10px]">
          <button type="button" className="text-base font-bold text-blue-500">
            수락
          </button>
          <button type="button" className="text-base font-bold text-red">
            거절
          </button>
        </div>
      </div>
    </section>
  );
};

NotificationCard.propTypes = {
  type: PropTypes.oneOf(['buddyRequest', 'exchangeRequest']),
  buddyName: PropTypes.string,
  notificationTime: PropTypes.string.isRequired,
};

export default NotificationCard;
