// hooks/useModal.js
import { useState, useCallback } from 'react';

const useModal = () => {
  const [openModals, setOpenModals] = useState({});

  const openModal = useCallback((id) => {
    setOpenModals((prev) => ({ ...prev, [id]: true }));
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback((id) => {
    setOpenModals((prev) => {
      const newModals = { ...prev, [id]: false };
      if (!Object.values(newModals).some((isOpen) => isOpen)) {
        document.body.style.overflow = 'auto';
      }
      return newModals;
    });
  }, []);

  const isOpen = (id) => !!openModals[id];

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
