import dynamic from 'next/dynamic';
import { useState } from 'react';

// Import ReactQuill dynamically with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <ReactQuill value={value} onChange={setValue} />
  );
};

export default MyComponent;