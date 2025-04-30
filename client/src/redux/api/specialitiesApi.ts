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
    }),
    getSpeciality: builder.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSpecialityMutation, useGetSpecialityQuery } =
  specialitiesApi;
