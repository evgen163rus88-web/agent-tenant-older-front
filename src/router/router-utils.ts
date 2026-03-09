import { _RouteLocationBase } from "vue-router";
import { useCookies } from "vue3-cookies";

export enum RouteName {
  PAGE_ERROR = "erors",
  HOME = "dashboard",
  BILLS = "bills",
  BOOKING = "booking",
  MAKE_BOOKING = "makeBooking",
  CLIENTS = "clients",
  USERS = "users",
  OBJECT = "apartments",
  PROPERTIES = "properties",
  EDIT_USER = "useredit",
  SIGN_IN = "signIn",
  REQUESTED = "requested",
  CREATEOBJ = "createObj",
  COMMUNAL = "communal",
  ADD_COMMUNAL = "addCommunal",
  ADD_EXPENSES = "addExpenses",
  ADD_INCOME = "addIncome",
  EXPIRING_LEASES = "expiring",
}

export const AttemptRoute = {
  get() {
    const cookieAttemptRoute = useCookies().cookies.get(RouteName.REQUESTED);
    if (cookieAttemptRoute) {
      return decodeURIComponent(cookieAttemptRoute);
    }
    return JSON.parse(localStorage.getItem("attemptroute") || "null");
  },
  set(location: _RouteLocationBase) {
    const cloneLocation = Object.assign({}, location);
    const { name, params = {}, query = {} } = cloneLocation;
    localStorage.setItem("attemptroute", JSON.stringify({ name, params, query }));
    useCookies().cookies.set(RouteName.REQUESTED, JSON.stringify({ name, params, query }));
  },
  clear() {
    localStorage.removeItem("attemptroute");
    useCookies().cookies.remove(RouteName.REQUESTED);
  },
} as const;

export function testAccessRouteName(to: _RouteLocationBase) {
  switch (to.name) {
    case RouteName.SIGN_IN:
      return true;
    default:
      return false;
  }
}

export const AccessDeniedRoute = {
  name: RouteName.PAGE_ERROR,
  params: { purpose: "403" },
};
