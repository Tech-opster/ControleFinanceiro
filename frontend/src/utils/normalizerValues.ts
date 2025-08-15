export type NormalizerConfig<T> = {
  [K in keyof T]?: (value: unknown) => T[K];
};

// Função para normalizar valores
export function normalizeValues<T>(
  values: Record<string, unknown>,
  config: NormalizerConfig<T>
): T {
  const result = {} as T;

  for (const key in values) {
    const typedKey = key as keyof T;

    if (config[typedKey]) {
      // Converte usando a função definida
      result[typedKey] = config[typedKey]!(values[key]);
    } else {
      // Mantém o valor original (com cast para o tipo esperado)
      result[typedKey] = values[key] as T[keyof T];
    }
  }

  return result;
}
