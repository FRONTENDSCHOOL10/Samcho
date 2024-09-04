import PropTypes from 'prop-types';

const emotions = {
  신나는: '/icons/emotions/popper.png',
  편안한: '/icons/emotions/comfortable.png',
  뿌듯한: '/icons/emotions/proud.png',
  기대되는: '/icons/emotions/gift.png',
  행복한: '/icons/emotions/flower.png',
  의욕적인: '/icons/emotions/motivation.png',
  설레는: '/icons/emotions/ballon.png',
  상쾌한: '/icons/emotions/juice.png',
  차분한: '/icons/emotions/calm.png',
  감사한: '/icons/emotions/thankful.png',
  우울한: '/icons/emotions/gloomy.png',
  외로운: '/icons/emotions/leaves.png',
  불안한: '/icons/emotions/anxious.png',
  슬픈: '/icons/emotions/tears.png',
  화난: '/icons/emotions/volcano.png',
  부담되는: '/icons/emotions/pressure.png',
  짜증나는: '/icons/emotions/annoyed.png',
  피곤한: '/icons/emotions/tired.png',
  스트레스: '/icons/emotions/stressful.png',
  답답한: '/icons/emotions/hoguma.png',
};

const IconRankMoreList = ({ rank = 1, emotion = '신나는', count = 0 }) => {
  return (
    <section className="flex w-full p-2 items-center gap-[15px]">
      <h2
        className="w-6 text-lg font-semibold text-left text-blue-500"
        aria-label={`순위 ${rank}위`}
      >
        <span aria-hidden="true">{rank}</span>
      </h2>
      <figure className="flex flex-row gap-[15px] items-start content-center text-blue-500 text-sm font-medium">
        <img
          src={emotions[emotion]}
          className="w-10 h-10"
          alt={`${emotion} 상태를 나타내는 아이콘`}
        />
        <figcaption className="flex flex-col gap-[5px]">
          <span>{emotion}</span>
          <span aria-label="이 감정이 기록된 횟수">{`${count}회`}</span>
        </figcaption>
      </figure>
    </section>
  );
};

IconRankMoreList.propTypes = {
  rank: PropTypes.number,
  emotion: PropTypes.string,
  count: PropTypes.number,
};

export default IconRankMoreList;
