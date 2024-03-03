import { act, fireEvent, screen } from "@testing-library/react";

export const fillInputByPlaceholder = (placeholder: string, value: string) => {
  const input = screen.getByPlaceholderText(placeholder);

  act(() => {
    fireEvent.change(input, { target: { value } });
  });
};
