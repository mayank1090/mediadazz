import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://development.mediadazz.com/api/';

export interface GetCategoryRequest {
  category: string;
  category_type: string;
  page: number;
  filters?: Record<string, string[]>;
}

export interface ListingItem {
  listing_title: string;
  listing_image: string;
  listing_url: string;
  listing_category: string;
  listing_subcategory: string | null;
  listing_sku: string | null;
  listing_description: string;
  listing_list: {
    locality: string | null;
    reach_count: string;
    reach_type: string | null;
    display: string;
    size: string;
    city: string;
    event: string | null;
    event_date: string;
    broadcast: string | null;
    frequency: string | null;
    days: string;
    duration: string;
  };
  listing_latitude: number | null;
  listing_longitude: number | null;
  listing_product_id?: string;
  is_wishlist?: boolean; // Optional field to indicate if the item is in the wishlist
}

export interface SubCategory {
  sub_category_name: string;
  sub_category_image: string;
  sub_category_slug: string;
}

export interface SubCategoryDetails {
  sub_category_image: string;
  heading: string;
  sub_heading: string;
}

export interface GetCategoryResponse {
  total_count: number;
  product_list: {
    status: string;
    listings: ListingItem[];
  };
  total_pages: number;
  current_page: string;
  sub_category_list: SubCategory[];
  sub_category_details?: SubCategoryDetails; // Only present when category_type is 'subcategory'
  // Fields at root level when category_type is 'subcategory'
  sub_category_image?: string;
  heading?: string;
  sub_heading?: string;
}

export interface GetFiltersRequest {
  category_name: string;
  category_type: string;
}

export interface SubcategoryFilter {
  subcategories_urlslug: string;
  subcategories_name: string;
  subcategories_status: string;
}

export interface LocalityFilter {
  locality_id: string;
  locality_name: string;
  locality_status: string;
}

export interface AudienceFilter {
  pat_id: string;
  pat_title: string;
}

export interface NationalityFilter {
  pan_id: string;
  pan_title: string;
}

export interface IncomeFilter {
  pai_id: string;
  pai_title: string;
}

export interface GetFiltersResponse {
  subcategory: SubcategoryFilter[];
  locality: LocalityFilter[];
  audience: AudienceFilter[];
  nationality: NationalityFilter[];
  income: IncomeFilter[];
  minprice: string;
  maxprice: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategory: builder.query<GetCategoryResponse, GetCategoryRequest>({
      query: (params) => {
        const formData = new FormData();
        formData.append('category', params.category);
        formData.append('category_type', params.category_type);
        formData.append('page', params.page.toString());
        
        // Dynamically append filter arrays if they exist
        if (params.filters) {
          Object.entries(params.filters).forEach(([key, values]) => {
            // Append the array as a JSON string for a single key-value pair
            formData.append(key, JSON.stringify(values));
          });
        }
        
        return {
          url: 'getcategory',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getFilters: builder.query<GetFiltersResponse, GetFiltersRequest>({
      query: (params) => {
        const formData = new FormData();
        formData.append('category_name', params.category_name);
        formData.append('category_type', params.category_type);
        
        return {
          url: 'getfilters',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetCategoryQuery, useLazyGetCategoryQuery, useGetFiltersQuery } = categoryApi;

export default categoryApi;

