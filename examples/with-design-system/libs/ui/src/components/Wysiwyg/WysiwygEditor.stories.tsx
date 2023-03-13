import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WysiwygEditor as WYSIWYGEditor } from './WysiwygEditor';
import 'react-quill/dist/quill.snow.css';

export default {
  title: 'Organisms/WysiwygEditor',
  component: WYSIWYGEditor,
} as ComponentMeta<typeof WYSIWYGEditor>;

const Template: ComponentStory<typeof WYSIWYGEditor> = (args) => (
  <WYSIWYGEditor {...args} />
);

export const WysiwygEditor = Template.bind({});

WysiwygEditor.args = {
  value: `<h1>Quill Rich Text Editor</h1> <p> <br> </p> <p>Quill is a free, <a href="https://github.com/quilljs/quill/" target="_blank">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a> and a <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a> you can completely customize it to fulfill your needs. Some built in features include:</p> <p> <br> </p> <ul> <li>Fast and lightweight</li> <li>Semantic markup</li> <li>Standardized HTML between browsers</li> <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li> </ul> <p> <h3>Downloads</h3> </p> <p> <br> </p> <ul> <li> <a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li> <li> <a href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li> </ul>`,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  },
};
