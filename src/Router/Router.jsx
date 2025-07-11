import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import AuthRoot from "../Root/AuthRoot";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/Home/Home";
import PetList from "../Pages/AllPets/Pets";
import PetDetails from "../Pages/PetDetails/PetDetails";
import DonationCampaignsPage from "../Pages/Donation/DonationCampaign";
import DonationCardDetails from "../Pages/Donation/DonationCardDetails";
import Page from "../Pages/Dashboard/page";
import AddPet from "../Pages/addPet.jsx/AddPet";
import Private from "../Pages/Private/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-Pets",
        Component: PetList,
      },
      {
        path: "/pet/:id",
        Component: PetDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/pets/${params.id}`),
      },
      { path: "/donation", Component: DonationCampaignsPage },
      {
        path: "donationCardDetails/:id",
        Component: DonationCardDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donation/${params.id}`),
      },
    ],
  },
  {
    path: "/",
    Component: AuthRoot,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      { path: "/login", Component: LogIn },
    ],
  },
  {
    path: "/dashboard",
    Component: Page,
    children: [
      {
        path: "add-pet",
        element: <Private>
        <AddPet></AddPet>
        </Private>,
      },
      {
        path: "add",
      },
    ],
  },
]);
