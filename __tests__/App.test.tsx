import { render } from "@testing-library/react-native"
import App from "../App";

describe('Home Screen', () => {
  it("should show Text", () => {
    const { getByText } = render(<App />)

    expect(getByText("Hola!")).toBeTruthy();
  })
});