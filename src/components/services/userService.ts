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

export interface Question {
  question_text: string;
  year: string;
  b: string | null;
  d: string | null;
  correct_answer: string;
  id: number;
  a: string | null;
  c: string | null;
  e: string | null;
  topic_id: number;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires: string;
  message: string;
}

export interface GetAQuestion {
  year: string;
  a: string;
  id: number;
  b: string;
  d: string;
  correct_answer: string;
  question_text: string;
  c: string;
  e: string;
  topic_id: number;
  detail?: string;
}

interface InstitutionsResponse {
  message: string;
  levels: string[];
}
interface AdmissionCutOffData {
  id: number;
  text: string;
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

export interface SubjectResponse {
  year: string;
  a: string;
  id: number;
  b: string;
  d: string;
  correct_answer: string;
  question_text: string;
  c: string;
  e: string | null;
  topic_id: number;
}

export interface TopicContent {
  topic_content: {
    id: number;
    content: string;
    subject_id: number;
    title: string;
    description: string;
    free: boolean;
  };
}

export interface UserDetails {
  id: number;
  email: string;
  phone_number: string | null;
  role: string;
  full_name: string;
  hashed_password: string;
  int_id: number;
  activated: boolean;
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

export interface SubjectResponse3 {
  subjects: Array<{
    id: number;
    name: string;
    topics: string[];
  }>;
}

interface ActivateAppResponse {
  success: boolean;
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
          body: formData.toString(), // important: stringify it
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
    cutOff: builder.query<AdmissionCutOffData, void>({
      query: () => ({
        url: "notes/cut-off-uni",
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
    getAllSubjectsWithTopics: builder.query<
      SubjectResponse3,
      { token: string }
    >({
      query: ({ token }) => ({
        url: "notes/all-subjects-with-topics",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAQuestion: builder.query<GetAQuestion, { token: string; q_id: number }>({
      query: ({ token, q_id }) => ({
        url: `pq/get-a-question?q_id=${q_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getQuestionByTopic: builder.query<
      SubjectResponse[],
      { token: string; topic_id: number }
    >({
      query: ({ token, topic_id }) => ({
        url: `pq/question-by-topic?topic_id=${topic_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getQuestionBySubject: builder.query<
      Question[],
      { token: string; subject_id: number }
    >({
      query: ({ token, subject_id }) => ({
        url: `pq/question-by-subject?subject_id=${subject_id}`,
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
      TopicContent,
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
    getUserInfo: builder.mutation<UserDetails, { token: string }>({
      query: ({ token }) => ({
        url: `user/info`,
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
  useGetAQuestionQuery,
  useGetQuestionByTopicQuery,
  useGetQuestionBySubjectQuery,
  useCutOffQuery,
  useGetUserInfoMutation,
  useGetAllSubjectsWithTopicsQuery,
} = userApi;
