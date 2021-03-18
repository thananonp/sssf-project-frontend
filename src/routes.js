/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts.jsx";
import Calendar from "views/Calendar.jsx";
import UserPage from "views/Pages/UserPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import RegisterPageCompany from "./views/Pages/RegisterPageCompany";
import ProductTable from "views/Tables/ProductTable";
import AddUserForm from "views/Forms/AddUserForm";

//custom component
import UserView from "views/Pages/Custom/UserView"
import UserEdit from "views/Pages/Custom/UserEdit"
import AddCategoryForm from "./views/Forms/AddCategoryForm";

var routes = [
    {
        path: "/edit/profile",
        layout: "/admin",
        name: "Edit Password",
        icon: "pe-7s-tools",
        invisible: true,
        component: UserEdit
    }, {
        path: "/view/profile",
        layout: "/admin",
        name: "View Profile",
        icon: "pe-7s-note2",
        invisible: true,
        component: UserView
    },
    {
        path: "/manage",
        layout: "/admin",
        name: "View stock",
        icon: "pe-7s-note2",
        component: ProductTable
    }
    , {
        path: "/add/product",
        layout: "/admin",
        name: "Add Product",
        icon: "pe-7s-plus",
        component: AddUserForm
    }
    , {
        path: "/add/category",
        layout: "/admin",
        name: "Add Category",
        icon: "pe-7s-plus",
        component: AddCategoryForm
    }
    , {
        path: "/dashboard",
        layout: "/admin",
        name: "Dashboard",
        icon: "pe-7s-graph",
        component: Dashboard
    },
    {
        collapse: true,
        path: "/components",
        name: "Components",
        state: "openComponents",
        icon: "pe-7s-plugin", invisible: true,

        views: [
            {
                path: "/buttons",
                layout: "/admin",
                name: "Buttons",
                mini: "B",
                component: Buttons
            },
            {
                path: "/grid-system",
                layout: "/admin",
                name: "Grid System",
                mini: "GS",
                component: GridSystem
            },
            {
                path: "/panels",
                layout: "/admin",
                name: "Panels",
                mini: "P",
                component: Panels
            },
            {
                path: "/sweet-alert",
                layout: "/admin",
                name: "Sweet Alert",
                mini: "SA",
                component: SweetAlert
            },
            {
                path: "/notifications",
                layout: "/admin",
                name: "Notifications",
                mini: "N",
                component: Notifications
            },
            {
                path: "/icons",
                layout: "/admin",
                name: "Icons",
                mini: "I",
                component: Icons
            },
            {
                path: "/typography",
                layout: "/admin",
                name: "Typography",
                mini: "T",
                component: Typography
            }
        ]
    },
    {
        collapse: true,
        path: "/forms",
        name: "Forms",
        state: "openForms",
        icon: "pe-7s-note2", invisible: true,

        views: [
            {
                path: "/regular-forms",
                layout: "/admin",
                name: "Regular Forms",
                mini: "RF",
                component: RegularForms
            },
            {
                path: "/extended-forms",
                layout: "/admin",
                name: "Extended Forms",
                mini: "EF",
                component: ExtendedForms
            },
            {
                path: "/validation-forms",
                layout: "/admin",
                name: "Validation Forms",
                mini: "VF",
                component: ValidationForms
            },
            {
                path: "/wizard",
                layout: "/admin",
                name: "Wizard",
                mini: "W",
                component: Wizard
            }
        ]
    },
    {
        collapse: true,
        path: "/tables",
        name: "Tables",
        state: "openTables", invisible: true,

        icon: "pe-7s-news-paper",
        views: [
            {
                path: "/regular-tables",
                layout: "/admin",
                name: "Regular Tables",
                mini: "RT",
                component: RegularTables
            },
            {
                path: "/extended-tables",
                layout: "/admin",
                name: "Extended Tables",
                mini: "ET",
                component: ExtendedTables
            },
            {
                path: "/react-table",
                layout: "/admin",
                name: "React Table",
                mini: "RT",
                component: ReactTables
            }
        ]
    },
    {
        collapse: true,
        path: "/maps", invisible: true,

        name: "Maps",
        state: "openMaps",
        icon: "pe-7s-map-marker",
        views: [
            {
                path: "/google-maps",
                layout: "/admin",
                name: "Google Maps",
                mini: "GM",
                component: GoogleMaps
            },
            {
                path: "/full-screen-maps",
                layout: "/admin",
                name: "Full Screen Map",
                mini: "FSM",
                component: FullScreenMap
            },
            {
                path: "/vector-maps",
                layout: "/admin",
                name: "Vector Map",
                mini: "VM",
                component: VectorMap
            }
        ]
    },
    {
        path: "/charts",
        layout: "/admin",
        name: "Charts", invisible: true,

        icon: "pe-7s-graph1",
        component: Charts
    },
    {
        path: "/calendar",
        layout: "/admin",
        name: "Calendar",
        icon: "pe-7s-date", invisible: true,

        component: Calendar
    },
    {
        collapse: true,
        path: "/pages",
        name: "Pages",
        state: "openPages",
        icon: "pe-7s-gift", invisible: true,

        views: [
            {
                path: "/user-page",
                layout: "/admin",
                name: "User Page",
                mini: "UP",
                component: UserPage
            },
            {
                path: "/login",
                layout: "/auth",
                name: "Login Page",
                mini: "LP",
                component: LoginPage
            },
            {
                path: "/register/user",
                layout: "/auth",
                name: "Register",
                mini: "RP",
                component: RegisterPage
            },
            {
                path: "/register/company",
                layout: "/auth",
                name: "Register",
                mini: "RP",
                component: RegisterPageCompany

            },
            {
                path: "/lock-screen-page",
                layout: "/auth",
                name: "Lock Screen Page",
                mini: "LSP",
                component: LockScreenPage
            }
        ]
    }
];
export default routes;
