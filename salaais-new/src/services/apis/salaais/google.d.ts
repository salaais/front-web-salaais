//apenas para tirar os erros de tipagem ESlint
export { };
declare global {
    namespace google.accounts.oauth2 {
        interface TokenResponse {
            access_token: string;
            expires_in: number;
            expires_at?: number;
            scope?: string;
            token_type?: string;
        }

        interface TokenClientOptions {
            client_id: string;
            scope?: string;
            callback: (response: TokenResponse) => void;
        }

        function initTokenClient(options: TokenClientOptions): {
            requestAccessToken: () => void;
        };
    }

    interface Window {
        google: typeof google;
    }
}

declare global {
  interface Window {
    google: typeof google;
  }
}
