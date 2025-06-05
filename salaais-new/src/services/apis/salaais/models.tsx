declare global {
    interface Window {
        google: any;
    }
}

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

export interface LoginAppleResponse {
    nome: string,
    email: string,
    access_token: string,
}

