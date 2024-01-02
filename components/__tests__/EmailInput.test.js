// components/__tests__/EmailInput.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmailInput from "../EmailInput";

describe("EmailInput", () => {
  it("renders the email input component", () => {
    render(
      <EmailInput
        id="test-email"
        label="Test Email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Test Email")).toBeInTheDocument();
  });

  it("calls onChange handler when the email is changed", () => {
    const handleChange = jest.fn();
    render(
      <EmailInput
        id="test-email"
        label="Test Email"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText("Test Email"), {
      target: { value: "user@example.com" },
    });
    expect(handleChange).toHaveBeenCalledWith("user@example.com");
  });
});
