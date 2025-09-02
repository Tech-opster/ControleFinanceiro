export const validateRequired = <T extends Record<string, unknown>>(
  value: T
) => {
  // Retorna true se todos os campos do objeto estiverem preenchidos (exceto id)
  return Object.entries(value)
    .filter(([key]) => key !== "id") // ignora o campo id se existir
    .every(
      ([, v]) =>
        v !== undefined &&
        v !== null &&
        (typeof v !== "string" || v.trim() !== "") &&
        (!(v instanceof Date) || !isNaN(v.getTime())) &&
        (!Array.isArray(v) ||
          (v.length > 0 &&
            v.every(
              (item) =>
                item !== undefined &&
                item !== null &&
                !(typeof item === "string" && item.trim() === "")
            )))
    );
};

export const getInvalidFields = <T extends Record<string, unknown>>(
  value: T
): string[] => {
  return Object.entries(value)
    .filter(([key]) => key !== "id")
    .filter(([, v]) => {
      // Inverte a lógica - retorna campos que SÃO inválidos
      if (v === undefined || v === null) return true;
      if (typeof v === "string" && v.trim() === "") return true;
      if (v instanceof Date && isNaN(v.getTime())) return true;
      if (Array.isArray(v)) {
        return !(v.length > 0 && v.every(item => 
          item !== undefined &&
          item !== null &&
          !(typeof item === "string" && item.trim() === "")
        ));
      }
      return false;
    })
    .map(([key]) => key); // Retorna apenas os nomes dos campos
};