export function formatDatePtBr(d?: Date | string | null) {
  const dt = d ? new Date(d) : new Date();

  if (isNaN(dt.getTime())) return "";

  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dt.getUTCDate()).padStart(2, "0");

  return `${day}/${month}/${year}`; // DD-MM-YYYY
}
