// components/__tests__/MultiSelectInput.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MultiSelectInput from '../MultiSelectInput';

describe('MultiSelectInput', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the multi-select input component with options', () => {
    render(<MultiSelectInput id="test" label="Test Select" options={options} value={[]} onChange={() => {}} />);
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles multiple selection changes', () => {
    const handleChange = jest.fn();
    render(<MultiSelectInput id="test" label="Test Select" options={options} value={['option1']} onChange={handleChange} />);

    const select = screen.getByLabelText('Test Select');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledWith(['option2']);
  });
});
