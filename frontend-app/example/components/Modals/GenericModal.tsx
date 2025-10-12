import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@roketid/windmill-react-ui';

interface FooterButton {
  text: string;
  onClick: () => void;
  layout?: 'outline' | 'primary';
  fullWidth?: boolean;
}

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  body: React.ReactNode;
  footerButtons?: FooterButton[];
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footerButtons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      {footerButtons && footerButtons.length > 0 && (
        <ModalFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
          {footerButtons.map((btn, idx) => (
            <Button
              key={idx}
              layout={btn.layout || 'primary'}
              onClick={btn.onClick}
              className={`${btn.fullWidth ? 'w-full sm:w-auto' : ''}`}
            >
              {btn.text}
            </Button>
          ))}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default GenericModal;
