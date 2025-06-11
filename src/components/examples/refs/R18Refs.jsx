import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const R18Refs = () => {
  const inputRef = useRef(null);
  const customRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const callCustomMethod = () => {
    customRef.current?.customMethod();
  };

  return (
    <div>
      <h2>React 18 Refs (forwardRef)</h2>
      
      <div>
        <h3>Basic Input Ref</h3>
        <BasicInput ref={inputRef} placeholder="Basic input with ref" />
        <button onClick={focusInput}>Focus Input</button>
      </div>

      <div>
        <h3>Custom Component with useImperativeHandle</h3>
        <CustomComponent ref={customRef} />
        <button onClick={callCustomMethod}>Call Custom Method</button>
      </div>
    </div>
  );
};

// Basic forwardRef component
const BasicInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ margin: '10px', padding: '5px' }}
      {...props}
    />
  );
});

BasicInput.displayName = 'BasicInput';

// Complex component with useImperativeHandle
const CustomComponent = forwardRef((props, ref) => {
  const internalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    customMethod: () => {
      console.log('Custom method called from R18!');
      internalRef.current?.focus();
    },
    getValue: () => internalRef.current?.value,
    reset: () => {
      if (internalRef.current) {
        internalRef.current.value = '';
      }
    }
  }));

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <p>Custom component with imperative handle</p>
      <input
        ref={internalRef}
        type="text"
        placeholder="Internal input"
        style={{ padding: '5px' }}
      />
    </div>
  );
});

CustomComponent.displayName = 'CustomComponent';

export default R18Refs;