export function lowestPrice(values: (string | undefined)[]): number | null {
     const numbers = values
          .map((value) => Number(value))
          .filter((value) => Number.isFinite(value) && value > 0);
     return numbers.length > 0 ? Math.min(...numbers) : null;
}

export function formatRupiah(value: number | null): string | undefined {
     if (value === null) return undefined;
     return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}