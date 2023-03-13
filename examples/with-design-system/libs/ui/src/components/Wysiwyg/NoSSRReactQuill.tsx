import dynamic from 'next/dynamic';

const NoSSRReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default NoSSRReactQuill;
