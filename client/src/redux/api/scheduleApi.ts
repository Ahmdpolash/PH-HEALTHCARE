import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { ISchedule } from "@/types/schedule";
import { IMeta } from "@/types";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedule/create-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    getAllSchedules: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),
    getScheduleById: builder.query({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "GET",
      }),
    }),

    deleteSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
  useGetScheduleByIdQuery,
} = scheduleApi;
