import React, { useState, useActionState } from 'react';
import {useFormStatus} from "react-dom";

const R19Form = () => {
  const submitAction = async (prevState, formData) => {
    console.log(prevState, formData);

    const name = formData.get('name');
    const comment = formData.get('comment');

    //TODO some logic with data

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('Form submitted:', { name, comment });
    
    return {
      success: true,
      message: 'Form submitted successfully!'
    };
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    success: false,
    message: ''
  });

  return (
    <div>
      <h2>React 19 Form (Actions)</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
          />
        </div>
        
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            required
          />
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>

        <FormStatus/>
      </form>
      
      {state.success && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {state.message}
        </div>
      )}
    </div>
  );
};

const FormStatus = () => {
  const status = useFormStatus()

  return (
      <div>
        {status.pending ? 'it is doing something...' : 'Idle'}
      </div>
  )
}

export default R19Form;