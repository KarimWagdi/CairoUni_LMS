import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Login from "../pages/login/index";
import SignUp from "../pages/register/index";
import ForgetPassword from "../pages/ForgetPassword/index";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/profile";
import Professors from "../pages/Professors/index";
import Analysis from "../pages/Analysis/index";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Researches from "../pages/Researchs";
import Surveys from "../pages/Surveys";
import AddProject from "../pages/AddProject/index";
import AddResearch from "../pages/AddResearch/index";
import CV from "../pages/CV/index";
import Template from "../pages/Template/index"
import { useEffect } from "react";
import ProfessorProfile from "../pages/ProfessorProfile/ProfessorProfile"; // Adjust the path accordingly

function Router() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [token]);

  const routes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "/home",
      children: [
        { path: "", element: <Home /> },
        {
          path: "projects",
          children: [
            { path: "", element: <Projects /> },
            { path: "add", element: <AddProject /> },
          ],
        },
        {
          path: "researchs",
          children: [
            { path: "", element: <Researches /> },
            { path: "add", element: <AddResearch /> },
          ],
        },
        { path: "surveys", element: <Surveys /> },
        {
          path: "profile",
          children: [
            { path: "", element: <Profile /> },
            { path: "cv", element: <CV /> },
            { path: "template", element: <Template /> }
          ],
        },
        { path: "professors", element: <Professors /> },
        { path: "analysis", element: <Analysis /> },
      ],
    },
    {
      path: "/home/professors/:id",
      element: <ProfessorProfile />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
