import Counter from "./component/counter";
import Toggle from "./component/toggle";
import "./index.css";
import { useState } from "react";
const App = () => {
  const [isToggled, setIsToggled] = useState(true);
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg ">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">Unit</div>
          <Toggle
            initialToggled={isToggled}
            onToggle={(isToggled) => setIsToggled(isToggled)}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">Value</div>
          <Counter type={isToggled ? "percent" : "pixel"} />
        </div>
      </div>
    </div>
  );
};

export default App;
