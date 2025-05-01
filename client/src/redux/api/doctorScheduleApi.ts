import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctorSchedule: builder.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
    getMySchedule: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/doctor-schedule/my-schedule",
          method: "GET",
          params: arg,
        };
      },
    }),
    getAllDoctorSchedule: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/doctor-schedule",
          method: "GET",
          params: arg,
        };
      },
    }),
  }),
});

export const { useCreateDoctorScheduleMutation, useGetAllDoctorScheduleQuery,useGetMyScheduleQuery } =
  doctorScheduleApi;
