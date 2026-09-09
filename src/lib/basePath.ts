/**
 * Prefixes a root-relative public asset path with the app's basePath.
 * Needed only for raw strings (<img src>, <a href>, data files) — Next's own
 * <Link>/<Image> components already handle basePath automatically.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
