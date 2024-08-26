import { type ClassValue, clsx } from "clsx"
import { SetURLSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateSearchParams = (
  newParams: Record<string, string | undefined>,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams
) => {
  const currentParams = Object.fromEntries(searchParams.entries());
  const mergedParams = { ...currentParams, ...newParams };

  // Remove any keys with undefined values (optional)
  Object.keys(mergedParams).forEach(
    (key) => mergedParams[key] === undefined && delete mergedParams[key]
  );

  // Convert mergedParams back to URLSearchParams
  const searchParamsObject = new URLSearchParams(
    mergedParams as Record<string, string>
  );

  setSearchParams(searchParamsObject);
};