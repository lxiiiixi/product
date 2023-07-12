import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const closeModal: () => void = () => {
    setOpen(false);
  };
  const openModal: () => void = () => {
    setOpen(true);
  };
  //   return [open as boolean, openModal as () => void, closeModal as () => void];
  return {
    open: open as boolean,
    openModal: openModal as () => void,
    closeModal: closeModal as () => void
  };
};
