import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes, getRouteBySlug } from "@/lib/wordpress/routes";
import { getArmadaList } from "@/lib/wordpress/armada";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { matchArmada } from "@/utils/match-armada";

export default async function CmsTestPage() {
     const config = await getSiteConfig();
     const routes = await getRoutes();
     const satuRute = await getRouteBySlug("surabaya-malang");
     const armadaList = await getArmadaList();
     const armadaRute = matchArmada(satuRute.acf?.armada, armadaList);

     return (
          <main className="p-8">
               <h1 className="text-3xl font-bold">Uji koneksi CMS</h1>
               <p className="mt-4">WhatsApp: {config.contact?.whatsapp || "(kosong)"}</p>
               <p>Telepon: {config.contact?.phone || "(kosong)"}</p>
               <p>Email: {config.contact?.email || "(kosong)"}</p>
               <p>Alamat: {config.address?.full || "(kosong)"}</p>

               <h2 className="mt-8 text-2xl font-bold">Daftar rute ({routes.length})</h2>
               <ul className="list-disc pl-6">
                    {routes.map((r) => (
                         <li key={r.id}>
                              {decodeHtml(r.title)} | slug: {r.slug} | tarif:{" "}
                              {formatPrice(r.acf?.tarif) ?? "(kosong)"}
                         </li>
                    ))}
               </ul>

               <h2 className="mt-8 text-2xl font-bold">Satu rute (by slug)</h2>
               <p>Judul: {decodeHtml(satuRute.title)}</p>
               <p>
                    Asal: {satuRute.acf?.kota_asal || "(kosong)"} | Tujuan:{" "}
                    {satuRute.acf?.kota_tujuan || "(kosong)"}
               </p>
               <p>Tarif: {formatPrice(satuRute.acf?.tarif) ?? "(kosong)"}</p>
               <p>Tarif PP: {formatPrice(satuRute.acf?.tarif_pp) ?? "(kosong)"}</p>
               <p>
                    Armada:{" "}
                    {armadaRute.length > 0
                         ? armadaRute.map((a) => decodeHtml(a.title)).join(", ")
                         : "(kosong)"}
               </p>

               <h2 className="mt-8 text-2xl font-bold">
                    Daftar armada ({armadaList.length})
               </h2>
               <ul className="list-disc pl-6">
                    {armadaList.map((a) => (
                         <li key={a.id}>
                              {decodeHtml(a.title)} | harga:{" "}
                              {formatPrice(a.acf?.harga) ?? "(kosong)"} |{" "}
                              {a.acf?.jumlah_penumpang || "(kosong)"}
                         </li>
                    ))}
               </ul>
          </main>
     );
}