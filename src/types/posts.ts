import { JSXElementConstructor, ReactElement } from 'react';

export type PostMeta = {
	content?: ReactElement<any, string | JSXElementConstructor<any>>;
	date: string;
	id: string;
	tags: string[];
	title: string;
};
