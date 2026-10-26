import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import type { Armada } from "@/types/armada";

type SewaMobilUnitOthersProps = {
     others: Armada[];
     whatsapp?: string;
     imageSizes?: string;
};

export default function SewaMobilUnitOthers({
     others,
     whatsapp,
     imageSizes = "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 90vw",
}: SewaMobilUnitOthersProps) {
     return (
          <section className="w-full bg-surface-container-low py-12 md:py-16">
               <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:gap-10">

                    {/* Section Header */}
                    {others.length > 0 && (
                         <div className="flex flex-col gap-6 md:gap-8">
                              <h2 className="text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl md:text-4xl">
                                   Unit Sewa Mobil Lainnya
                              </h2>

                              {/* Grid Card Armada */}
                              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                   {others.map((item) => (
                                        <ArmadaCard
                                             key={item.id}
                                             item={item}
                                             whatsapp={whatsapp ?? ""} // <-- Tambahkan nullish coalescing di sini
                                             imageSizes={imageSizes}
                                        />
                                   ))}
                              </div>
                         </div>
                    )}

                    {/* Navigation Link Kembali */}
                    <div className="pt-2">
                         <Link
                              href="/sewa-mobil"
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                         >
                              <ChevronLeft size={18} aria-hidden="true" />
                              <span>Kembali ke Sewa Mobil</span>
                         </Link>
                    </div>

               </div>
          </section>
     );
}