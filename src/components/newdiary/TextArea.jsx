import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const TextArea = ({ text, setText }) => {
  const textarea = useRef(null);
  const maxLength = 200;

  const textAreaClasses =
    text.length == maxLength ? 'text-blue-500 font-semibold' : '';

  const onChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setText('');
    } else {
      setText(value);
    }
  };

  useEffect(() => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }, [text]);

  return (
    <div className="flex flex-col gap-[0.9375rem] w-full px-5 py-[0.9375rem] bg-white rounded-[0.94rem] shadow-light">
      <div className="flex justify-between w-full">
        <span className="text-base font-semibold text-gray-450">한줄일기</span>
        <span className="text-sm text-gray-400">
          <span className={textAreaClasses}>{text.length}</span> / {maxLength}
        </span>
      </div>
      <textarea
        ref={textarea}
        value={text}
        onChange={onChange}
        className="w-full min-h-[50px] max-h-[232px] p-3 border border-blue-100 bg-blue-10 rounded-[0.375rem] resize-none content-center placeholder:text-blue-300 text-blue-500 outline-none focus:border-blue-500"
        placeholder="일기를 작성해주세요."
        maxLength={maxLength}
        rows={1}
      />
    </div>
  );
};

TextArea.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
};

export default TextArea;
