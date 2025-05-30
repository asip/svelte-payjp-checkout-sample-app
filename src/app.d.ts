// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payjpCheckoutOnCreated: ((response: any) => void) | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payjpCheckoutOnFailed: ((statusCode: any, errorResponse: any) => void) | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PayjpCheckout: any | null;
  }
}

export {};
