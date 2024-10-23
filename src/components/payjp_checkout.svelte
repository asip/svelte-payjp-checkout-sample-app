<script lang="ts">
  interface CheckoutResponse {
    // card: any
    // created: number
    id: string;
    // livemode: boolean
    // object: string
    // used: boolean
  }

  interface CheckoutErrorResponse {
    // code: string
    message: string;
    // status: number // http (response) status code
    // type: string
  }

  interface PayjpCheckoutPayload {
    token: string;
  }

  interface PayjpCheckoutErrorPayload {
    statusCode: number;
    message: string;
  }

  let {
    dataKey,
    dataPartial,
    dataText,
    dataSubmitText,
    dataTokenName,
    dataPreviousToken,
    dataLang,
    dataNamePlaceholder,
    dataTenant,
    onCreatedHandler,
    onFailedHandler
  } = $props<{
    dataKey: string;
    dataPartial?: string;
    dataText?: string;
    dataSubmitText?: string;
    dataTokenName?: string;
    dataPreviousToken?: string;
    dataLang?: string;
    dataNamePlaceholder?: string;
    dataTenant?: string;
    onCreatedHandler: (payload: PayjpCheckoutPayload) => void;
    onFailedHandler: (payload: PayjpCheckoutErrorPayload) => void;
  }>();

  let script: HTMLScriptElement | null | undefined = null;
  let element: HTMLElement | null = null;

  $effect(() => {
    window.payjpCheckoutOnCreated = onCreateToken;
    window.payjpCheckoutOnFailed = onCreateTokenFailed;
    script = document.createElement('script');
    script.src = 'https://checkout.pay.jp/';
    script.dataset['onCreated'] = 'payjpCheckoutOnCreated';
    script.dataset['onFailed'] = 'payjpCheckoutOnFailed';
    script.dataset['key'] = dataKey;
    dataPartial ? (script.dataset['partial'] = dataPartial) : (script.dataset['partial'] = 'false');
    dataText && (script.dataset['text'] = dataText);
    dataSubmitText && (script.dataset['submitText'] = dataSubmitText);
    dataTokenName && (script.dataset['tokenName'] = dataTokenName);
    dataPreviousToken && (script.dataset['previousToken'] = dataPreviousToken);
    dataLang && (script.dataset['lang'] = dataLang);
    dataNamePlaceholder && (script.dataset['namePlaceholder'] = dataNamePlaceholder);
    dataTenant && (script.dataset['tenant'] = dataTenant);
    script.classList.add('payjp-button');

    element = document.querySelector('#payjp_dialog');
    element?.appendChild(script);

    return () => {
      element?.removeChild(script as Node);
      window.payjpCheckoutOnCreated = null;
      window.payjpCheckoutOnFailed = null;
      window.PayjpCheckout = null;
    };
  });

  const onCreateToken = (response: CheckoutResponse) => {
    const payload: PayjpCheckoutPayload = { token: response.id };
    onCreatedHandler(payload);
  };

  const onCreateTokenFailed = (statusCode: number, errorResponse: CheckoutErrorResponse) => {
    const payload: PayjpCheckoutErrorPayload = { statusCode, message: errorResponse.message };
    onFailedHandler(payload);
  };
</script>

<div id="payjp_dialog"></div>
