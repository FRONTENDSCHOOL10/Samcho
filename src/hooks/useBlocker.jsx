import { useEffect, useCallback } from 'react';
import { useBlocker as useBlockerCore, useLocation } from 'react-router-dom';
import useModal from './useModal';
import { Button, Modal } from '@/components';

const useBlocker = (when, alertOptions) => {
  const {
    state,
    location: nextLocation,
    reset,
    proceed,
  } = useBlockerCore(when);
  const currentLocation = useLocation();
  const { isOpen, openModal, closeModal } = useModal();

  const handleProceed = useCallback(() => {
    proceed();
    closeModal('confirmLeave');
  }, [proceed, closeModal]);

  const handleReset = useCallback(() => {
    reset();
    closeModal('confirmLeave');
  }, [reset, closeModal]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, state, currentLocation, nextLocation]);

  useEffect(() => {
    if (state === 'blocked') {
      openModal('confirmLeave');
    } else {
      closeModal('confirmLeave');
    }
  }, [state, openModal, closeModal]);

  const renderPrompt = useCallback(
    () => (
      <Modal
        isOpen={isOpen('confirmLeave')}
        closeModal={handleReset}
        showCloseButton={false}
      >
        <div className="flex flex-col gap-5">
          <p className="text-center whitespace-pre-wrap">
            {alertOptions?.message}
          </p>
          <div className="flex items-center justify-center w-full gap-3">
            <Button
              type="secondary"
              text="취소"
              onClick={handleReset}
              className="flex-1"
            />
            <Button
              type="primary"
              text="뒤로가기"
              onClick={handleProceed}
              className="flex-1"
            />
          </div>
        </div>
      </Modal>
    ),
    [alertOptions?.message, isOpen, handleProceed, handleReset]
  );

  return { state, reset, proceed, renderPrompt };
};

export default useBlocker;
