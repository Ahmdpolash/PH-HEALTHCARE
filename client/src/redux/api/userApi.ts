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
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth//change-password",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth//forgot-password",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth//reset-password",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMyProfileMutation,useChangePasswordMutation,useForgotPasswordMutation,useResetPasswordMutation } = userApi;
