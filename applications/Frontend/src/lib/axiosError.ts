import { AxiosError } from 'axios';

const axiosError = {
  async Error(error: AxiosError): Promise<never> {
    if (error.response) {
      const { status, data } = error.response;

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        code: status.toString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (data as any).key
      });
    }

    return Promise.reject(error);
  }
};

export default axiosError;
