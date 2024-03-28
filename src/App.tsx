
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Libary from "./Pages/Libary";
import Prodected from "./Components/Prodected";
import SignIn from "./Pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/libary",
        element: (
          <Prodected>
            <Libary />
          </Prodected>
        ),
      },
    ],
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
