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
import MyPet from "../Pages/MyPet/MyPet";
import UpdatePet from "../Pages/Dashboard/UpdatePet/UpdatePet";
import AdoptionRequest from "../Pages/Dashboard/AdoptionRequest/AdoptionRequest";
import DonationCampaignForm from "../Pages/Dashboard/CreateDonationForm/DonationCampaignForm";
import MyDonation from "../Pages/Dashboard/MyDanation/MyDonation";
import UpdateCampaign from "../Pages/Dashboard/UpdateDonorsCampaign/UpdateCampaign";

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
    element: (
      <Private>
        <Page></Page>
      </Private>
    ),
    children: [
      {
        path: "add-pet",
        Component: AddPet,
      },
      {
        path: "my-pet",
        Component: MyPet,
      },
      {
        path: "update-pet/:id",
        Component: UpdatePet,
      },
      {
        path: "adoption-req",
        Component: AdoptionRequest,
      },
      {
        path: "donation-campaign",
        Component: DonationCampaignForm,
      },
      {
        path: "my-campaign",
        Component: MyDonation,
      },
      {
        path: "my-donation/:id",
        Component: UpdateCampaign,
      },
    ],
  },
]);
