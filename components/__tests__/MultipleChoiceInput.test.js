import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultipleChoiceInput from '../MultipleChoiceInput';

describe('MultipleChoiceInput', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ];

  it('renders correctly', () => {
    render(<MultipleChoiceInput id="test" label="Test Multiple Choice" options={options} onChange={() => {}} />);
    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('handles option selection', () => {
    const handleChange = jest.fn();
    render(<MultipleChoiceInput id="test" label="Test Multiple Choice" options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText(options[1].label));
    expect(handleChange).toHaveBeenCalledWith(options[1].value);
  });
});
