import { useSendMessage } from "../useSendMessage";
import axios from "axios";
import { waitFor, renderHook, act } from "@testing-library/react";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));

jest.mock("axios");

describe("useSendMessage", () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const requestMessage = "Hi bot";

  it("should send a message and return a response", async () => {
    const responseData = { message: "Hello world!" };
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockResolvedValueOnce({ data: responseData });

    const { result } = renderHook(() => useSendMessage());

    act(() => {
      result.current.sendMessage(requestMessage);
    });

    expect(mockAxios.post).toBeCalledWith("chat", { message: requestMessage });
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.responseMessage).toBe(responseData.message);
    });
  });

  it("should send a message and return an error", async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockImplementation(() => {
      throw Error("new error");
    });

    const { result } = renderHook(() => useSendMessage());

    act(() => {
      result.current.sendMessage(requestMessage);
    });

    expect(mockAxios.post).toBeCalledWith("chat", { message: requestMessage });
    expect(mockAxios.post).toBeCalledTimes(1);

    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.responseMessage).toBe("");
  });

});
