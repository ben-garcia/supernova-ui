import { Meta } from '@storybook/react';
import React from 'react';

import { Button } from '../../atoms';
import { useNotification } from '../../../hooks';

export default {
  title: 'Supernova UI/Molecules/Notification',
} as Meta;

export const Positions = () => {
  const notification = useNotification();

  const handleBottom = () => {
    notification({
      message: 'my message',
      position: 'bottom',
      title: 'bottom',
    });
  };
  const handleBottomLeft = () => {
    notification({
      message: 'my message',
      position: 'bottom-left',
      title: 'bottom-left',
    });
  };
  const handleBottomRight = () => {
    notification({
      message: 'my message',
      position: 'bottom-right',
      title: 'bottom-right',
    });
  };
  const handleTop = () => {
    notification({
      message: 'my message',
      position: 'top',
      title: 'top',
    });
  };
  const handleTopLeft = () => {
    notification({
      message: 'my message',
      position: 'top-left',
      title: 'top left',
    });
  };
  const handleTopRight = () => {
    notification({
      message: 'my message',
      position: 'top-right',
      title: 'top right',
    });
  };

  return (
    <div style={{ position: 'relative', zIndex: 99999 }}>
      <Button onClick={handleBottom}>bottom</Button>
      <Button onClick={handleBottomLeft}>bottom-left</Button>
      <Button onClick={handleBottomRight}>bottom-right</Button>
      <Button onClick={handleTop}>top</Button>
      <Button onClick={handleTopLeft}>top-left</Button>
      <Button onClick={handleTopRight}>top-right</Button>
    </div>
  );
};

export const CustomTemplate = () => {
  const notification = useNotification();

  const handleTemplate = () => {
    notification({
      backgroundColor: 'orange',
      message: 'warning message',
      render: onClose => (
        <div className="snui-flex snui-padding-sm">
          <Button
            backgroundColor="transparent"
            boxShadow="0"
            hoverBackgroundColor="transparent"
            onClick={onClose}
          >
            X
          </Button>
          <div className="snui-flex snui-flex-column">
            <p>custom title</p>
            <p>custom message</p>
          </div>
        </div>
      ),
      status: 'warning',
      title: 'Warning',
    });
  };

  return <Button onClick={handleTemplate}>custom</Button>;
};

export const Status = () => {
  const notification = useNotification();

  const handleError = () => {
    notification({
      message: 'error message',
      status: 'error',
      title: 'Error',
    });
  };
  const handleInfo = () => {
    notification({
      message: 'info message',
      title: 'Info',
    });
  };
  const handleSuccess = () => {
    notification({
      message: 'success message',
      status: 'success',
      title: 'Success',
    });
  };
  const handleWarning = () => {
    notification({
      message: 'warning message',
      status: 'warning',
      title: 'Warning',
    });
  };

  return (
    <>
      <Button
        backgroundColor="error600"
        hoverBackgroundColor="error800"
        onClick={handleError}
      >
        error
      </Button>
      <Button
        backgroundColor="success600"
        hoverBackgroundColor="success800"
        onClick={handleSuccess}
      >
        success
      </Button>
      <Button onClick={handleInfo}>info</Button>
      <Button
        backgroundColor="warning600"
        hoverBackgroundColor="warning800"
        onClick={handleWarning}
      >
        warning
      </Button>
    </>
  );
};
