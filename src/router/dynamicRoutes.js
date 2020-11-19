// const { default: allRoutes } = require("./allRoutes");

import Home from "../pages/Home"
const dynamicRoutes = [
    {
        path:'/',
        component:Home,
        children:[]
    }, 
    {
        path:"*",
        component:()=>import(/*webpackChunkName:'page404*/'../pages/Page404')
    },
]

export default dynamicRoutes