import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./api";

// Define interfaces for the endpoints
interface CreateUserRequestBody {
  email: string;
  full_name: string;
  institution_id: string;
  password: string;
  phone_number: string;
  role: string;
}

interface CreateUserResponse {
  message: string;
  access_token: string;
  token_type: string;
  token_expires: string;
}

interface LoginRequestBody {
  username: string;
  grant_type: string;
  password: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires: string;
  message: string;
}

interface InstitutionsResponse {
  message: string;
  levels: string[];
}

interface RequestOtpRequestBody {
  email: string;
}

interface RequestOtpResponse {
  message: string;
  otp_code: string;
}

interface VerifyOtpRequestBody {
  email: string;
  new_password: string;
  otp_code: string;
}

interface VerifyOtpResponse {
  message: string;
}

interface SubjectResponse {
  [key: string]: string;
}

export interface SubjectResponse1 {
  name: string;
  id: number;
}

export interface SubjectResponse2 {
  id: number;
  title: string;
  free: boolean;
}

interface ActivateAppResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequestBody>({
      query: (body) => ({
        url: "auth/",
        method: "POST",
        body,
      }),
    }),
    // login: builder.mutation<LoginResponse, LoginRequestBody>({
    //   query: (body) => ({
    //     url: "auth/token",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    login: builder.mutation<LoginResponse, LoginRequestBody>({
      query: (body) => {
        const formData = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: "auth/token",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
    }),
    getAllInstitutions: builder.query<InstitutionsResponse, void>({
      query: () => ({
        url: "auth/get-instituions",
        method: "GET",
      }),
    }),
    requestOtp: builder.mutation<RequestOtpResponse, RequestOtpRequestBody>({
      query: (body) => ({
        url: "auth/passw-reset-request",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequestBody>({
      query: (body) => ({
        url: "auth/passw-reset-confirm",
        method: "POST",
        body,
      }),
    }),
    getAllSubjects: builder.query<SubjectResponse1[], { token: string }>({
      query: ({ token }) => ({
        url: "notes/all-subjects",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSubjectTopic: builder.query<
      SubjectResponse2[],
      { subject_id: number; token: string }
    >({
      query: ({ subject_id, token }) => ({
        url: `notes/course-topic?subject_id=${subject_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getTopicContentDetails: builder.query<
      SubjectResponse,
      { topic_id: number; token: string }
    >({
      query: ({ topic_id, token }) => ({
        url: `notes/topic-content?topic_id=${topic_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    activateApp: builder.mutation<
      ActivateAppResponse,
      { pin: string; token: string }
    >({
      query: ({ pin, token }) => ({
        url: `user/activate-app?pin=${pin}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetAllInstitutionsQuery,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useGetAllSubjectsQuery,
  useGetSubjectTopicQuery,
  useGetTopicContentDetailsQuery,
  useActivateAppMutation,
} = userApi;
