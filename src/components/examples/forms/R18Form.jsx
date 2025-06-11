import React, { useState } from 'react';

const R18Form = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //TODO some logic with data
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('Form submitted:', { name, comment });
    setName('');
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2>React 18 Form (useState)</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        <FormStatus isSubmitting={isSubmitting}/>
      </form>
    </div>
  );
};

const FormStatus = (props) => {
  return (
      <div>
        {props.isSubmitting ? 'it is doing something...' : 'Idle'}
      </div>
  )
}

export default R18Form;