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
    permissoes: PermissioesFullUserCard[]
}
export interface PermissioesFullUserCard {
    key_permissao: string;
    nome_permissao: string;
    id_permissao_usuario: number;
    url_imagem: string;
    data_inicio: string | null;
    data_fim: string | null;
    ativo: boolean | null;
    data_criacao: string | null;
}

export interface AccessTokenResponse {
    access_token: string
}

export interface PermissaoDetalhada {
    id: number;
    id_key: number;
    key: string;
    ativo: boolean;
    data_criacao: string;
    data_inicio: string | null;
    data_fim: string | null;
}

export interface DadosUsuarioPorTokenResponse {
    id_usuario: number;
    email: string;
    nome: string;
    username: string;
    bio: string;
    tipo_login: string;
    data_criacao_usuario: string;
    data_atualizacao_usuario: string;
    id_subscription_stripe: string;
    deletado: boolean;
    desativado: boolean;
    id_google: string | null;
    url_imagem_perfil: string | null;
    permissoes_ativas: string[];
    regras_ativas: string[];
    permissoes: PermissaoDetalhada[];
    criacao_token: number;
    expiracao_token: number;
}

export interface CreateUserPermissionRequest {
    id_usuario: number,
    key_permissao: string;
    data_inicio: string | null;
    data_fim: string | null;
}

export interface getPermissaoResponse {
    key: string,
    name: string;
}

export interface UserDataByTokenResponse {
    id_usuario: number;
    criacao_token: number;
    expiracao_token: number;
    email: string;
    bio: string | null;
    username: string;
    nome: string;
    tipo_login: string;
    data_atualizacao_usuario: string; // ISO 8601 format (UTC)
    data_criacao_usuario: string;     // ISO 8601 format (UTC)
    id_subscription_stripe: string | null;
    deletado: boolean;
    desativado: boolean;
    id_google: string | null;
    url_imagem_perfil: string | null;
    permissoes_ativas: string[];
    regras_ativas: string[];
    permissoes: {
        id: number;
        id_key: number;
        key: string;
        ativo: boolean;
        data_criacao: string;   // ISO 8601 format (UTC)
        data_inicio: string | null;
        data_fim: string | null;
    }[];
}

export interface GetPlansResponse {
    key: string
    titulo: string
    url_imagem: string
    stripe_price_id: string
    topicos_do_plano: string[]
    preco_antigo: number | null
    preco: number | null
    tipo_pagamento: string
    moeda: string
    duracao_plano_em_dias: number
    publico: boolean
    compravel: boolean
}
