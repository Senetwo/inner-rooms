import { useState } from "react";
import { initialState } from "./game/initialState";
import Home from "./pages/Home";

function App() {
  const [state, setState] = useState(initialState);

  return <Home state={state} setState={setState} />;
}

export default App;
