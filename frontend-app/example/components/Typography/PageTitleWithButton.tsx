import React from 'react';
import { Button } from '@roketid/windmill-react-ui';

interface IPageTitleWithButton {
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  buttonClassName?: string;
}

const PageTitleWithButton: React.FC<IPageTitleWithButton> = ({
  children,
  buttonText,
  onButtonClick,
  buttonClassName = '',
}) => {
  return (
    <div className="flex items-center justify-between my-6">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {children}
      </h1>
      <Button className={buttonClassName} onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default PageTitleWithButton;

