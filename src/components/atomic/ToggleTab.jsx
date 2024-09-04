// 사용 시 주의 사항
// tab 변경에 의해 보여지는 콘텐츠에 id, role, aria-labelledby를 추가해줘야 함.
// 예시 그대로 추가하면 됨.
// ex. tab1 콘텐츠 : id="panel-1" role="tabpanel" aria-labelledby="tab-1"
// ex. tab2 콘텐츠 : id="panel-2" role="tabpanel" aria-labelledby="tab-2"

import PropTypes from 'prop-types';

const ToggleTab = ({
  tab1 = '알림',
  tab2 = '교환일기',
  activeTab,
  onTab1Click,
  onTab2Click,
}) => {
  const buttonBaseClasses =
    'flex items-center justify-center h-full text-center min-w-[60px]';

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
        aria-controls="panel-1"
        aria-selected={activeTab === 'tab1'}
        id="tab-1"
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
        aria-controls="panel-2"
        aria-selected={activeTab === 'tab2'}
        id="tab-2"
      >
        {tab2}
      </button>
    </div>
  );
};

ToggleTab.propTypes = {
  tab1: PropTypes.string,
  tab2: PropTypes.string,
  activeTab: PropTypes.string.isRequired,
  onTab1Click: PropTypes.func.isRequired,
  onTab2Click: PropTypes.func.isRequired,
};

export default ToggleTab;
