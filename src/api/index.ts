import {
  Configuration,
  PropertyApi,
  UsersApi,
  AuthApi,
  ApartamentsApi,
  UploadFileApi,
  CustomersApi,
  BookingApi,
  CommunalApi,
  ExpensesApi,
  IncomeApi,
  DashboardApi,
  NotificationApi,
} from "./openapi";
import { mainInstance } from "./axios";

export * from "./openapi";

export const basePath = DEVELOPMENT ? "http://localhost:2000" : process.env.VUE_APP_BASEURL;

const config = new Configuration({
  basePath,
});

// swagger
export const apartamentsApi = new ApartamentsApi(config, undefined, mainInstance);
export const propertyApi = new PropertyApi(config, undefined, mainInstance);
export const usersApi = new UsersApi(config, undefined, mainInstance);
export const authApi = new AuthApi(config, undefined, mainInstance);
export const uploadImageApi = new UploadFileApi(config, undefined, mainInstance);
export const customersApi = new CustomersApi(config, undefined, mainInstance);
export const bookingApi = new BookingApi(config, undefined, mainInstance);
export const communalApi = new CommunalApi(config, undefined, mainInstance);
export const expensesApi = new ExpensesApi(config, undefined, mainInstance);
export const incomeApi = new IncomeApi(config, undefined, mainInstance);
export const dashboardApi = new DashboardApi(config, undefined, mainInstance);
export const notificationApi = new NotificationApi(config, undefined, mainInstance);
