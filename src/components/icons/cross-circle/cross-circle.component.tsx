import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function CrossCircleIcon (props: IProps){
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8l-1.4 1.4z"
        fill="currentColor"
      />
    </Icon>
  );
}
