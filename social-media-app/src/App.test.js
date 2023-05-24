import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders Welcome to Postbook text", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const textElement = screen.getByText(/Welcome to Postbook!/i);
  expect(textElement).toBeInTheDocument();
});
