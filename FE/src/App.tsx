import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import Header from "./components/header";

function App() {
  return <>
  <Header/>
  <RouterProvider router={router} />
  </>;
}

export default App;
