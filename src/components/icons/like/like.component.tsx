import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function LikeIcon(props: IProps) {
	return (
		<Icon viewBox="0 0 24 24" {...props}>
			<path
				d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"
				fill="currentColor"
			/>
		</Icon>
	);
}
