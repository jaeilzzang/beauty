import { useState } from "react";

/**
 *
 * modal state 일괄적으로 관리하기 위해
 */
const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return {
    open,
    setOpen,
    handleOpen,
  };
};

export default useModal;
