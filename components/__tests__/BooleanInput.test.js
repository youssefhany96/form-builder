import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooleanInput from '../BooleanInput';

describe('BooleanInput', () => {
  it('renders correctly', () => {
    render(<BooleanInput id="bool" label="Yes/No" value={false} onChange={() => {}} />);
    expect(screen.getByLabelText(/yes\/no/i)).toBeInTheDocument();
  });

  it('handles checkbox toggle', () => {
    const handleChange = jest.fn();
    render(<BooleanInput id="bool" label="Yes/No" value={false} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText(/yes\/no/i));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
