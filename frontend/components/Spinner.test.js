// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import Spinner from "./Spinner"
import { render } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect'

test('Spinner renders when "on" is true', () => {
  // Render the Spinner component with "on" prop set to true
  const { getByText } = render(<Spinner on={true} />);

  // Check if the spinner is rendered (h3 element with "Please wait..." text)
  const spinnerElement = getByText(/Please wait.../i); // Using a regex to match case-insensitively
  expect(spinnerElement).toBeInTheDocument();
});

test('Spinner does not render when "on" is false', () => {
  // Render the Spinner component with "on" prop set to false
  const { queryByText } = render(<Spinner on={false} />);

  // Check that the spinner is not rendered (h3 element with "Please wait..." text is not in the document)
  const spinnerElement = queryByText(/Please wait.../i);
  expect(spinnerElement).not.toBeInTheDocument();
});



