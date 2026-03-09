import { createRouter, createWebHistory, RouteRecordRaw, _RouteLocationBase } from "vue-router";
import { RouteName, AttemptRoute, testAccessRouteName, AccessDeniedRoute } from "./router-utils";
import { useUserStore } from "@/store/user.store";
import { useLayoutsStore } from "@/store/layouts.store";
import { AxiosError } from "axios";
import { getBearer } from "@/api/bearer";
import i18n from "@/plugins/i18n";

const AuthLayout = () => import("@/layouts/AuthLayout.vue");
const MainLayout = () => import("@/layouts/MainLayout.vue");
const DashboardView = () => import("@/views/DashboardView.vue");
const EditUser = () => import("@/views/users/EditUser.vue");
const PageError = () => import("@/views/err/PageError.vue");
const SignIn = () => import("@/views/auth/SignIn.vue");
const ExpiringLeases = () => import("@/views/expiring-leases/ExpiringLeases.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainLayout,
    redirect: { name: RouteName.HOME },
    children: [
      {
        path: "/dashboard",
        name: RouteName.HOME,
        component: DashboardView,
        meta: { title: RouteName.HOME },
      },
      {
        path: "/expiring",
        name: RouteName.EXPIRING_LEASES,
        component: ExpiringLeases,
        meta: { title: RouteName.EXPIRING_LEASES },
      },
      {
        path: "/bills",
        name: RouteName.BILLS,
        meta: { title: RouteName.BILLS },
        component: () => import("../views/bills/PayBillsView.vue"),
        children: [
          {
            path: "add-expneses",
            name: RouteName.ADD_EXPENSES,
            meta: { title: RouteName.ADD_EXPENSES, isChild: true },
            component: () => import("../views/bills/AddExpenses.vue"),
          },
          {
            path: "add-income",
            name: RouteName.ADD_INCOME,
            meta: { title: RouteName.ADD_INCOME, isChild: true },
            component: () => import("../views/bills/AddIncome.vue"),
          },
        ],
      },
      {
        path: "/utilities",
        name: RouteName.COMMUNAL,
        meta: { title: RouteName.COMMUNAL },
        component: () => import("../views/communal/CommunalView.vue"),
        children: [
          {
            path: "add",
            name: RouteName.ADD_COMMUNAL,
            meta: { title: RouteName.ADD_COMMUNAL, isChild: true },
            component: () => import("../views/communal/CommunalAdd.vue"),
          },
        ],
      },
      {
        path: "/booking",
        name: RouteName.BOOKING,
        meta: { title: RouteName.BOOKING },
        component: () => import("../views/booking/BookingView.vue"),
        children: [
          {
            path: ":bookId/create",
            name: RouteName.MAKE_BOOKING,
            meta: { title: RouteName.MAKE_BOOKING, isChild: true },
            component: () => import("../views/booking/MakeBooking.vue"),
            props: (route) => ({
              bookId: Number(route.params.bookId),
            }),
          },
        ],
      },
      {
        path: "/clients",
        name: RouteName.CLIENTS,
        meta: { title: RouteName.CLIENTS },
        component: () => import("../views/clients/ClientsView.vue"),
      },
      {
        path: "/objects",
        name: RouteName.OBJECT,
        meta: { title: RouteName.OBJECT },
        component: () => import("../views/object/ObjectView.vue"),
        children: [
          {
            path: "create",
            name: RouteName.CREATEOBJ,
            meta: { title: RouteName.CREATEOBJ, isChild: true },
            component: () => import("../views/create-apartment/CreateObjectView.vue"),
            beforeEnter(from, to, next) {
              const userStore = useUserStore();

              if (userStore.isAdmin || userStore.isManager) {
                next();
              } else {
                next(AccessDeniedRoute);
              }
            },
          },
        ],
      },
      {
        path: "/properties",
        name: RouteName.PROPERTIES,
        meta: { title: RouteName.PROPERTIES },
        component: () => import("../views/properties/PropertiesView.vue"),
        beforeEnter(from, to, next) {
          const userStore = useUserStore();

          if (userStore.isAdmin) {
            next();
          } else {
            next(AccessDeniedRoute);
          }
        },
      },
      {
        path: "users",
        name: RouteName.USERS,
        component: () => import("../views/users/UsersView.vue"),
        meta: { title: RouteName.USERS },
        children: [
          {
            path: ":userId/edit",
            name: RouteName.EDIT_USER,
            component: EditUser,
            meta: {
              title: RouteName.EDIT_USER,
              isChild: true,
            },
            props: (route) => ({
              userId: Number(route.params.userId),
            }),
          },
        ],
      },
      {
        path: "/err/:purpose",
        name: RouteName.PAGE_ERROR,
        component: PageError,
        meta: {
          title: "pageError",
        },
        props: (route) => ({
          purpose: route.params.purpose,
        }),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "sign_in",
        name: RouteName.SIGN_IN,
        component: SignIn,
        meta: {
          title: "welcome",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: RouteName.PAGE_ERROR, params: { purpose: "404" } },
  },
];

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { left: 0, top: 0, behavior: "smooth" };
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const security = getBearer();
  const userLoaded = userStore.getLoaded;

  if (security) {
    if (!userLoaded) {
      try {
        await userStore.fetch();
      } catch (e) {
        // Если у юзера тухлый токен - мы его уже кидаем на страницу авторизации из интерсепторов
        // Поэтому тут ничего не делаем, иначе случается ошибка с двойным редиректом
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e as AxiosError<any>)?.response?.status === 401) {
          return;
        } else {
          throw e;
        }
      }
    }

    next();
  } else {
    if (testAccessRouteName(to as _RouteLocationBase)) {
      next();
    } else {
      AttemptRoute.set(to as _RouteLocationBase);
      next({ name: RouteName.SIGN_IN });
    }
  }

  if (to.meta?.title) {
    const key = `pages.${String(to.meta.title).toLocaleLowerCase()}`;

    document.title = i18n.global.t(key) ? (i18n.global.t(key) as string) : "Agent-Tenant";
  }
});

router.afterEach(() => {
  const layoutsStore = useLayoutsStore();
  const isOpen = layoutsStore.getStateMenu;

  if (isOpen) {
    layoutsStore.toggleMenu();
  }
});

export default router;
