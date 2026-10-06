const API_URL = process.env.WORDPRESS_API_URL;

type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: unknown;
};

// Saat development selalu ambil data terbaru.
// Di produksi, hasil disimpan 1 jam supaya halaman cepat.
const REVALIDATE_SECONDS = process.env.NODE_ENV === "development" ? 0 : 3600;

export async function wpFetch<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL belum diisi di .env.local");
  }

  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error ${res.status} di ${path}`);
  }

  const json = (await res.json()) as ApiResponse<T>;

  if (!json.success) {
    throw new Error(`WordPress API mengembalikan success=false di ${path}`);
  }

  return json.data;
}