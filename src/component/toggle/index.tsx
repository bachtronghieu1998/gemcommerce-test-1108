import React, { useState } from "react";

interface ToggleProps {
  initialToggled?: boolean;
  onToggle?: (isToggled: boolean) => void;
}
const Toggle: React.FC<ToggleProps> = ({ initialToggled, onToggle }) => {
  const [isToggled, setIsToggled] = useState(initialToggled || false);

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isToggled);
    }
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex items-center w-1/2 h-8 rounded-lg overflow-hidden bg-button">
      <button
        className={[
          "px-2 py-1 pointer w-1/2 cursor-pointer",
          isToggled ? "bg-neutral-700 rounded-lg " : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleToggle}
      >
        %
      </button>
      <button
        className={[
          "px-2 py-1 pointer w-1/2 cursor-pointer",
          !isToggled ? "bg-neutral-700 rounded-lg " : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleToggle}
      >
        px
      </button>
    </div>
  );
};

export default Toggle;
