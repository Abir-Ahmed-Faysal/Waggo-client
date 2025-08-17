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
import MyHonorDonation from "../Pages/Dashboard/MyHonorDonation/MyDonation";
import AdminCheck from "../Pages/Private/AdminCheck";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AllPetsAdmin from "../Pages/Dashboard/Admin/AllPetsAdmin/AllPetsAdmin";
import AllDonationsAdmin from "../Pages/Dashboard/Admin/AllDonationsAdmin/AllDonationsAdmin";
import AdminUpdatePet from "../Pages/Dashboard/Admin/AdminPetUpdate/UpdatePet";
import NotFound from "../components/NotFound";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Profile from "../Pages/Dashboard/AdoptionRequest/Profile/Profile";
import Overview from "../Pages/Dashboard/Admin/Overview/Overview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-Pets/:cat",
        Component: PetList,
      },
      {
        path: "/pet/:id",
        Component: PetDetails,
      },
      { path: "/donation", Component: DonationCampaignsPage },
      {
        path: "/donationCardDetails/:id",
        Component: DonationCardDetails,
      },
      {
        path: "/join-us",
        Component: JoinUs,
      },
      {
        path: "*",
        Component: NotFound,
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
        index: true,
        Component: AdoptionRequest,
      },
      {
        path: "add-pet",
        Component: AddPet,
      },
      {
        path: "profile",
        Component: Profile,
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
      {
        path: "my-honor-donation",
        Component: MyHonorDonation,
      },
      {
        path: "admin-pet-update/:id",
        Component: AdminUpdatePet,
      },
      {
        path: "all-users",
        element: (
          <AdminCheck>
            <AllUsers />
          </AdminCheck>
        ),
      },
      {
        path: "overview",
        element: (
          <AdminCheck>
            <Overview />
          </AdminCheck>
        ),
      },
      {
        path: "all-pets",
        element: (
          <AdminCheck>
            <AllPetsAdmin />
          </AdminCheck>
        ),
      },
      {
        path: "all-donations",
        element: (
          <AdminCheck>
            <AllDonationsAdmin />
          </AdminCheck>
        ),
      },
    ],
  },
]);
