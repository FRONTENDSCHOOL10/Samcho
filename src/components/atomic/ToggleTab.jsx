import PropTypes from 'prop-types';

const ToggleTab = ({
  tab1 = '알림',
  tab2 = '교환일기',
  activeTab,
  onTab1Click,
  onTab2Click,
}) => {
  const handleTab1Click = () => {
    setActiveTab('tab1');
  };

  const handleTab2Click = () => {
    setActiveTab('tab2');
  };

  const buttonBaseClasses =
    'flex items-center justify-center h-full text-center min-w-[60px]';

  return (
    <>
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
          aria-selected={activeTab === 'tab1'}
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
          aria-selected={activeTab === 'tab2'}
        >
          {tab2}
        </button>
      </div>
    </>
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
