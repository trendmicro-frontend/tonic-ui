export interface Package {
  name: string;
  version: string;
  llms: string;
  pageBase: string;
}

export interface Config {
  packages: Package[];
}

export interface ConfigLoadResult {
  config: Config;
  source: 'file' | 'default';
  path?: string;
}

export interface ConfigValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export class ConfigError extends Error {
  public readonly code: string;
  public readonly validationErrors?: ConfigValidationError[];

  constructor(message: string, code: string, validationErrors?: ConfigValidationError[]) {
    super(message);
    this.name = 'ConfigError';
    this.code = code;
    this.validationErrors = validationErrors;
  }
}
