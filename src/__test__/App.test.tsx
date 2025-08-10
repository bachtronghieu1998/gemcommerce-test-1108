import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Counter from "../component/counter/index";

describe("Counter test common", () => {
  const { getAllByTestId } = render(<Counter type="percent" />);
  const input = getAllByTestId("input")[0] as HTMLInputElement;
  const plusButton = getAllByTestId("plus-button")[0];
  const minusButton = getAllByTestId("minus-button")[0];

  it("renders with default value", () => {
    expect(input.value).toBe("0");
  });

  it("increments value when plus button is clicked", () => {
    fireEvent.click(plusButton);
    expect(input.value).toBe("1");
  });

  it("decrements value when minus button is clicked", () => {
    input.value = "1"; // Set initial value to 1
    fireEvent.click(minusButton);
    expect(input.value).toBe("0");
  });

  it("input has comma", () => {
    fireEvent.change(input, { target: { value: "12,5" } });
    expect(input.value).toBe("12.5");
  });

  it("input has alpha character", () => {
    fireEvent.change(input, { target: { value: "12abc" } });
    fireEvent.blur(input);
    expect(input.value).toBe("12");
  });

  it("float number has more than one dot", () => {
    fireEvent.change(input, { target: { value: "12.34.56" } });
    fireEvent.blur(input);
    expect(input.value).toBe("12.34");
  });

  it("input minus number than display zero when on blur", () => {
    fireEvent.change(input, { target: { value: "-1" } });
    fireEvent.blur(input);
    expect(input.value).toBe("0");
  });
});

describe("Counter test with percent type", () => {
  const { getAllByTestId } = render(<Counter type="percent" />);
  const input = getAllByTestId("input")[0] as HTMLInputElement;
  const minusButton = getAllByTestId("minus-button")[0];
  const plusButton = getAllByTestId("plus-button")[0];

  it("input value > 100 and on blur resets to previous valid value", () => {
    fireEvent.change(input, { target: { value: "50" } });
    fireEvent.blur(input);
    expect(input.value).toBe("50");
    fireEvent.change(input, { target: { value: "120" } });
    fireEvent.blur(input);
    expect(input.value).toBe("50"); // Should revert to last valid value
  });

  it("disables minus button when value is 0", () => {
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.blur(input);
    expect(minusButton).toHaveProperty("disabled", true);
  });

  it("disables plus button when value is 100", () => {
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.blur(input);
    expect(plusButton).toHaveProperty("disabled", true);
  });
});

describe("Counter test with pixel type", () => {
  it("updates value to 100 when switching from px to % and current value > 100", () => {
    const { getAllByTestId } = render(<Counter type="pixel" />);
    const input = getAllByTestId("input")[0] as HTMLInputElement;

    // Set value to 150px
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.blur(input);
    //Switch to percent type
    render(<Counter type="percent" />);
    expect(input.value).toBe("100");
  });
});
