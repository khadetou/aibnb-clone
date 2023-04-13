import { FC, ReactElement } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionlabel: string;
}

const Modal: FC<ModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  secondaryActionlabel,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  title,
}) => {
  return <div>Modal</div>;
};

export default Modal;
