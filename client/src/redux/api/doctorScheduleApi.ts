import { IMeta } from "@/types";
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

      transformResponse: (response: [], meta: IMeta) => {
        return {
          doctorSchedule: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteDoctorSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/doctor-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),

    getDoctorScheduleById: builder.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor-schedule/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDoctorScheduleQuery,
  useGetMyScheduleQuery,
  useDeleteDoctorScheduleMutation,
  useGetDoctorScheduleByIdQuery,
} = doctorScheduleApi;
