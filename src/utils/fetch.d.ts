// fetch.d.ts
declare module "../utils/fetch" {
  // Define types here if needed
  export function useFetch(url: string): {
    data: any;
    isLoading: boolean;
    error: boolean;
  };
}
