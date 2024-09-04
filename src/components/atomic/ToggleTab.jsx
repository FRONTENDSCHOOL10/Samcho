// 사용 시 주의 사항
// tab 변경에 의해 보여지는 콘텐츠에 id, role, aria-labelledby를 추가해줘야 함.
// 예시 그대로 추가하면 됨.
// ex. 알림 : id="panel-notification" role="tabpanel" aria-labelledby="tab-notification"
// ex. 교환일기 : id="panel-exchangeDiaryList" role="tabpanel" aria-labelledby="tab-exchangeDiaryList"
// ex. 나의 단짝 : id="panel-buddyList" role="tabpanel" aria-labelledby="tab-buddyList"
// ex. 단짝 요청 : id="panel-buddyRequest" role="tabpanel" aria-labelledby="tab-buddyRequest"

import PropTypes from 'prop-types';

const buttonBaseClasses =
  'flex items-center justify-center h-full text-center min-w-[60px]';

const ToggleTab = ({
  tab1 = '알림',
  tab2 = '교환일기',
  activeTab,
  onTab1Click,
  onTab2Click,
}) => {
  // tab1에 대한 id 설정
  let tab1Id;
  switch (tab1) {
    case '알림':
      tab1Id = 'notification';
      break;
    case '나의 단짝':
      tab1Id = 'buddyList';
      break;
    default:
      tab1Id = 'notification';
  }

  // tab2에 대한 id 설정
  let tab2Id;
  switch (tab2) {
    case '교환일기':
      tab2Id = 'exchangeDiaryList';
      break;
    case '단짝 요청':
      tab2Id = 'buddyRequest';
      break;
    default:
      tab2Id = 'exchangeDiaryList';
  }

  return (
    <div
      className="flex flex-row gap-10 text-[18px] h-[21px] justify-center items-center"
      role="tablist"
    >
      <button
        type="button"
        className={`${buttonBaseClasses} ${
          activeTab === 'tab1'
            ? 'text-blue-500 font-bold'
            : 'font-medium text-gray-300'
        }`}
        onClick={onTab1Click}
        role="tab"
        aria-controls={`panel-${tab1Id}`}
        aria-selected={activeTab === 'tab1'}
        id={`tab-${tab1Id}`}
      >
        {tab1}
      </button>
      <button
        type="button"
        className={`${buttonBaseClasses} ${
          activeTab === 'tab2'
            ? 'text-blue-500 font-bold'
            : 'font-medium text-gray-300'
        }`}
        onClick={onTab2Click}
        role="tab"
        aria-controls={`panel-${tab2Id}`}
        aria-selected={activeTab === 'tab2'}
        id={`tab-${tab2Id}`}
      >
        {tab2}
      </button>
    </div>
  );
};

ToggleTab.propTypes = {
  tab1: PropTypes.oneOf[('알림', '나의 단짝')],
  tab2: PropTypes.oneOf[('교환일기', '단짝 요청')],
  activeTab: PropTypes.string.isRequired,
  onTab1Click: PropTypes.func.isRequired,
  onTab2Click: PropTypes.func.isRequired,
};

export default ToggleTab;
