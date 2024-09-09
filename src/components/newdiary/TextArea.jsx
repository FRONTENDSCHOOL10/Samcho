import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ text, setText }) => {
  const textarea = useRef(null);

  const onChange = (e) => {
    const value = e.target.value;
    if (textarea.current.scrollHeight >= 184) {
      alert('최대 6줄까지 작성을 할 수 있습니다.');
      return;
    }
    setText(value);
  };

  useEffect(() => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }, [text]);

  return (
    <div className="flex flex-col gap-[0.9375rem] w-full px-5 py-[0.9375rem] bg-white rounded-[0.94rem] shadow-light">
      <span className="text-base font-semibold text-gray-450">한줄일기</span>
      <textarea
        ref={textarea}
        value={text}
        onChange={onChange}
        className="w-full min-h-[50px] max-h-[232px] p-2 border border-blue-100 bg-blue-10 rounded-[0.375rem] resize-none content-center placeholder:text-blue-500 text-blue-500 outline-none focus:border-blue-500"
        placeholder="일기를 작성해주세요."
        maxLength="200"
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
