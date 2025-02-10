import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://your-api.com/api" }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
    }),
    uploadUserImage: builder.mutation<User, { id: string; image: File }>({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: `/users/${id}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserMutation, useUploadUserImageMutation } = userApi;
