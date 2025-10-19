export default function formatDate(dateStr: string): string {
  // "2025-10-01"
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}