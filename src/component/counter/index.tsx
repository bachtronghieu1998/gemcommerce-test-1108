import React, { useState, useEffect } from "react";
import "./counter.css";
import { validateInput, convertCommaToPoint } from "../../ultil/validation";
import { OPTION_TYPE, PERCENT } from "../../ultil/types";
import { MAX_VALUE_100 } from "../../ultil/constant";

interface CounterProps {
  type?: OPTION_TYPE;
}
const Counter: React.FC<CounterProps> = ({ type }) => {
  const [value, setValue] = useState("0");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [changingValue, setChangingValue] = useState("0");

  useEffect(() => {
    if (type === "percent" && Number(value) > 100) {
      const max = Number(MAX_VALUE_100).toString();
      setValue(max);
      setChangingValue(max);
    }
  }, [type]);

  const checkDisabled = (direction: "smaller" | "bigger") => {
    if (type !== PERCENT) return;

    const validatedValue = validateInput(value);
    if (direction === "smaller") {
      return !validatedValue || Number(validatedValue) <= 0;
    } else {
      return Number(validatedValue) >= 100;
    }
  };

  const isDisabledSmaller = checkDisabled("smaller");
  const isDisabledBigger = checkDisabled("bigger");

  return (
    <div
      className={[
        "flex items-center w-1/2 h-8 rounded-lg overflow-hidden bg-button",
        hovered ? "bg-button-hover" : "",
        focused ? "input-focus" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        data-testid="minus-button"
        className={[
          "bg-transparent h-full pointer w-12 cursor-pointer button-hover-custom",
          isDisabledSmaller ? "disabled" : "",
        ].join(" ")}
        disabled={isDisabledSmaller}
        onClick={() => {
          const newValue = Number(value) - 1;
          if (type === PERCENT && newValue < 0) return;
          setValue(newValue.toString());
          setChangingValue(newValue.toString());
        }}
      >
        -
      </button>
      <input
        data-testid="input"
        type="text"
        className="bg-transparent h-full text-center w-full focus:outline-none cursor-pointer"
        placeholder="0"
        value={changingValue}
        onChange={(e) => setChangingValue(convertCommaToPoint(e.target.value))}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          setHovered(false);
          setFocused(true);
        }}
        onBlur={() => {
          setHovered(false);
          setFocused(false);
          const validatedValue = validateInput(changingValue, type);
          console.log(validatedValue);
          if (validatedValue) {
            setValue(validatedValue);
            setChangingValue(validatedValue);
          } else {
            setChangingValue(value);
          }
        }}
      />
      <button
        data-testid="plus-button"
        className={[
          "bg-transparent h-full pointer w-12 cursor-pointer button-hover-custom",
          isDisabledBigger ? "disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={isDisabledBigger}
        onClick={() => {
          const newValue = Number(value) + 1;
          if (type === PERCENT && newValue > 100) return;
          setValue(newValue.toString());
          setChangingValue(newValue.toString());
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
