import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhoneInput from '../PhoneInput';

describe('PhoneInput', () => {
  it('renders correctly', () => {
    render(<PhoneInput id="phone" label="Phone Number" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<PhoneInput id="phone" label="Phone Number" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    expect(handleChange).toHaveBeenCalledWith('phone', '1234567890');
  });
});
