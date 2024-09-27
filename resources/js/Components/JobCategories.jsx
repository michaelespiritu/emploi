import { forwardRef, useEffect, useRef } from 'react';
import Select from './Select';

export default forwardRef(function JobCategories({ type = 'text', className = '', isFocused = false, categories, ...props }, ref) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <Select
      { ...props }
      type={ type }
      className={
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
        className
      }
      ref={ input }
      options={ categories }
    />
  );
});
