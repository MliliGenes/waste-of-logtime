
import setup from "./coalesce";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setup();
  });
  return (
    <div id="app">
      <div className="content--canvas"></div>
      <div className="container">
        
      </div>
    </div>
  );
}

export default App;
