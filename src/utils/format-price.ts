export function formatPrice(value?: string | number | null): string | null {
     if (value === undefined || value === null || value === "") return null;

     const amount = Number(value);
     if (!Number.isFinite(amount) || amount <= 0) return null;

     return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
     })
          .format(amount)
          .replace(/\s/g, " ");
}