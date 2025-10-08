export class HttpError extends Error {
  constructor(
    public status: number,
    public url: string,
    public body: unknown,
    message?: string,
  ) {
    super(message ?? (body as { message: string }).message ?? `HTTP ${status}`);
    this.name = 'HttpError';
  }
}
