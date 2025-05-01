import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        data,
        contentType: "multipart/formdata",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMyProfileMutation } = userApi;
