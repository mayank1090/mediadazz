import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://development.mediadazz.com/api/';

export interface ProductDetails {
  product_name: string;
  product_price: string;
  category_name: string;
  category_url: string;
  sub_category_name: string;
  sub_category_url: string;
  product_descritption: string;
  product_city: string;
  product_locality: string;
  product_maps: {
    maps_link: string;
    maps_latitude: string;
    maps_longitude: string;
  };
  product_minimum_booking_duration: string;
  product_reach_count: string;
  product_reach_type: string;
  pdts: string;
  product_reach_duration: string;
  product_urlslug: string;
  porduct_display_type: string;
  product_descritption_two: string;
  products_sku: string | null;
}

export interface Metadata {
  title: string;
  description: string;
  keywords: string;
  slug: string;
  ogtype: string;
}

export interface FAQItem {
  faq_question: string;
  faq_answer: string;
}

export interface TargetAudienceItem {
  audience?: string;
  [key: string]: unknown;
}

export interface PointsToConsiderItem {
  points?: string;
  point?: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface MediaDazzInsight {
  status: string;
  reason: string;
}

export interface AudienceInsight {
  audience_type: string;
  reason: string;
}

export interface BusinessInsight {
  business_type: string;
  reason: string;
}

export interface SameSellerListing {
  product_name: string;
  product_price: string;
  categories_name: string;
  products_reach_count: string;
  product_reach_type: string;
  productimg: string;
  product_url?: string;
  feature_list: TargetAudienceItem[];
}

export interface ProductResponse {
  status: string;
  productdetails: ProductDetails;
  metadata: Metadata;
  product_images: string[];
  faq_list: FAQItem[];
  target_audience_list: TargetAudienceItem[];
  product_points_to_consider: PointsToConsiderItem[];
  mediadazz_insights?: MediaDazzInsight[];
  audience_insights?: AudienceInsight[];
  business_insights?: BusinessInsight[];
  same_seller_listing: {
    status: string;
    data: SameSellerListing[];
  };
}

export interface ViewProductResponse {
  data: ProductResponse[];
}

export interface PopularListingResponse {
  status: string;
  data: SameSellerListing[];
}

export interface CartItem {
  product_id: string;
  product_price: number;
  product_name: string;
  product_img: string;
  product_purl: string;
  product_priceonrequest: string;
  product_catename: string;
  product_reach: string;
  product_startdate: string | null;
  product_enddate: string | null;
  product_city: string;
  product_locality: string;
  wishlist: boolean;
  [key: string]: unknown;
}

export interface GetCartDataResponse {
  status: string;
  msg: string;
  cartdata?: CartItem[];
  total_price?: number;
}

export interface SearchProductItem {
  product_name: string;
  product_price: string;
  product_id: string;
  product_slug_url: string;
  categories_name: string;
  subcategories_name: string;
  products_reach_count: string;
  product_reach_type: string | null;
  product_reach_duration: string | null;
  productimg: string;
}

export interface SearchResponse {
  status: string;
  products_list: SearchProductItem[];
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProduct: builder.query<ViewProductResponse, string>({
      query: (slug) => `viewproduct/${slug}`,
    }),
    getPopularListing: builder.query<PopularListingResponse, string>({
      query: (city) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token');
        if (token) {
          formData.append('token', token);
        }
        
        return {
          url: `getpopularlisting/${city}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    addToCart: builder.mutation<{ status: string; msg: string }, { product_id: string }>({
      query: ({ product_id }) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        formData.append('product_id', product_id);
        
        return {
          url: 'addtocart',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getCartData: builder.query<GetCartDataResponse, void>({
      query: () => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        
        return {
          url: 'getcartdata',
          method: 'POST',
          body: formData,
        };
      },
    }),
    searchProducts: builder.query<SearchResponse, string>({
      query: (searchQuery) => {
        const formData = new FormData();
        formData.append('search', searchQuery);
        
        return {
          url: 'searchbar',
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateCart: builder.mutation<{ status: string; msg: string }, { product_id: string; startdate?: string; enddate?: string }>({
      query: ({ product_id, startdate, enddate }) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        formData.append('product_id', product_id);
        if (startdate) {
          formData.append('startdate', startdate);
        }
        if (enddate) {
          formData.append('enddate', enddate);
        }
        
        return {
          url: 'updatecart',
          method: 'POST',
          body: formData,
        };
      },
    }),
    placeOrder: builder.mutation<{ status: string; msg: string }, { duration?: string; estimatedamount?: number; creativecheck?: boolean }>({
      query: ({ duration, estimatedamount, creativecheck }) => {
        const formData = new FormData();
        const token = localStorage.getItem('auth_token') || '';
        formData.append('token', token);
        if (duration) {
          formData.append('duration', duration);
        }
        if (estimatedamount) {
          formData.append('estimatedamount', estimatedamount.toString());
        }
        if (creativecheck !== undefined) {
          formData.append('creativecheck', creativecheck ? 'true' : 'false');
        }
        
        return {
          url: 'placeorder',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetProductQuery, useGetPopularListingQuery, useLazyGetPopularListingQuery, useAddToCartMutation, useGetCartDataQuery, useLazySearchProductsQuery, useUpdateCartMutation, usePlaceOrderMutation } = productApi;

export default productApi;


