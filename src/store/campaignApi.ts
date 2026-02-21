import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://development.mediadazz.com/api/';

export interface OrderItem {
  order_productname: string;
  order_itemprice: string;
  order_startdate: string;
  order_enddate: string;
  order_priceonrequest: string;
}

export interface Order {
  order_id: string;
  orders_estimated_amount: string;
  orders_duration: string;
  orders_creative_check: string;
  order_date: string;
  order_amount: string;
  order_status: string;
  order_items: OrderItem[];
}

export interface GetOrderListResponse {
  status: string;
  msg?: string;
  orders?: Order[];
}

export interface PlanCampaignResponse {
  status: boolean;
  msg?: string;
  campaign_id?: string;
  // Add other fields returned by your API if needed
}

export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    planCampaign: builder.mutation<PlanCampaignResponse, FormData>({
      query: (formData) => ({
        url: 'plan_campaign',
        method: 'POST',
        body: formData,
      }),
    }),
    getOrderList: builder.query<GetOrderListResponse, void>({
      query: () => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        
        return {
          url: 'getorderlist',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { usePlanCampaignMutation, useGetOrderListQuery } = campaignApi;

export default campaignApi;