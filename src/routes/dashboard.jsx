// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assignment from '@material-ui/icons/Assignment';
import Event from '@material-ui/icons/Event';
import Note from '@material-ui/icons/Note';
import Reorder from '@material-ui/icons/Reorder';
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Assignments from "../components/assignments/assignments";
import VitalSigns from "../components/VitalSigns/vitalSigns";
import PatientNote from "../components/PatientNote/patientNote";
import Appointment from "../components/Appointment/appointments";
import OrderSheet from "../components/Orders/orderSheet";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Prime Care EHR Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/Assignments",
    sidebarName: "Assignments",
    navbarName: "Assignments",
    icon: Assignment,
    component: Assignments
  },
  {
    path: "/VitalSigns",
    sidebarName: "Vital Signs",
    navbarName: "Vital Signs",
    icon: AssignmentTurnedIn,
    component: VitalSigns,
  },
  {
    path: "/OrderSheet",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: Reorder,
    component: OrderSheet,
    omenu: true
  },
  {
    path: "/PatientNote",
    sidebarName: "Patient Note",
    navbarName: "Patient Note",
    icon: Note,
    component: PatientNote,
    pnmenu: true
  },
  {
    path: "/Appointment",
    sidebarName: "Appointment",
    navbarName: "Appointment",
    icon: Event,
    component: Appointment
  },
  { 
    redirect: true,
    path: "/",
    to: "/dashboard",
    navbarName: "Redirect"
   }
];

export default dashboardRoutes;
