import { HttpError } from './http-error'

export class InstanceHttp {
  constructor(private baseUrl: string) {}

  private async fetch<T>(
    url: string,
    options: RequestInit = {},
    token?: string | null,
  ): Promise<T> {
    const headers: HeadersInit = {
      ...(options.body && !(options.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const res = await globalThis.fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
    })

    if (!res.ok) {
      const text = await res.text()
      let payload: unknown
      try {
        payload = text ? JSON.parse(text) : undefined
      } catch {
        payload = { message: text }
      }

      if (typeof window === 'undefined') {
        console.error('HTTP error', res.status, res.statusText, res.url, payload)
      } else {
        console.warn('HTTP error', res.status, res.statusText)
      }

      throw new HttpError(res.status, res.url, payload)
    }

    return res.json() as Promise<T>
  }

  public get<T = unknown>(url: string, token?: string | null, headers?: HeadersInit): Promise<T> {
    return this.fetch<T>(url, { method: 'GET', headers }, token)
  }

  public post<T = unknown, U = unknown>(
    url: string,
    body: U,
    token?: string | null,
    headers?: HeadersInit,
  ): Promise<T> {
    const bodyToSend = body instanceof FormData ? body : JSON.stringify(body)

    return this.fetch<T>(url, { method: 'POST', body: bodyToSend, headers }, token)
  }

  public patch<T = unknown, U = unknown>(
    url: string,
    body: U,
    token?: string | null,
    headers?: HeadersInit,
  ): Promise<T> {
    const bodyToSend = body instanceof FormData ? body : JSON.stringify(body)

    return this.fetch<T>(url, { method: 'PATCH', body: bodyToSend, headers }, token)
  }

  public put<T = unknown, U = unknown>(
    url: string,
    body: U,
    token?: string | null,
    headers?: HeadersInit,
  ): Promise<T> {
    const bodyToSend = body instanceof FormData ? body : JSON.stringify(body)

    return this.fetch<T>(url, { method: 'PUT', body: bodyToSend, headers }, token)
  }

  public delete<T = unknown>(
    url: string,
    token?: string | null,
    headers?: HeadersInit,
  ): Promise<T> {
    return this.fetch<T>(url, { method: 'DELETE', headers }, token)
  }
}

export const pokemonApi = new InstanceHttp(import.meta.env.VITE_POKEMON_API || '')
