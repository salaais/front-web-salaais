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
    setError: (message: string | null) => void;
    navigate: (path: string) => void;
}

export interface LoginAppleResponse {
    access_token: string
}

