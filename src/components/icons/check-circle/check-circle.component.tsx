import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function CheckCircleIcon (props: IProps){
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm-1.999 14.413l-3.713-3.705L7.7 11.292l2.299 2.295l5.294-5.294l1.414 1.414l-6.706 6.706z"
        fill="currentColor"
      />
    </Icon>
  );
}
