import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const specialitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpeciality: builder.mutation({
      query: (data) => ({
        url: "/specialties/create-specialites",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getSpeciality: builder.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    deleteSpeciality: builder.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialityMutation,
  useGetSpecialityQuery,
  useDeleteSpecialityMutation,
} = specialitiesApi;
