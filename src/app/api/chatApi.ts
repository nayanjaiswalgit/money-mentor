import apiSlice from "../apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBotResponse: builder.mutation({
      query: (message) => ({
        url: "finassist/process-ai/",
        method: "POST",
        body: {
          input_type: "text",
          input_text: message,
        },
      }),
    }),
  }),
});

export const { useGetBotResponseMutation } = chatApi;
