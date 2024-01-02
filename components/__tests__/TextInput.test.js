import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  it('renders the text input component', () => {
    render(<TextInput id="test" label="Test Input" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('calls onChange handler when the input value is changed', () => {
    const handleChange = jest.fn();
    render(<TextInput id="test" label="Test Input" value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByLabelText('Test Input'), { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalledWith('new text');
  });
});
