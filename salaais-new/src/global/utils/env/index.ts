import { EnvServerlessResponse } from "../../types/env";

let env: EnvServerlessResponse | null = null;

export async function loadEnv() {
  if (!env) {
    const response = await fetch('/api/env');
    if (!response.ok) throw new Error('Failed to load environment variables');
    env = await response.json();
  }
}

export function getEnv(): EnvServerlessResponse {
  if (!env) throw new Error('Environment variables not loaded yet');
  return env;
}