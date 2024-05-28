import { useState } from 'react';

type HookProps = {
  defaultValue?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const useToggle = ({ onOpen = () => { }, onClose = () => { }, defaultValue = false }: HookProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggler = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    if (nextIsOpen) onOpen();
    else onClose();
  };

  return { isOpen, toggler };
};

export default useToggle;
