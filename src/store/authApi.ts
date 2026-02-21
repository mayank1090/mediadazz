import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://development.mediadazz.com/api/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    userLogin: builder.mutation<{ status: string; msg: string; token?: string }, FormData>({
      query: (formData) => ({
        url: 'userlogin',
        method: 'POST',
        body: formData,
      }),
    }),
    verifyOtp: builder.mutation<{ status: string; msg: string; token?: string }, FormData>({
      query: (formData) => ({
        url: 'verifyotp',
        method: 'POST',
        body: formData,
      }),
    }),
    userRegister: builder.mutation<{ status: string; msg: string; token?: string }, FormData>({
      query: (formData) => ({
        url: 'userregister',
        method: 'POST',
        body: formData,
      }),
    }),
    getUserDetails: builder.mutation<{ status: string; msg: string; user?: Record<string, unknown> }, FormData>({
      query: (formData) => ({
        url: 'getuserdetails',
        method: 'POST',
        body: formData,
      }),
    }),
    updateUserDetails: builder.mutation<{ status: string; msg: string }, FormData>({
      query: (formData) => ({
        url: 'updateuserdetails',
        method: 'POST',
        body: formData,
      }),
    }),
    getWishlist: builder.query<GetWishlistResponse, void>({
      query: () => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        
        return {
          url: 'get_wishlist',
          method: 'POST',
          body: formData,
        };
      },
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation<{ status: boolean; msg: string }, { product_id: string }>({
      query: ({ product_id }) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        formData.append('product_id', product_id);
        
        return {
          url: 'add_to_wishlist',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Wishlist'],
    }),
    updateWishlist: builder.mutation<{ status: boolean; msg: string }, { product_id: string }>({
      query: ({ product_id }) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        formData.append('product_id', product_id);
        
        return {
          url: 'update_wishlist',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted({ product_id }, { dispatch, queryFulfilled }) {
        // Optimistically update the cache by removing the item
        const patchResult = dispatch(
          authApi.util.updateQueryData('getWishlist', undefined, (draft) => {
            if (draft?.wishlist_data) {
              draft.wishlist_data = draft.wishlist_data.filter(
                (item) => item.product_slug !== product_id
              );
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic update
          patchResult.undo();
        }
      },
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export interface WishlistItem {
  product_price: string;
  product_name: string;
  product_image: string;
  product_slug: string;
  product_category: string;
  product_reach: string;
  product_reach_title: string;
  products_duration: string;
  product_city: string;
  product_locality: string;
  product_audience_list: string[];
}

export interface GetWishlistResponse {
  status: boolean;
  msg: string;
  wishlist_data: WishlistItem[];
}

export const {
  useUserLoginMutation,
  useVerifyOtpMutation,
  useUserRegisterMutation,
  useGetUserDetailsMutation,
  useUpdateUserDetailsMutation,
  useGetWishlistQuery,
  useLazyGetWishlistQuery,
  useAddToWishlistMutation,
  useUpdateWishlistMutation,
} = authApi;

export default authApi;
