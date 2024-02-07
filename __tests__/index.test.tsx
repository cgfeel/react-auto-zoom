import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from 'react';
import App from "../src/App";

test('button test', () => {
    render(<App />);
    const element = screen.getByText(/Hello word/i);
    expect(element).toHaveTextContent('click');
});
