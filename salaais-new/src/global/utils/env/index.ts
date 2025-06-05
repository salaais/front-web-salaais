import type { EnvServerlessResponse } from '../../types/env';

let _env: EnvServerlessResponse | null = null;

export function setEnv(e: EnvServerlessResponse) {
  _env = e;
}

export async function loadEnv() {
  if (!_env) {
    const response = await fetch('/api/env');
    if (!response.ok) throw new Error('Failed to load environment variables');
    const data: EnvServerlessResponse = await response.json();
    setEnv(data);
  }
}

export function getEnv(): EnvServerlessResponse {
  if (!_env) {
    throw new Error(
      `[EnvError] Variáveis de ambiente ainda não foram carregadas.\n` +
      `→ Você está tentando acessar 'getEnv()' antes de 'await loadEnv()'.\n` +
      `→ Solução: certifique-se de que 'loadEnv()' foi chamado e concluído antes de acessar as variáveis.`
    );
  }
  return _env;
}

export const env = new Proxy({} as EnvServerlessResponse, {
  get(_, prop: string) {
    if (!_env) {
      throw new Error(`Environment variable '${prop}' not loaded yet`);
    }
    const value = _env[prop as keyof EnvServerlessResponse];
    if (value === undefined) {
      throw new Error(`Environment variable '${prop}' is missing`);
    }
    return value;
  },
});

