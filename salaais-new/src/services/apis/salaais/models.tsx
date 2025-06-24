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

export interface UserCardResponse {
    id_usuario: number;
    username: string;
    nome: string;
    url_imagem_perfil: string;
    eu_sigo: boolean;
}

export interface UserCardsResponse {
    count?: number;
    page?: number;
    total?: number;
    data: UserCardResponse[]
}

export interface FullUserCardResponse {
    bio?: string
    seguidores: number
    seguindo: number
    desativado: boolean
    deletado: boolean
    data_criacao: string
    link_instagram?: string | null
    link_facebook?: string | null
}