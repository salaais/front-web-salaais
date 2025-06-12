//apenas para tirar os erros de tipagem ESlint
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (options: {
            client_id: string;
            scope?: string;
            callback: (response: {
              access_token: string;
              expires_in: number;
              expires_at?: number;
              scope?: string;
              token_type?: string;
            }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };
  }
}