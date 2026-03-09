/* tslint:disable */
/* eslint-disable */

import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, RequestArgs, BaseAPI } from './base';

export interface ApartamentsByCompany {
    'data': { [key: string]: Array<BaseEntityShema>; };
}

export interface ApartamentsStatusesData {
    '_count': ApartmentSummary;
    'bookingStatus': ApartamentsStatusesDataBookingStatusEnum;
}

export enum ApartamentsStatusesDataBookingStatusEnum {
    FREE = 'FREE',
    RESERVED = 'RESERVED',
    CHECK_IN = 'CHECK_IN',
    CHECK_OUT = 'CHECK_OUT',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export interface ApartmentSummary {
        'id': number;
}
export interface AuthCurrentUserDto {
        'id': number;
        'firstName': string;
        'lastName': string;
        'email': string;
        'login': string;
        'role': string;
}
export interface AuthErrorDto {
        'message': string;
}
export interface AuthResponseDto {
        'accessToken': string;
}
export interface BaseClientShema {
        'id': number;
        'firstName': string;
        'lastName': string;
}
export interface BaseEntityShema {
        'id': number;
        'name': string;
        'parent'?: string;
}
export interface BookingApartamentDTO {
        'id'?: number;
        'periodFrom': string;
        'periodTo': string;
        'countGuests': number;
}
export interface BookingCustomerDto {
        'id'?: number;
        'payDayForLease': number;
        'pledgeCurrency'?: string;
        'pledge'?: number;
        'depositBefore'?: number;
        'depositCurrency'?: string;
        'periodFrom': string;
        'periodTo': string;
        'currentStatus'?: BookingCustomerDtoCurrentStatusEnum;
        'apartamentId': Array<PublicApartamentDto>;
}

export enum BookingCustomerDtoCurrentStatusEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface CheckedBookingDTO {
        'id': number;
        'periodFrom': string;
        'periodTo': string;
        'apartamentId': Array<BaseEntityShema>;
}
export interface CreateApartamentDto {
        'id'?: number;
        'name': string;
        'roomArea': number;
        'countBedroom': number;
        'countBathroom'?: number;
        'isWiFi'?: boolean;
        'isKitchenAvailable'?: boolean;
        'owner'?: string;
        'description'?: string;
        'note'?: Array<string>;
        'bookingStatus'?: CreateApartamentDtoBookingStatusEnum;
        'type': CreateApartamentDtoTypeEnum;
        'createdAt'?: string;
        'updatedAt'?: string;
        'photos'?: Array<string>;
        'currency': string;
        'currencySymbol': string;
        'pricePerDay'?: number;
        'pricePerMounth': number;
        'userEdited'?: string;
        'isDeleted'?: boolean;
        'propertyId': number;
}

export enum CreateApartamentDtoBookingStatusEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}
export enum CreateApartamentDtoTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface CreateBillsExpenseDto {
        'id'?: number;
        'name': string;
        'type': CreateBillsExpenseDtoTypeEnum;
        'amount': number;
        'currency'?: string;
        'userEdited'?: string;
        'apartamentId'?: number;
        'createdAt'?: string;
        'updatedAt'?: string;
}

export enum CreateBillsExpenseDtoTypeEnum {
    MAINTAINANCE = 'MAINTAINANCE',
    APPLIANCES = 'APPLIANCES',
    REPAIRS = 'REPAIRS',
    OTHER = 'OTHER'
}

export interface CreateBillsIncomeDto {
        'id'?: number;
        'name': string;
        'type': CreateBillsIncomeDtoTypeEnum;
        'amount': number;
        'currency'?: string;
        'userEdited'?: string;
        'createdAt'?: string;
        'updatedAt'?: string;
        'customerId'?: number;
        'apartamentId'?: number;
}

export enum CreateBillsIncomeDtoTypeEnum {
    COMMUNAL = 'COMMUNAL',
    RENT = 'RENT',
    OTHER = 'OTHER'
}

export interface CreateBookingDto {
        'id'?: number;
        'typeCommission'?: CreateBookingDtoTypeCommissionEnum;
        'agencyCommission'?: number;
        'payDayForLease': number;
        'countGuests'?: number;
        'pledgeCurrency'?: string;
        'pledge'?: number;
        'depositBefore'?: number;
        'depositCurrency'?: string;
        'hasPriceAllPeriod'?: boolean;
        'priceAllPeriod'?: number;
        'pricePerDay'?: number;
        'pricePerMounth': number;
        'currency': string;
        'periodFrom': string;
        'periodTo': string;
        'isTrusted'?: boolean;
        'includeWater'?: boolean;
        'includeElectricity'?: boolean;
        'includeHousekeeping'?: boolean;
        'customerId': number;
        'apartamentId': number;
        'currentStatus'?: CreateBookingDtoCurrentStatusEnum;
}

export enum CreateBookingDtoTypeCommissionEnum {
    PERCENT = 'PERCENT',
    SUM = 'SUM'
}
export enum CreateBookingDtoCurrentStatusEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface CreateCommunalDto {
        'id'?: number;
        'tariffElectric': number;
        'valueElectric': number;
        'diffElectric': number;
        'actualPaymentWater'?: number;
        'tariffWater': number;
        'valueWater': number;
        'diffWater': number;
        'actualPaymentElectric'?: number;
        'isFullyPayment'?: boolean;
        'apartamentId': number;
        'customerId'?: number;
        'userEdited'?: string;
        'createdAt'?: string;
        'updatedAt'?: string;
}
export interface CreateCommunalFront {
        'id'?: number;
        'tariffElectric': number;
        'valueElectric': number;
        'diffElectric': number;
        'actualPaymentWater'?: number;
        'tariffWater': number;
        'valueWater': number;
        'diffWater': number;
        'actualPaymentElectric'?: number;
        'isFullyPayment'?: boolean;
        'apartamentId': number;
        'customerId'?: number;
        'updatedAt'?: string;
}
export interface CreateCustomerDto {
        'id'?: number;
        'firstName': string;
        'lastName': string;
        'email'?: string;
        'passportNumber': string;
        'phone': string;
        'docsPhoto'?: Array<string>;
        'isActive'?: boolean;
        'agent'?: string;
        'createdAt'?: string;
        'updatedAt'?: string;
}
export interface CreateFrontApartamentDTO {
        'id'?: number;
        'name': string;
        'roomArea': number;
        'countBedroom': number;
        'countBathroom'?: number;
        'isWiFi'?: boolean;
        'isKitchenAvailable'?: boolean;
        'owner'?: string;
        'description'?: string;
        'note'?: Array<string>;
        'bookingStatus'?: CreateFrontApartamentDTOBookingStatusEnum;
        'type': CreateFrontApartamentDTOTypeEnum;
        'photos'?: Array<string>;
        'currency': string;
        'currencySymbol': string;
        'pricePerDay'?: number;
        'pricePerMounth': number;
        'userEdited'?: string;
        'isDeleted'?: boolean;
        'propertyId': number;
}

export enum CreateFrontApartamentDTOBookingStatusEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}
export enum CreateFrontApartamentDTOTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface CreateFrontCustomerDTO {
        'id'?: number;
        'firstName': string;
        'lastName': string;
        'email'?: string;
        'passportNumber': string;
        'phone': string;
        'docsPhoto'?: Array<string>;
        'isActive'?: boolean;
        'agent'?: string;
}
export interface CreateNotificationDto {
        'id'?: number;
        'name': CreateNotificationDtoNameEnum;
        'note': string;
        'target': string;
        'hasRead'?: boolean;
        'createdAt'?: string;
}

export enum CreateNotificationDtoNameEnum {
    PAY_DAY = 'payDay',
    CHECK_IN = 'checkIn',
    EXPIRING_LEASES = 'expiringLeases',
    CHANGE_BOOKING_STATUS = 'changeBookingStatus',
    CHECK_OUT = 'checkOut'
}

export interface CreatePropertyDto {
        'id'?: number;
        'name': string;
        'address': string;
        'description': string;
        'createdAt'?: string;
        'updatedAt'?: string;
        'type': CreatePropertyDtoTypeEnum;
        'isDeleted'?: boolean;
}

export enum CreatePropertyDtoTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface CreateUserDto {
        'id'?: number;
        'firstName': string;
        'lastName'?: string;
        'email': string;
        'role'?: CreateUserDtoRoleEnum;
        'login': string;
        'password': string;
        'isActive'?: boolean;
        'countVisits'?: number;
        'accId'?: number;
}

export enum CreateUserDtoRoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER'
}

export interface CustomerForBills {
        'id'?: number;
        'firstName': string;
        'lastName': string;
}
export interface EarlyDepositsData {
        '_sum': EarlyDepositsSummary;
        'depositCurrency': string;
}
export interface EarlyDepositsSummary {
        'depositBefore': string;
}
export interface ExpiringLeasesRes {
        'id': number;
        'periodFrom': string;
        'periodTo': string;
        'apartamentId': number;
}
export interface FileDto {
        'file': any;
}
export interface FilterDashboardDto {
        'periodFrom'?: string;
        'periodTo'?: string;
}
export interface FindOneBookingDto {
        'id'?: number;
        'typeCommission'?: FindOneBookingDtoTypeCommissionEnum;
        'agencyCommission'?: number;
        'payDayForLease': number;
        'countGuests'?: number;
        'pledgeCurrency'?: string;
        'pledge'?: number;
        'depositBefore'?: number;
        'depositCurrency'?: string;
        'hasPriceAllPeriod'?: boolean;
        'priceAllPeriod'?: number;
        'pricePerDay'?: number;
        'pricePerMounth': number;
        'currency': string;
        'periodFrom': string;
        'periodTo': string;
        'isTrusted'?: boolean;
        'includeWater'?: boolean;
        'includeElectricity'?: boolean;
        'includeHousekeeping'?: boolean;
        'customerId': number;
        'currentStatus'?: FindOneBookingDtoCurrentStatusEnum;
        'apartamentId': Array<BaseEntityShema>;
}

export enum FindOneBookingDtoTypeCommissionEnum {
    PERCENT = 'PERCENT',
    SUM = 'SUM'
}
export enum FindOneBookingDtoCurrentStatusEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface FoundApartamentDTO {
        'id'?: number;
        'name': string;
        'roomArea': number;
        'countBedroom': number;
        'countBathroom'?: number;
        'isWiFi'?: boolean;
        'isKitchenAvailable'?: boolean;
        'owner'?: string;
        'description'?: string;
        'note'?: Array<string>;
        'bookingStatus'?: FoundApartamentDTOBookingStatusEnum;
        'type': FoundApartamentDTOTypeEnum;
        'createdAt'?: string;
        'updatedAt'?: string;
        'photos'?: Array<string>;
        'currency': string;
        'currencySymbol': string;
        'pricePerDay'?: number;
        'pricePerMounth': number;
        'userEdited'?: string;
        'isDeleted'?: boolean;
        'propertyId': number;
        'bookingId': Array<BookingApartamentDTO>;
        'parent': string;
}

export enum FoundApartamentDTOBookingStatusEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}
export enum FoundApartamentDTOTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface FoundBookingData {
        'id'?: number;
        'countGuests'?: number;
        'pledgeCurrency'?: string;
        'pledge'?: number;
        'periodFrom': string;
        'periodTo': string;
        'currentStatus'?: FoundBookingDataCurrentStatusEnum;
        'customerId': Array<PickTypeClass>;
}

export enum FoundBookingDataCurrentStatusEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface FoundCustomersDTO {
        'id'?: number;
        'firstName': string;
        'lastName': string;
        'email'?: string;
        'passportNumber': string;
        'phone': string;
        'docsPhoto'?: Array<string>;
        'isActive'?: boolean;
        'agent'?: string;
        'bookingId': Array<BookingCustomerDto>;
}
export interface GroupedByPeriods {
        'count': number;
        'sum': number;
        'period': string;
        'sourceDate': string;
}
export interface IncomeSummary {
        'amount': string;
}
export interface IncomesData {
        '_sum': IncomeSummary;
        'type': IncomesDataTypeEnum;
}

export enum IncomesDataTypeEnum {
    COMMUNAL = 'COMMUNAL',
    RENT = 'RENT',
    OTHER = 'OTHER'
}

export interface LatestCustomerCommunal {
        'id'?: number;
        'tariffElectric': number;
        'valueElectric': number;
        'diffElectric': number;
        'tariffWater': number;
        'valueWater': number;
        'diffWater': number;
        'updatedAt'?: string;
        'total': ServiceFieldsCommunal;
        'customerId'?: Array<BaseClientShema>;
}
export interface LatestValuesCommunal {
        'tariffElectric': number;
        'valueElectric': number;
        'tariffWater': number;
        'valueWater': number;
}
export interface LoginUserDto {
        'email'?: string;
        'login'?: string;
        'password': string;
}
export interface MonthsLeases {
        'lessOneMonths': Array<ExpiringLeasesRes>;
        'lessTwoMonths': Array<ExpiringLeasesRes>;
        'lessThreeMonths': Array<ExpiringLeasesRes>;
}
export interface PickTypeClass {
        'id'?: number;
        'firstName': string;
        'lastName': string;
}
export interface PublicApartamentDto {
        'id'?: number;
        'name': string;
        'bookingStatus'?: PublicApartamentDtoBookingStatusEnum;
        'propertyId': Array<PublicPropertyDto>;
}

export enum PublicApartamentDtoBookingStatusEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}

export interface PublicPropertyDto {
        'id'?: number;
        'name': string;
        'address': string;
}
export interface QueryApartamentDto {
        'name'?: string;
        'bookingStatuses'?: Array<QueryApartamentDtoBookingStatusesEnum>;
        'types'?: Array<QueryApartamentDtoTypesEnum>;
        'countBedroom'?: number;
        'countBathroom'?: number;
        'isKitchenAvailable'?: boolean;
        'isWiFi'?: boolean;
}

export enum QueryApartamentDtoBookingStatusesEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}
export enum QueryApartamentDtoTypesEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface QueryIds {
        'ids': Array<number>;
}
export interface ResponseFoundBookingDTO {
        'id': number;
        'name': string;
        'bookingStatuses'?: ResponseFoundBookingDTOBookingStatusesEnum;
        'property': string;
        'bookings': Array<FoundBookingData>;
}

export enum ResponseFoundBookingDTOBookingStatusesEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface ResponseFromBooking {
        'id': number;
        'customerId': Array<CustomerForBills>;
}
export interface ResponseSearchIncome {
        'id'?: number;
        'name': string;
        'type': ResponseSearchIncomeTypeEnum;
        'amount': number;
        'currency'?: string;
        'userEdited'?: string;
        'createdAt'?: string;
        'updatedAt'?: string;
        'apartamentId': BaseEntityShema;
        'customerId'?: CustomerForBills;
}

export enum ResponseSearchIncomeTypeEnum {
    COMMUNAL = 'COMMUNAL',
    RENT = 'RENT',
    OTHER = 'OTHER'
}

export interface ResultDashboard {
        'incomes': Array<IncomesData>;
        'earlyDeposits': Array<EarlyDepositsData>;
        'securityDeposits': Array<SecurityDepositsData>;
        'apartamentsStatuses': Array<ApartamentsStatusesData>;
        'expiringLeases': MonthsLeases;
        'expensesPeriod': Array<GroupedByPeriods>;
        'incomePeriod': Array<GroupedByPeriods>;
        'countApartments': number;
}
export interface SampleDto {
        'filename': string;
}

export enum SearchBillTypes {
    MAINTAINANCE = 'MAINTAINANCE',
    APPLIANCES = 'APPLIANCES',
    REPAIRS = 'REPAIRS',
    OTHER = 'OTHER',
    COMMUNAL = 'COMMUNAL',
    RENT = 'RENT'
}

export interface SearchBillsDto {
        'name'?: string;
        'type'?: Array<SearchBillTypes>;
        'amount'?: number;
        'dateFrom'?: string;
        'dateTo'?: string;
        'apartamentId'?: number;
        'limit'?: number;
        'offset'?: number;
}
export interface SearchBookingDto {
        'propertyId'?: number;
        'countGuests'?: number;
        'countBedroom'?: number;
        'countBathroom'?: number;
        'periodFrom': string;
        'periodTo': string;
        'bookingStatuses'?: Array<SearchBookingDtoBookingStatusesEnum>;
        'isTrusted'?: boolean;
        'availableOnlyApartaments'?: boolean;
}

export enum SearchBookingDtoBookingStatusesEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface SearchCommunalDTO {
        'apartamentId'?: number;
        'customerId'?: number;
        'limit'?: number;
        'offset'?: number;
}
export interface SecurityDepositsData {
        '_sum': SecuritySummary;
        'pledgeCurrency': string;
}
export interface SecuritySummary {
        'pledge': string;
}
export interface ServiceFieldsCommunal {
        'waterSum': number;
        'electricitySum': number;
}
export interface UpdateApartamentDto {
        'id'?: number;
        'name'?: string;
        'roomArea'?: number;
        'countBedroom'?: number;
        'countBathroom'?: number;
        'isWiFi'?: boolean;
        'isKitchenAvailable'?: boolean;
        'owner'?: string;
        'description'?: string;
        'note'?: Array<string>;
        'bookingStatus'?: UpdateApartamentDtoBookingStatusEnum;
        'type'?: UpdateApartamentDtoTypeEnum;
        'photos'?: Array<string>;
        'currency'?: string;
        'currencySymbol'?: string;
        'pricePerDay'?: number;
        'pricePerMounth'?: number;
        'userEdited'?: string;
        'isDeleted'?: boolean;
        'propertyId'?: number;
}

export enum UpdateApartamentDtoBookingStatusEnum {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    FREE = 'FREE'
}
export enum UpdateApartamentDtoTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface UpdateBillsExpenseDto {
        'name'?: string;
        'amount'?: number;
        'currency'?: string;
}
export interface UpdateBillsIncomeDto {
        'name'?: string;
        'amount'?: number;
        'currency'?: string;
}
export interface UpdateBookingDto {
        'typeCommission'?: UpdateBookingDtoTypeCommissionEnum;
        'agencyCommission'?: number;
        'payDayForLease'?: number;
        'countGuests'?: number;
        'pledgeCurrency'?: string;
        'pledge'?: number;
        'depositBefore'?: number;
        'depositCurrency'?: string;
        'hasPriceAllPeriod'?: boolean;
        'priceAllPeriod'?: number;
        'pricePerDay'?: number;
        'pricePerMounth'?: number;
        'currency'?: string;
        'periodFrom'?: string;
        'periodTo'?: string;
        'isTrusted'?: boolean;
        'includeWater'?: boolean;
        'includeElectricity'?: boolean;
        'includeHousekeeping'?: boolean;
        'customerId'?: number;
        'createdAt'?: string;
        'updatedAt'?: string;
        'currentStatus'?: UpdateBookingDtoCurrentStatusEnum;
}

export enum UpdateBookingDtoTypeCommissionEnum {
    PERCENT = 'PERCENT',
    SUM = 'SUM'
}
export enum UpdateBookingDtoCurrentStatusEnum {
    RESERVED = 'RESERVED',
    CHECK_OUT = 'CHECK_OUT',
    CHECK_IN = 'CHECK_IN',
    CANCELED = 'CANCELED'
}

export interface UpdateCommunalDto {
        'id'?: number;
        'tariffElectric'?: number;
        'valueElectric'?: number;
        'diffElectric'?: number;
        'actualPaymentWater'?: number;
        'tariffWater'?: number;
        'valueWater'?: number;
        'diffWater'?: number;
        'actualPaymentElectric'?: number;
        'isFullyPayment'?: boolean;
        'apartamentId'?: number;
        'customerId'?: number;
        'userEdited'?: string;
        'incomeId'?: number;
}
export interface UpdateCustomerDto {
        'firstName'?: string;
        'lastName'?: string;
        'email'?: string;
        'passportNumber'?: string;
        'phone'?: string;
        'docsPhoto'?: Array<string>;
        'isActive'?: boolean;
        'agent'?: string;
}
export interface UpdateNotificationDto {
        'hasRead'?: boolean;
}
export interface UpdatePropertyDto {
        'id'?: number;
        'name'?: string;
        'address'?: string;
        'description'?: string;
        'type'?: UpdatePropertyDtoTypeEnum;
        'isDeleted'?: boolean;
}

export enum UpdatePropertyDtoTypeEnum {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    TOWN_HOUSE = 'TOWN_HOUSE'
}

export interface UpdateUserDto {
        'id'?: number;
        'firstName'?: string;
        'lastName'?: string;
        'email'?: string;
        'role'?: UpdateUserDtoRoleEnum;
        'login'?: string;
        'password'?: string;
        'isActive'?: boolean;
        'countVisits'?: number;
}

export enum UpdateUserDtoRoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER'
}


export const ApartamentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                createApartament: async (createFrontApartamentDTO: CreateFrontApartamentDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createFrontApartamentDTO' is not null or undefined
            assertParamExists('createApartament', 'createFrontApartamentDTO', createFrontApartamentDTO)
            const localVarPath = `/apartaments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createFrontApartamentDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                findManyByIds: async (queryIds: QueryIds, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'queryIds' is not null or undefined
            assertParamExists('findManyByIds', 'queryIds', queryIds)
            const localVarPath = `/apartaments/post/find-by-ids`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(queryIds, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getAllByCompany: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/apartaments/getall/ap`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getApartamentsByParentId: async (parentId: string, queryApartamentDto: QueryApartamentDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'parentId' is not null or undefined
            assertParamExists('getApartamentsByParentId', 'parentId', parentId)
            // verify required parameter 'queryApartamentDto' is not null or undefined
            assertParamExists('getApartamentsByParentId', 'queryApartamentDto', queryApartamentDto)
            const localVarPath = `/apartaments/{parent_id}`
                .replace(`{${"parent_id"}}`, encodeURIComponent(String(parentId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(queryApartamentDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getForBooking: async (parentId: string, dates: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'parentId' is not null or undefined
            assertParamExists('getForBooking', 'parentId', parentId)
            // verify required parameter 'dates' is not null or undefined
            assertParamExists('getForBooking', 'dates', dates)
            const localVarPath = `/apartaments/booking/{parent_id}`
                .replace(`{${"parent_id"}}`, encodeURIComponent(String(parentId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dates) {
                localVarQueryParameter['dates'] = dates;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getOneApartament: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneApartament', 'id', id)
            const localVarPath = `/apartaments/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removeApartmentById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeApartmentById', 'id', id)
            const localVarPath = `/apartaments/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateApartamentById: async (id: string, updateApartamentDto: UpdateApartamentDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateApartamentById', 'id', id)
            // verify required parameter 'updateApartamentDto' is not null or undefined
            assertParamExists('updateApartamentById', 'updateApartamentDto', updateApartamentDto)
            const localVarPath = `/apartaments/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateApartamentDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const ApartamentsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ApartamentsApiAxiosParamCreator(configuration)
    return {
                async createApartament(createFrontApartamentDTO: CreateFrontApartamentDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createApartament(createFrontApartamentDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async findManyByIds(queryIds: QueryIds, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FoundApartamentDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findManyByIds(queryIds, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getAllByCompany(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApartamentsByCompany>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllByCompany(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getApartamentsByParentId(parentId: string, queryApartamentDto: QueryApartamentDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FoundApartamentDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getApartamentsByParentId(parentId, queryApartamentDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getForBooking(parentId: string, dates: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BaseEntityShema>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getForBooking(parentId, dates, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getOneApartament(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateApartamentDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOneApartament(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removeApartmentById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeApartmentById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateApartamentById(id: string, updateApartamentDto: UpdateApartamentDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateApartamentDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateApartamentById(id, updateApartamentDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const ApartamentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ApartamentsApiFp(configuration)
    return {
                createApartament(createFrontApartamentDTO: CreateFrontApartamentDTO, options?: any): AxiosPromise<void> {
            return localVarFp.createApartament(createFrontApartamentDTO, options).then((request) => request(axios, basePath));
        },
                findManyByIds(queryIds: QueryIds, options?: any): AxiosPromise<Array<FoundApartamentDTO>> {
            return localVarFp.findManyByIds(queryIds, options).then((request) => request(axios, basePath));
        },
                getAllByCompany(options?: any): AxiosPromise<ApartamentsByCompany> {
            return localVarFp.getAllByCompany(options).then((request) => request(axios, basePath));
        },
                getApartamentsByParentId(parentId: string, queryApartamentDto: QueryApartamentDto, options?: any): AxiosPromise<Array<FoundApartamentDTO>> {
            return localVarFp.getApartamentsByParentId(parentId, queryApartamentDto, options).then((request) => request(axios, basePath));
        },
                getForBooking(parentId: string, dates: Array<string>, options?: any): AxiosPromise<Array<BaseEntityShema>> {
            return localVarFp.getForBooking(parentId, dates, options).then((request) => request(axios, basePath));
        },
                getOneApartament(id: string, options?: any): AxiosPromise<CreateApartamentDto> {
            return localVarFp.getOneApartament(id, options).then((request) => request(axios, basePath));
        },
                removeApartmentById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeApartmentById(id, options).then((request) => request(axios, basePath));
        },
                updateApartamentById(id: string, updateApartamentDto: UpdateApartamentDto, options?: any): AxiosPromise<UpdateApartamentDto> {
            return localVarFp.updateApartamentById(id, updateApartamentDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface ApartamentsApiInterface {
        createApartament(createFrontApartamentDTO: CreateFrontApartamentDTO, options?: AxiosRequestConfig): AxiosPromise<void>;

        findManyByIds(queryIds: QueryIds, options?: AxiosRequestConfig): AxiosPromise<Array<FoundApartamentDTO>>;

        getAllByCompany(options?: AxiosRequestConfig): AxiosPromise<ApartamentsByCompany>;

        getApartamentsByParentId(parentId: string, queryApartamentDto: QueryApartamentDto, options?: AxiosRequestConfig): AxiosPromise<Array<FoundApartamentDTO>>;

        getForBooking(parentId: string, dates: Array<string>, options?: AxiosRequestConfig): AxiosPromise<Array<BaseEntityShema>>;

        getOneApartament(id: string, options?: AxiosRequestConfig): AxiosPromise<CreateApartamentDto>;

        removeApartmentById(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        updateApartamentById(id: string, updateApartamentDto: UpdateApartamentDto, options?: AxiosRequestConfig): AxiosPromise<UpdateApartamentDto>;

}

export class ApartamentsApi extends BaseAPI implements ApartamentsApiInterface {
        public createApartament(createFrontApartamentDTO: CreateFrontApartamentDTO, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).createApartament(createFrontApartamentDTO, options).then((request) => request(this.axios, this.basePath));
    }

        public findManyByIds(queryIds: QueryIds, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).findManyByIds(queryIds, options).then((request) => request(this.axios, this.basePath));
    }

        public getAllByCompany(options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).getAllByCompany(options).then((request) => request(this.axios, this.basePath));
    }

        public getApartamentsByParentId(parentId: string, queryApartamentDto: QueryApartamentDto, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).getApartamentsByParentId(parentId, queryApartamentDto, options).then((request) => request(this.axios, this.basePath));
    }

        public getForBooking(parentId: string, dates: Array<string>, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).getForBooking(parentId, dates, options).then((request) => request(this.axios, this.basePath));
    }

        public getOneApartament(id: string, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).getOneApartament(id, options).then((request) => request(this.axios, this.basePath));
    }

        public removeApartmentById(id: string, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).removeApartmentById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public updateApartamentById(id: string, updateApartamentDto: UpdateApartamentDto, options?: AxiosRequestConfig) {
        return ApartamentsApiFp(this.configuration).updateApartamentById(id, updateApartamentDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const AppApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                appControllerGetHello: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const AppApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AppApiAxiosParamCreator(configuration)
    return {
                async appControllerGetHello(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.appControllerGetHello(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const AppApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AppApiFp(configuration)
    return {
                appControllerGetHello(options?: any): AxiosPromise<void> {
            return localVarFp.appControllerGetHello(options).then((request) => request(axios, basePath));
        },
    };
};

export interface AppApiInterface {
        appControllerGetHello(options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class AppApi extends BaseAPI implements AppApiInterface {
        public appControllerGetHello(options?: AxiosRequestConfig) {
        return AppApiFp(this.configuration).appControllerGetHello(options).then((request) => request(this.axios, this.basePath));
    }
}


export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                getCurrentUser: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/current`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                login: async (loginUserDto: LoginUserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginUserDto' is not null or undefined
            assertParamExists('login', 'loginUserDto', loginUserDto)
            const localVarPath = `/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
                async getCurrentUser(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthCurrentUserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCurrentUser(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async login(loginUserDto: LoginUserDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginUserDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
                getCurrentUser(options?: any): AxiosPromise<AuthCurrentUserDto> {
            return localVarFp.getCurrentUser(options).then((request) => request(axios, basePath));
        },
                login(loginUserDto: LoginUserDto, options?: any): AxiosPromise<AuthResponseDto> {
            return localVarFp.login(loginUserDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface AuthApiInterface {
        getCurrentUser(options?: AxiosRequestConfig): AxiosPromise<AuthCurrentUserDto>;

        login(loginUserDto: LoginUserDto, options?: AxiosRequestConfig): AxiosPromise<AuthResponseDto>;

}

export class AuthApi extends BaseAPI implements AuthApiInterface {
        public getCurrentUser(options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).getCurrentUser(options).then((request) => request(this.axios, this.basePath));
    }

        public login(loginUserDto: LoginUserDto, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).login(loginUserDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const BookingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                checkFreeDates: async (apartamentId: string, beginDate: string, endDate: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apartamentId' is not null or undefined
            assertParamExists('checkFreeDates', 'apartamentId', apartamentId)
            // verify required parameter 'beginDate' is not null or undefined
            assertParamExists('checkFreeDates', 'beginDate', beginDate)
            // verify required parameter 'endDate' is not null or undefined
            assertParamExists('checkFreeDates', 'endDate', endDate)
            const localVarPath = `/booking/{apartamentId}/{beginDate}/{endDate}`
                .replace(`{${"apartamentId"}}`, encodeURIComponent(String(apartamentId)))
                .replace(`{${"beginDate"}}`, encodeURIComponent(String(beginDate)))
                .replace(`{${"endDate"}}`, encodeURIComponent(String(endDate)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                findOne: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('findOne', 'id', id)
            const localVarPath = `/booking/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                makeBooking: async (createBookingDto: CreateBookingDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBookingDto' is not null or undefined
            assertParamExists('makeBooking', 'createBookingDto', createBookingDto)
            const localVarPath = `/booking`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBookingDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removeBookingById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeBookingById', 'id', id)
            const localVarPath = `/booking/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                searchBooking: async (searchBookingDto: SearchBookingDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchBookingDto' is not null or undefined
            assertParamExists('searchBooking', 'searchBookingDto', searchBookingDto)
            const localVarPath = `/booking/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(searchBookingDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                unpdateBooking: async (id: string, updateBookingDto: UpdateBookingDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('unpdateBooking', 'id', id)
            // verify required parameter 'updateBookingDto' is not null or undefined
            assertParamExists('unpdateBooking', 'updateBookingDto', updateBookingDto)
            const localVarPath = `/booking/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateBookingDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const BookingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BookingApiAxiosParamCreator(configuration)
    return {
                async checkFreeDates(apartamentId: string, beginDate: string, endDate: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CheckedBookingDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.checkFreeDates(apartamentId, beginDate, endDate, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async findOne(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FindOneBookingDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findOne(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async makeBooking(createBookingDto: CreateBookingDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.makeBooking(createBookingDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removeBookingById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeBookingById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async searchBooking(searchBookingDto: SearchBookingDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ResponseFoundBookingDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.searchBooking(searchBookingDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async unpdateBooking(id: string, updateBookingDto: UpdateBookingDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.unpdateBooking(id, updateBookingDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const BookingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BookingApiFp(configuration)
    return {
                checkFreeDates(apartamentId: string, beginDate: string, endDate: string, options?: any): AxiosPromise<Array<CheckedBookingDTO>> {
            return localVarFp.checkFreeDates(apartamentId, beginDate, endDate, options).then((request) => request(axios, basePath));
        },
                findOne(id: string, options?: any): AxiosPromise<FindOneBookingDto> {
            return localVarFp.findOne(id, options).then((request) => request(axios, basePath));
        },
                makeBooking(createBookingDto: CreateBookingDto, options?: any): AxiosPromise<void> {
            return localVarFp.makeBooking(createBookingDto, options).then((request) => request(axios, basePath));
        },
                removeBookingById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeBookingById(id, options).then((request) => request(axios, basePath));
        },
                searchBooking(searchBookingDto: SearchBookingDto, options?: any): AxiosPromise<Array<ResponseFoundBookingDTO>> {
            return localVarFp.searchBooking(searchBookingDto, options).then((request) => request(axios, basePath));
        },
                unpdateBooking(id: string, updateBookingDto: UpdateBookingDto, options?: any): AxiosPromise<void> {
            return localVarFp.unpdateBooking(id, updateBookingDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface BookingApiInterface {
        checkFreeDates(apartamentId: string, beginDate: string, endDate: string, options?: AxiosRequestConfig): AxiosPromise<Array<CheckedBookingDTO>>;

        findOne(id: string, options?: AxiosRequestConfig): AxiosPromise<FindOneBookingDto>;

        makeBooking(createBookingDto: CreateBookingDto, options?: AxiosRequestConfig): AxiosPromise<void>;

        removeBookingById(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        searchBooking(searchBookingDto: SearchBookingDto, options?: AxiosRequestConfig): AxiosPromise<Array<ResponseFoundBookingDTO>>;

        unpdateBooking(id: string, updateBookingDto: UpdateBookingDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class BookingApi extends BaseAPI implements BookingApiInterface {
        public checkFreeDates(apartamentId: string, beginDate: string, endDate: string, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).checkFreeDates(apartamentId, beginDate, endDate, options).then((request) => request(this.axios, this.basePath));
    }

        public findOne(id: string, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).findOne(id, options).then((request) => request(this.axios, this.basePath));
    }

        public makeBooking(createBookingDto: CreateBookingDto, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).makeBooking(createBookingDto, options).then((request) => request(this.axios, this.basePath));
    }

        public removeBookingById(id: string, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).removeBookingById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public searchBooking(searchBookingDto: SearchBookingDto, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).searchBooking(searchBookingDto, options).then((request) => request(this.axios, this.basePath));
    }

        public unpdateBooking(id: string, updateBookingDto: UpdateBookingDto, options?: AxiosRequestConfig) {
        return BookingApiFp(this.configuration).unpdateBooking(id, updateBookingDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const CommunalApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                createNote: async (createCommunalFront: CreateCommunalFront, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createCommunalFront' is not null or undefined
            assertParamExists('createNote', 'createCommunalFront', createCommunalFront)
            const localVarPath = `/communal`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createCommunalFront, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                findByCustomer: async (customerId: string, apartamentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'customerId' is not null or undefined
            assertParamExists('findByCustomer', 'customerId', customerId)
            // verify required parameter 'apartamentId' is not null or undefined
            assertParamExists('findByCustomer', 'apartamentId', apartamentId)
            const localVarPath = `/communal/latest-customer/{customerId}/{apartamentId}`
                .replace(`{${"customerId"}}`, encodeURIComponent(String(customerId)))
                .replace(`{${"apartamentId"}}`, encodeURIComponent(String(apartamentId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getById', 'id', id)
            const localVarPath = `/communal/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getCommunalData: async (searchCommunalDTO: SearchCommunalDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchCommunalDTO' is not null or undefined
            assertParamExists('getCommunalData', 'searchCommunalDTO', searchCommunalDTO)
            const localVarPath = `/communal/serach`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(searchCommunalDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getLatest: async (apartamentID: string, isEdit?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apartamentID' is not null or undefined
            assertParamExists('getLatest', 'apartamentID', apartamentID)
            const localVarPath = `/communal/latest/{apartamentID}`
                .replace(`{${"apartamentID"}}`, encodeURIComponent(String(apartamentID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (isEdit !== undefined) {
                localVarQueryParameter['isEdit'] = isEdit;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateById: async (id: string, updateCommunalDto: UpdateCommunalDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateById', 'id', id)
            // verify required parameter 'updateCommunalDto' is not null or undefined
            assertParamExists('updateById', 'updateCommunalDto', updateCommunalDto)
            const localVarPath = `/communal/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateCommunalDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const CommunalApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CommunalApiAxiosParamCreator(configuration)
    return {
                async createNote(createCommunalFront: CreateCommunalFront, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNote(createCommunalFront, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async findByCustomer(customerId: string, apartamentId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LatestCustomerCommunal>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findByCustomer(customerId, apartamentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateCommunalDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getCommunalData(searchCommunalDTO: SearchCommunalDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateCommunalFront>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCommunalData(searchCommunalDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getLatest(apartamentID: string, isEdit?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LatestValuesCommunal>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLatest(apartamentID, isEdit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateById(id: string, updateCommunalDto: UpdateCommunalDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateById(id, updateCommunalDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const CommunalApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CommunalApiFp(configuration)
    return {
                createNote(createCommunalFront: CreateCommunalFront, options?: any): AxiosPromise<void> {
            return localVarFp.createNote(createCommunalFront, options).then((request) => request(axios, basePath));
        },
                findByCustomer(customerId: string, apartamentId: string, options?: any): AxiosPromise<Array<LatestCustomerCommunal>> {
            return localVarFp.findByCustomer(customerId, apartamentId, options).then((request) => request(axios, basePath));
        },
                getById(id: string, options?: any): AxiosPromise<CreateCommunalDto> {
            return localVarFp.getById(id, options).then((request) => request(axios, basePath));
        },
                getCommunalData(searchCommunalDTO: SearchCommunalDTO, options?: any): AxiosPromise<Array<CreateCommunalFront>> {
            return localVarFp.getCommunalData(searchCommunalDTO, options).then((request) => request(axios, basePath));
        },
                getLatest(apartamentID: string, isEdit?: boolean, options?: any): AxiosPromise<LatestValuesCommunal> {
            return localVarFp.getLatest(apartamentID, isEdit, options).then((request) => request(axios, basePath));
        },
                updateById(id: string, updateCommunalDto: UpdateCommunalDto, options?: any): AxiosPromise<void> {
            return localVarFp.updateById(id, updateCommunalDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface CommunalApiInterface {
        createNote(createCommunalFront: CreateCommunalFront, options?: AxiosRequestConfig): AxiosPromise<void>;

        findByCustomer(customerId: string, apartamentId: string, options?: AxiosRequestConfig): AxiosPromise<Array<LatestCustomerCommunal>>;

        getById(id: string, options?: AxiosRequestConfig): AxiosPromise<CreateCommunalDto>;

        getCommunalData(searchCommunalDTO: SearchCommunalDTO, options?: AxiosRequestConfig): AxiosPromise<Array<CreateCommunalFront>>;

        getLatest(apartamentID: string, isEdit?: boolean, options?: AxiosRequestConfig): AxiosPromise<LatestValuesCommunal>;

        updateById(id: string, updateCommunalDto: UpdateCommunalDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class CommunalApi extends BaseAPI implements CommunalApiInterface {
        public createNote(createCommunalFront: CreateCommunalFront, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).createNote(createCommunalFront, options).then((request) => request(this.axios, this.basePath));
    }

        public findByCustomer(customerId: string, apartamentId: string, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).findByCustomer(customerId, apartamentId, options).then((request) => request(this.axios, this.basePath));
    }

        public getById(id: string, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).getById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public getCommunalData(searchCommunalDTO: SearchCommunalDTO, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).getCommunalData(searchCommunalDTO, options).then((request) => request(this.axios, this.basePath));
    }

        public getLatest(apartamentID: string, isEdit?: boolean, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).getLatest(apartamentID, isEdit, options).then((request) => request(this.axios, this.basePath));
    }

        public updateById(id: string, updateCommunalDto: UpdateCommunalDto, options?: AxiosRequestConfig) {
        return CommunalApiFp(this.configuration).updateById(id, updateCommunalDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const CustomersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                createCustomer: async (createFrontCustomerDTO: CreateFrontCustomerDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createFrontCustomerDTO' is not null or undefined
            assertParamExists('createCustomer', 'createFrontCustomerDTO', createFrontCustomerDTO)
            const localVarPath = `/customers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createFrontCustomerDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                findCustomers: async (lastName?: string, phone?: string, isActive?: boolean, passportNumber?: string, limit?: number, offset?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/customers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (lastName !== undefined) {
                localVarQueryParameter['lastName'] = lastName;
            }

            if (phone !== undefined) {
                localVarQueryParameter['phone'] = phone;
            }

            if (isActive !== undefined) {
                localVarQueryParameter['isActive'] = isActive;
            }

            if (passportNumber !== undefined) {
                localVarQueryParameter['passportNumber'] = passportNumber;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getOneClient: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneClient', 'id', id)
            const localVarPath = `/customers/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateCustomerById: async (id: string, updateCustomerDto: UpdateCustomerDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateCustomerById', 'id', id)
            // verify required parameter 'updateCustomerDto' is not null or undefined
            assertParamExists('updateCustomerById', 'updateCustomerDto', updateCustomerDto)
            const localVarPath = `/customers/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateCustomerDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const CustomersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CustomersApiAxiosParamCreator(configuration)
    return {
                async createCustomer(createFrontCustomerDTO: CreateFrontCustomerDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createCustomer(createFrontCustomerDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async findCustomers(lastName?: string, phone?: string, isActive?: boolean, passportNumber?: string, limit?: number, offset?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FoundCustomersDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findCustomers(lastName, phone, isActive, passportNumber, limit, offset, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getOneClient(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateCustomerDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOneClient(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateCustomerById(id: string, updateCustomerDto: UpdateCustomerDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateFrontCustomerDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateCustomerById(id, updateCustomerDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const CustomersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CustomersApiFp(configuration)
    return {
                createCustomer(createFrontCustomerDTO: CreateFrontCustomerDTO, options?: any): AxiosPromise<void> {
            return localVarFp.createCustomer(createFrontCustomerDTO, options).then((request) => request(axios, basePath));
        },
                findCustomers(lastName?: string, phone?: string, isActive?: boolean, passportNumber?: string, limit?: number, offset?: number, options?: any): AxiosPromise<Array<FoundCustomersDTO>> {
            return localVarFp.findCustomers(lastName, phone, isActive, passportNumber, limit, offset, options).then((request) => request(axios, basePath));
        },
                getOneClient(id: string, options?: any): AxiosPromise<CreateCustomerDto> {
            return localVarFp.getOneClient(id, options).then((request) => request(axios, basePath));
        },
                updateCustomerById(id: string, updateCustomerDto: UpdateCustomerDto, options?: any): AxiosPromise<CreateFrontCustomerDTO> {
            return localVarFp.updateCustomerById(id, updateCustomerDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface CustomersApiInterface {
        createCustomer(createFrontCustomerDTO: CreateFrontCustomerDTO, options?: AxiosRequestConfig): AxiosPromise<void>;

        findCustomers(lastName?: string, phone?: string, isActive?: boolean, passportNumber?: string, limit?: number, offset?: number, options?: AxiosRequestConfig): AxiosPromise<Array<FoundCustomersDTO>>;

        getOneClient(id: string, options?: AxiosRequestConfig): AxiosPromise<CreateCustomerDto>;

        updateCustomerById(id: string, updateCustomerDto: UpdateCustomerDto, options?: AxiosRequestConfig): AxiosPromise<CreateFrontCustomerDTO>;

}

export class CustomersApi extends BaseAPI implements CustomersApiInterface {
        public createCustomer(createFrontCustomerDTO: CreateFrontCustomerDTO, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).createCustomer(createFrontCustomerDTO, options).then((request) => request(this.axios, this.basePath));
    }

        public findCustomers(lastName?: string, phone?: string, isActive?: boolean, passportNumber?: string, limit?: number, offset?: number, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).findCustomers(lastName, phone, isActive, passportNumber, limit, offset, options).then((request) => request(this.axios, this.basePath));
    }

        public getOneClient(id: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).getOneClient(id, options).then((request) => request(this.axios, this.basePath));
    }

        public updateCustomerById(id: string, updateCustomerDto: UpdateCustomerDto, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).updateCustomerById(id, updateCustomerDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const DashboardApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                getDashboardData: async (filterDashboardDto: FilterDashboardDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'filterDashboardDto' is not null or undefined
            assertParamExists('getDashboardData', 'filterDashboardDto', filterDashboardDto)
            const localVarPath = `/dashboard`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(filterDashboardDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const DashboardApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DashboardApiAxiosParamCreator(configuration)
    return {
                async getDashboardData(filterDashboardDto: FilterDashboardDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResultDashboard>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getDashboardData(filterDashboardDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const DashboardApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DashboardApiFp(configuration)
    return {
                getDashboardData(filterDashboardDto: FilterDashboardDto, options?: any): AxiosPromise<ResultDashboard> {
            return localVarFp.getDashboardData(filterDashboardDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface DashboardApiInterface {
        getDashboardData(filterDashboardDto: FilterDashboardDto, options?: AxiosRequestConfig): AxiosPromise<ResultDashboard>;

}

export class DashboardApi extends BaseAPI implements DashboardApiInterface {
        public getDashboardData(filterDashboardDto: FilterDashboardDto, options?: AxiosRequestConfig) {
        return DashboardApiFp(this.configuration).getDashboardData(filterDashboardDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const ExpensesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                findExpenses: async (searchBillsDto: SearchBillsDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchBillsDto' is not null or undefined
            assertParamExists('findExpenses', 'searchBillsDto', searchBillsDto)
            const localVarPath = `/bills-expenses/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(searchBillsDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getOneExpense: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneExpense', 'id', id)
            const localVarPath = `/bills-expenses/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removeExpensesById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeExpensesById', 'id', id)
            const localVarPath = `/bills-expenses/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                setExpenses: async (createBillsExpenseDto: CreateBillsExpenseDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBillsExpenseDto' is not null or undefined
            assertParamExists('setExpenses', 'createBillsExpenseDto', createBillsExpenseDto)
            const localVarPath = `/bills-expenses`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBillsExpenseDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateExpensesById: async (id: string, updateBillsExpenseDto: UpdateBillsExpenseDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateExpensesById', 'id', id)
            // verify required parameter 'updateBillsExpenseDto' is not null or undefined
            assertParamExists('updateExpensesById', 'updateBillsExpenseDto', updateBillsExpenseDto)
            const localVarPath = `/bills-expenses/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateBillsExpenseDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const ExpensesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ExpensesApiAxiosParamCreator(configuration)
    return {
                async findExpenses(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateBillsExpenseDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findExpenses(searchBillsDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getOneExpense(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateBillsExpenseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOneExpense(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removeExpensesById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeExpensesById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async setExpenses(createBillsExpenseDto: CreateBillsExpenseDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.setExpenses(createBillsExpenseDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateExpensesById(id: string, updateBillsExpenseDto: UpdateBillsExpenseDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateExpensesById(id, updateBillsExpenseDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const ExpensesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ExpensesApiFp(configuration)
    return {
                findExpenses(searchBillsDto: SearchBillsDto, options?: any): AxiosPromise<Array<CreateBillsExpenseDto>> {
            return localVarFp.findExpenses(searchBillsDto, options).then((request) => request(axios, basePath));
        },
                getOneExpense(id: string, options?: any): AxiosPromise<CreateBillsExpenseDto> {
            return localVarFp.getOneExpense(id, options).then((request) => request(axios, basePath));
        },
                removeExpensesById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeExpensesById(id, options).then((request) => request(axios, basePath));
        },
                setExpenses(createBillsExpenseDto: CreateBillsExpenseDto, options?: any): AxiosPromise<void> {
            return localVarFp.setExpenses(createBillsExpenseDto, options).then((request) => request(axios, basePath));
        },
                updateExpensesById(id: string, updateBillsExpenseDto: UpdateBillsExpenseDto, options?: any): AxiosPromise<void> {
            return localVarFp.updateExpensesById(id, updateBillsExpenseDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface ExpensesApiInterface {
        findExpenses(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig): AxiosPromise<Array<CreateBillsExpenseDto>>;

        getOneExpense(id: string, options?: AxiosRequestConfig): AxiosPromise<CreateBillsExpenseDto>;

        removeExpensesById(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        setExpenses(createBillsExpenseDto: CreateBillsExpenseDto, options?: AxiosRequestConfig): AxiosPromise<void>;

        updateExpensesById(id: string, updateBillsExpenseDto: UpdateBillsExpenseDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class ExpensesApi extends BaseAPI implements ExpensesApiInterface {
        public findExpenses(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig) {
        return ExpensesApiFp(this.configuration).findExpenses(searchBillsDto, options).then((request) => request(this.axios, this.basePath));
    }

        public getOneExpense(id: string, options?: AxiosRequestConfig) {
        return ExpensesApiFp(this.configuration).getOneExpense(id, options).then((request) => request(this.axios, this.basePath));
    }

        public removeExpensesById(id: string, options?: AxiosRequestConfig) {
        return ExpensesApiFp(this.configuration).removeExpensesById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public setExpenses(createBillsExpenseDto: CreateBillsExpenseDto, options?: AxiosRequestConfig) {
        return ExpensesApiFp(this.configuration).setExpenses(createBillsExpenseDto, options).then((request) => request(this.axios, this.basePath));
    }

        public updateExpensesById(id: string, updateBillsExpenseDto: UpdateBillsExpenseDto, options?: AxiosRequestConfig) {
        return ExpensesApiFp(this.configuration).updateExpensesById(id, updateBillsExpenseDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const IncomeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                billsIncomeControllerFindOne: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('billsIncomeControllerFindOne', 'id', id)
            const localVarPath = `/bills-income/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                findIncomes: async (searchBillsDto: SearchBillsDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchBillsDto' is not null or undefined
            assertParamExists('findIncomes', 'searchBillsDto', searchBillsDto)
            const localVarPath = `/bills-income/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(searchBillsDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getCustomer: async (apartamentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apartamentId' is not null or undefined
            assertParamExists('getCustomer', 'apartamentId', apartamentId)
            const localVarPath = `/bills-income/customer/{apartamentId}`
                .replace(`{${"apartamentId"}}`, encodeURIComponent(String(apartamentId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removeIncomeById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeIncomeById', 'id', id)
            const localVarPath = `/bills-income/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                setIncome: async (createBillsIncomeDto: CreateBillsIncomeDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBillsIncomeDto' is not null or undefined
            assertParamExists('setIncome', 'createBillsIncomeDto', createBillsIncomeDto)
            const localVarPath = `/bills-income`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBillsIncomeDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateincomeById: async (id: string, updateBillsIncomeDto: UpdateBillsIncomeDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateincomeById', 'id', id)
            // verify required parameter 'updateBillsIncomeDto' is not null or undefined
            assertParamExists('updateincomeById', 'updateBillsIncomeDto', updateBillsIncomeDto)
            const localVarPath = `/bills-income/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateBillsIncomeDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const IncomeApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = IncomeApiAxiosParamCreator(configuration)
    return {
                async billsIncomeControllerFindOne(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.billsIncomeControllerFindOne(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async findIncomes(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ResponseSearchIncome>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findIncomes(searchBillsDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getCustomer(apartamentId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseFromBooking>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCustomer(apartamentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removeIncomeById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeIncomeById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async setIncome(createBillsIncomeDto: CreateBillsIncomeDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseEntityShema>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.setIncome(createBillsIncomeDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateincomeById(id: string, updateBillsIncomeDto: UpdateBillsIncomeDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateincomeById(id, updateBillsIncomeDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const IncomeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = IncomeApiFp(configuration)
    return {
                billsIncomeControllerFindOne(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.billsIncomeControllerFindOne(id, options).then((request) => request(axios, basePath));
        },
                findIncomes(searchBillsDto: SearchBillsDto, options?: any): AxiosPromise<Array<ResponseSearchIncome>> {
            return localVarFp.findIncomes(searchBillsDto, options).then((request) => request(axios, basePath));
        },
                getCustomer(apartamentId: string, options?: any): AxiosPromise<ResponseFromBooking> {
            return localVarFp.getCustomer(apartamentId, options).then((request) => request(axios, basePath));
        },
                removeIncomeById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeIncomeById(id, options).then((request) => request(axios, basePath));
        },
                setIncome(createBillsIncomeDto: CreateBillsIncomeDto, options?: any): AxiosPromise<BaseEntityShema> {
            return localVarFp.setIncome(createBillsIncomeDto, options).then((request) => request(axios, basePath));
        },
                updateincomeById(id: string, updateBillsIncomeDto: UpdateBillsIncomeDto, options?: any): AxiosPromise<void> {
            return localVarFp.updateincomeById(id, updateBillsIncomeDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface IncomeApiInterface {
        billsIncomeControllerFindOne(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        findIncomes(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig): AxiosPromise<Array<ResponseSearchIncome>>;

        getCustomer(apartamentId: string, options?: AxiosRequestConfig): AxiosPromise<ResponseFromBooking>;

        removeIncomeById(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        setIncome(createBillsIncomeDto: CreateBillsIncomeDto, options?: AxiosRequestConfig): AxiosPromise<BaseEntityShema>;

        updateincomeById(id: string, updateBillsIncomeDto: UpdateBillsIncomeDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class IncomeApi extends BaseAPI implements IncomeApiInterface {
        public billsIncomeControllerFindOne(id: string, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).billsIncomeControllerFindOne(id, options).then((request) => request(this.axios, this.basePath));
    }

        public findIncomes(searchBillsDto: SearchBillsDto, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).findIncomes(searchBillsDto, options).then((request) => request(this.axios, this.basePath));
    }

        public getCustomer(apartamentId: string, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).getCustomer(apartamentId, options).then((request) => request(this.axios, this.basePath));
    }

        public removeIncomeById(id: string, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).removeIncomeById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public setIncome(createBillsIncomeDto: CreateBillsIncomeDto, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).setIncome(createBillsIncomeDto, options).then((request) => request(this.axios, this.basePath));
    }

        public updateincomeById(id: string, updateBillsIncomeDto: UpdateBillsIncomeDto, options?: AxiosRequestConfig) {
        return IncomeApiFp(this.configuration).updateincomeById(id, updateBillsIncomeDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const NotificationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                getAllActiveNotifications: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/notification`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                unpdateNotice: async (id: string, updateNotificationDto: UpdateNotificationDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('unpdateNotice', 'id', id)
            // verify required parameter 'updateNotificationDto' is not null or undefined
            assertParamExists('unpdateNotice', 'updateNotificationDto', updateNotificationDto)
            const localVarPath = `/notification/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateNotificationDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const NotificationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = NotificationApiAxiosParamCreator(configuration)
    return {
                async getAllActiveNotifications(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateNotificationDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActiveNotifications(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async unpdateNotice(id: string, updateNotificationDto: UpdateNotificationDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.unpdateNotice(id, updateNotificationDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const NotificationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = NotificationApiFp(configuration)
    return {
                getAllActiveNotifications(options?: any): AxiosPromise<Array<CreateNotificationDto>> {
            return localVarFp.getAllActiveNotifications(options).then((request) => request(axios, basePath));
        },
                unpdateNotice(id: string, updateNotificationDto: UpdateNotificationDto, options?: any): AxiosPromise<void> {
            return localVarFp.unpdateNotice(id, updateNotificationDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface NotificationApiInterface {
        getAllActiveNotifications(options?: AxiosRequestConfig): AxiosPromise<Array<CreateNotificationDto>>;

        unpdateNotice(id: string, updateNotificationDto: UpdateNotificationDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class NotificationApi extends BaseAPI implements NotificationApiInterface {
        public getAllActiveNotifications(options?: AxiosRequestConfig) {
        return NotificationApiFp(this.configuration).getAllActiveNotifications(options).then((request) => request(this.axios, this.basePath));
    }

        public unpdateNotice(id: string, updateNotificationDto: UpdateNotificationDto, options?: AxiosRequestConfig) {
        return NotificationApiFp(this.configuration).unpdateNotice(id, updateNotificationDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const PropertyApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                createProperty: async (createPropertyDto: CreatePropertyDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createPropertyDto' is not null or undefined
            assertParamExists('createProperty', 'createPropertyDto', createPropertyDto)
            const localVarPath = `/property`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createPropertyDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getAllProperties: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/property`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getOneProperty: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneProperty', 'id', id)
            const localVarPath = `/property/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removePropertyById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removePropertyById', 'id', id)
            const localVarPath = `/property/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updatePropertyById: async (id: string, updatePropertyDto: UpdatePropertyDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updatePropertyById', 'id', id)
            // verify required parameter 'updatePropertyDto' is not null or undefined
            assertParamExists('updatePropertyById', 'updatePropertyDto', updatePropertyDto)
            const localVarPath = `/property/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updatePropertyDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const PropertyApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PropertyApiAxiosParamCreator(configuration)
    return {
                async createProperty(createPropertyDto: CreatePropertyDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createProperty(createPropertyDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getAllProperties(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreatePropertyDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllProperties(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getOneProperty(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreatePropertyDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOneProperty(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removePropertyById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removePropertyById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updatePropertyById(id: string, updatePropertyDto: UpdatePropertyDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePropertyById(id, updatePropertyDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const PropertyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PropertyApiFp(configuration)
    return {
                createProperty(createPropertyDto: CreatePropertyDto, options?: any): AxiosPromise<void> {
            return localVarFp.createProperty(createPropertyDto, options).then((request) => request(axios, basePath));
        },
                getAllProperties(options?: any): AxiosPromise<Array<CreatePropertyDto>> {
            return localVarFp.getAllProperties(options).then((request) => request(axios, basePath));
        },
                getOneProperty(id: string, options?: any): AxiosPromise<CreatePropertyDto> {
            return localVarFp.getOneProperty(id, options).then((request) => request(axios, basePath));
        },
                removePropertyById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.removePropertyById(id, options).then((request) => request(axios, basePath));
        },
                updatePropertyById(id: string, updatePropertyDto: UpdatePropertyDto, options?: any): AxiosPromise<void> {
            return localVarFp.updatePropertyById(id, updatePropertyDto, options).then((request) => request(axios, basePath));
        },
    };
};

export interface PropertyApiInterface {
        createProperty(createPropertyDto: CreatePropertyDto, options?: AxiosRequestConfig): AxiosPromise<void>;

        getAllProperties(options?: AxiosRequestConfig): AxiosPromise<Array<CreatePropertyDto>>;

        getOneProperty(id: string, options?: AxiosRequestConfig): AxiosPromise<CreatePropertyDto>;

        removePropertyById(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        updatePropertyById(id: string, updatePropertyDto: UpdatePropertyDto, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class PropertyApi extends BaseAPI implements PropertyApiInterface {
        public createProperty(createPropertyDto: CreatePropertyDto, options?: AxiosRequestConfig) {
        return PropertyApiFp(this.configuration).createProperty(createPropertyDto, options).then((request) => request(this.axios, this.basePath));
    }

        public getAllProperties(options?: AxiosRequestConfig) {
        return PropertyApiFp(this.configuration).getAllProperties(options).then((request) => request(this.axios, this.basePath));
    }

        public getOneProperty(id: string, options?: AxiosRequestConfig) {
        return PropertyApiFp(this.configuration).getOneProperty(id, options).then((request) => request(this.axios, this.basePath));
    }

        public removePropertyById(id: string, options?: AxiosRequestConfig) {
        return PropertyApiFp(this.configuration).removePropertyById(id, options).then((request) => request(this.axios, this.basePath));
    }

        public updatePropertyById(id: string, updatePropertyDto: UpdatePropertyDto, options?: AxiosRequestConfig) {
        return PropertyApiFp(this.configuration).updatePropertyById(id, updatePropertyDto, options).then((request) => request(this.axios, this.basePath));
    }
}


export const UploadFileApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                getImage: async (name: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('getImage', 'name', name)
            const localVarPath = `/upload-file/get/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                removeImage: async (name: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('removeImage', 'name', name)
            const localVarPath = `/upload-file/del/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                uploadImageFile: async (file: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'file' is not null or undefined
            assertParamExists('uploadImageFile', 'file', file)
            const localVarPath = `/upload-file/upload`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const UploadFileApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UploadFileApiAxiosParamCreator(configuration)
    return {
                async getImage(name: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FileDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getImage(name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async removeImage(name: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeImage(name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async uploadImageFile(file: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SampleDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadImageFile(file, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const UploadFileApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UploadFileApiFp(configuration)
    return {
                getImage(name: string, options?: any): AxiosPromise<FileDto> {
            return localVarFp.getImage(name, options).then((request) => request(axios, basePath));
        },
                removeImage(name: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeImage(name, options).then((request) => request(axios, basePath));
        },
                uploadImageFile(file: any, options?: any): AxiosPromise<SampleDto> {
            return localVarFp.uploadImageFile(file, options).then((request) => request(axios, basePath));
        },
    };
};

export interface UploadFileApiInterface {
        getImage(name: string, options?: AxiosRequestConfig): AxiosPromise<FileDto>;

        removeImage(name: string, options?: AxiosRequestConfig): AxiosPromise<void>;

        uploadImageFile(file: any, options?: AxiosRequestConfig): AxiosPromise<SampleDto>;

}

export class UploadFileApi extends BaseAPI implements UploadFileApiInterface {
        public getImage(name: string, options?: AxiosRequestConfig) {
        return UploadFileApiFp(this.configuration).getImage(name, options).then((request) => request(this.axios, this.basePath));
    }

        public removeImage(name: string, options?: AxiosRequestConfig) {
        return UploadFileApiFp(this.configuration).removeImage(name, options).then((request) => request(this.axios, this.basePath));
    }

        public uploadImageFile(file: any, options?: AxiosRequestConfig) {
        return UploadFileApiFp(this.configuration).uploadImageFile(file, options).then((request) => request(this.axios, this.basePath));
    }
}


export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
                createNewUser: async (createUserDto: CreateUserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createUserDto' is not null or undefined
            assertParamExists('createNewUser', 'createUserDto', createUserDto)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getAll: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                getOneUser: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOneUser', 'id', id)
            const localVarPath = `/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                updateUserById: async (id: string, updateUserDto: UpdateUserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateUserById', 'id', id)
            // verify required parameter 'updateUserDto' is not null or undefined
            assertParamExists('updateUserById', 'updateUserDto', updateUserDto)
            const localVarPath = `/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
                usersControllerRemove: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('usersControllerRemove', 'id', id)
            const localVarPath = `/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
                async createNewUser(createUserDto: CreateUserDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNewUser(createUserDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getAll(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateUserDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAll(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async getOneUser(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateUserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOneUser(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async updateUserById(id: string, updateUserDto: UpdateUserDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUserById(id, updateUserDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
                async usersControllerRemove(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersControllerRemove(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
                createNewUser(createUserDto: CreateUserDto, options?: any): AxiosPromise<void> {
            return localVarFp.createNewUser(createUserDto, options).then((request) => request(axios, basePath));
        },
                getAll(options?: any): AxiosPromise<Array<CreateUserDto>> {
            return localVarFp.getAll(options).then((request) => request(axios, basePath));
        },
                getOneUser(id: string, options?: any): AxiosPromise<CreateUserDto> {
            return localVarFp.getOneUser(id, options).then((request) => request(axios, basePath));
        },
                updateUserById(id: string, updateUserDto: UpdateUserDto, options?: any): AxiosPromise<void> {
            return localVarFp.updateUserById(id, updateUserDto, options).then((request) => request(axios, basePath));
        },
                usersControllerRemove(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.usersControllerRemove(id, options).then((request) => request(axios, basePath));
        },
    };
};

export interface UsersApiInterface {
        createNewUser(createUserDto: CreateUserDto, options?: AxiosRequestConfig): AxiosPromise<void>;

        getAll(options?: AxiosRequestConfig): AxiosPromise<Array<CreateUserDto>>;

        getOneUser(id: string, options?: AxiosRequestConfig): AxiosPromise<CreateUserDto>;

        updateUserById(id: string, updateUserDto: UpdateUserDto, options?: AxiosRequestConfig): AxiosPromise<void>;

        usersControllerRemove(id: string, options?: AxiosRequestConfig): AxiosPromise<void>;

}

export class UsersApi extends BaseAPI implements UsersApiInterface {
        public createNewUser(createUserDto: CreateUserDto, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).createNewUser(createUserDto, options).then((request) => request(this.axios, this.basePath));
    }

        public getAll(options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).getAll(options).then((request) => request(this.axios, this.basePath));
    }

        public getOneUser(id: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).getOneUser(id, options).then((request) => request(this.axios, this.basePath));
    }

        public updateUserById(id: string, updateUserDto: UpdateUserDto, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).updateUserById(id, updateUserDto, options).then((request) => request(this.axios, this.basePath));
    }

        public usersControllerRemove(id: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersControllerRemove(id, options).then((request) => request(this.axios, this.basePath));
    }
}


