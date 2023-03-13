import { ReactQuillProps } from 'react-quill';
import { FC } from 'react';
import NoSSRReactQuill from './NoSSRReactQuill';

export const WysiwygEditor: FC<ReactQuillProps> = (props) => {
  return <NoSSRReactQuill {...props} theme="snow" />;
};
