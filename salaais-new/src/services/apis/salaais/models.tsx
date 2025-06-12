export interface LoginResponse {
    access_token: string
}

export interface RegisterRequest {
    username: string
    nome: string
    email: string
    password: string
}

export interface LoginGoogleParams {
    setIsLoading: (loading: boolean) => void;
    navigate: (path: string) => void;
}
export interface LoginAppleParams {
    setIsLoading: (loading: boolean) => void;
}

export interface LoginAppleSessionTokenParams {
    sessionToken: string;
    setIsLoading: (loading: boolean) => void;
    navigate: (path: string) => void;
}

export interface LoginAppleResponse {
    nome: string,
    email: string,
    access_token: string,
}
export interface loginWithGoogleResponse {
    access_token: string,
}

export interface ErrorRegisterResponse {
    errors_description?: string[];
}
