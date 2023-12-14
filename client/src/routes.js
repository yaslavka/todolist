import routesLik from "./constants/routes.constants";
import RootPages from "./pages/RootPages";


export const publicRouteConfig = [
    {
        id: 0,
        path: routesLik.root,
        component: RootPages,
        exact: true,
    },
]

export const privateRouteConfig = [
    {
        id: 0,
        path: routesLik.root,
        component: RootPages,
        exact: true,
    },
]
