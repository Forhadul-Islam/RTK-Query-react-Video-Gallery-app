import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideoById: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, err, arg) => {
        return [{ type: "Video", id: arg }];
      },
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}&id_ne=${id}`);
        const queryString = `/videos?${likes.join("&")}&_limit=4`;
        return queryString;
      },
      providesTags: (result, err, arg) => {
        return [{ type: "RelatedVideos", id: arg.id }];
      },
    }),
    addVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/videos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/videos/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [
          "Videos",
          { type: "Video", id: arg.id },
          { type: "RelatedVideos", id: arg.id },
        ];
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
