import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Config, ConfigValidationError } from './types/config';
import { ConfigError } from './types/config';

/**
 * Validate the config structure
 */
function validateConfig(config: unknown): ConfigValidationError[] {
  const errors: ConfigValidationError[] = [];

  if (!config || typeof config !== 'object') {
    errors.push({
      field: 'root',
      message: 'Config must be an object',
      value: config,
    });
    return errors;
  }

  const configObj = config as Record<string, unknown>;

  // Validate packages
  if (!Array.isArray(configObj.packages)) {
    errors.push({
      field: 'packages',
      message: 'packages must be an array',
      value: configObj.packages,
    });
  } else {
    configObj.packages.forEach((pkg, index) => {
      if (!pkg || typeof pkg !== 'object') {
        errors.push({
          field: `packages[${index}]`,
          message: 'Each package must be an object',
          value: pkg,
        });
        return;
      }

      const packageObj = pkg as Record<string, unknown>;

      // Validate required fields
      const requiredFields = ['name', 'version', 'llms', 'pageBase'];
      requiredFields.forEach((field) => {
        if (typeof packageObj[field] !== 'string') {
          errors.push({
            field: `packages[${index}].${field}`,
            message: `${field} must be a string`,
            value: packageObj[field],
          });
        }
      });
    });
  }

  return errors;
}

/**
 * Load and validate config from a file
 */
export async function loadConfig(configPath: string): Promise<Config> {
  try {
    // Check if file exists
    if (!fs.existsSync(configPath)) {
      throw new ConfigError(
        `Config file not found: ${configPath}`,
        'FILE_NOT_FOUND'
      );
    }

    const ext = path.extname(configPath).toLowerCase();
    let parsedConfig: unknown;

    if (ext === '.js') {
      // Handle JavaScript config files
      try {
        // Convert to file URL for dynamic import
        const fileUrl = pathToFileURL(path.resolve(configPath)).href;
        // Use dynamic import to load the module
        const module = await import(fileUrl);
        parsedConfig = module.default || module;
      } catch (error) {
        throw new ConfigError(
          `Failed to load JavaScript config file: ${configPath}. Error: ${error instanceof Error ? error.message : String(error)}`,
          'INVALID_JS'
        );
      }
    } else if (ext === '.json') {
      // Handle JSON config files
      const configContent = fs.readFileSync(configPath, 'utf-8');
      try {
        parsedConfig = JSON.parse(configContent);
      } catch {
        throw new ConfigError(
          `Invalid JSON in config file: ${configPath}`,
          'INVALID_JSON'
        );
      }
    } else {
      throw new ConfigError(
        `Unsupported config file format: ${ext}. Only .js and .json files are supported.`,
        'UNSUPPORTED_FORMAT'
      );
    }

    // Validate the config structure
    const validationErrors = validateConfig(parsedConfig);
    if (validationErrors.length > 0) {
      throw new ConfigError(
        `Config validation failed: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`,
        'VALIDATION_FAILED',
        validationErrors
      );
    }

    const configObj = parsedConfig as Record<string, unknown>;

    // Ensure defaults for optional fields
    const config: Config = {
      packages: configObj.packages as Config['packages'] || [],
    };

    return config;
  } catch (error) {
    if (error instanceof ConfigError) {
      throw error;
    }
    throw new ConfigError(
      `Failed to load config from ${configPath}: ${error instanceof Error ? error.message : String(error)}`,
      'LOAD_FAILED'
    );
  }
}
