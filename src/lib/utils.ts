import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDateTime(date?: Date): string {
  const now = date || new Date();
  return now.toLocaleString("en-US", {
    weekday: "long", // Full weekday name (e.g., Friday)
    year: "numeric", // Full numeric year (e.g., 2023)
    month: "long", // Full month name (e.g., February)
    day: "numeric", // Numeric day (e.g., 10)
    hour: "numeric", // Hour with AM/PM
    minute: "2-digit", // Two-digit minute
    hour12: true, // Use 12-hour format with AM/PM
  });
}

export function toKebabCase(str: string): string {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export function getArrayPaths(obj: Record<string, any>, prefix = ""): string[] {
  let paths: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}-${key}` : key;

    // If the value is an array, add the path
    if (Array.isArray(value)) {
      paths.push(newPrefix);
    }
    // If the value is an object, recurse deeper
    else if (typeof value === "object" && value !== null) {
      paths = paths.concat(getArrayPaths(value, newPrefix));
    }
  }

  return paths;
}
