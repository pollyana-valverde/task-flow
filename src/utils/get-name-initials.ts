function getNameInitials(name: string): string {
  const parts = name.split(" ");
  const firstLetter = parts[0]?.[0] ?? "";
  const lastLetter = parts[parts.length - 1]?.[0] ?? "";

  return `${firstLetter}${lastLetter}`.toUpperCase();
}

export { getNameInitials };
