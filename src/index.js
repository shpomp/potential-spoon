import React from "react";
// import ReactDOM from "react-dom/client";
import App from "./App";

import { render } from "react-dom";

const domNode = document.getElementById("root");
render(<App />, domNode);

// const root = ReactDOM.render(document.getElementById("root"));
// root.render(
//   <>
//     <App />
//   </>
// );
