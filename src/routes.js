import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/games",
    name: "games",
    component: () => import("./pages/GamesPage"),
  },
  // {
  //   path: "/player/",
  //   name: "player",
  //   component: () => import("./pages/PlayerPage"),
  // },
  {
    path: "/players/:player_id",
    name: "players",
    props: true,
    component: () => import("./pages/PlayerPage"),
  },
  {
    path: "/team/:team_id",
    name: "teams",
    props: true,
    component: () => import("./pages/TeamPage"),
  },
  // {
  //   path: "/team",
  //   name: "team",
  //   component: () => import("./pages/TeamPage"),
  // },
  {
    path: "/Favorites",
    name: "Favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
