import Link from "next/link";
import { armadaHero } from "@/constants/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type ArmadaHeroProps = {
     whatsapp: string;
};

export default function ArmadaHero({ whatsapp }: ArmadaHeroProps) {
     const content = armadaHero;

     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
                    <div className="flex max-w-3xl flex-col gap-space-md">
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              {content.titleStart}{" "}
                              <span className="text-primary underline decoration-primary-fixed decoration-[5px] underline-offset-8">
                                   {content.titleHighlight}
                              </span>
                              {content.titleEnd}
                         </h1>

                         <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                              {content.description}
                         </p>
                    </div>

                    <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
                         {whatsapp && (
                              <a
                                   href={buildWhatsAppUrl(whatsapp, content.primaryMessage)}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center justify-center rounded-xl bg-whatsapp px-space-lg py-3 font-label-lg text-label-lg font-bold text-on-whatsapp transition-colors hover:bg-whatsapp-hover"
                              >
                                   {content.primaryButton}
                              </a>
                         )}
                         <Link
                              href="/sewa-mobil"
                              className="inline-flex items-center justify-center rounded-xl border border-outline px-space-lg py-3 font-label-lg text-label-lg font-bold text-primary transition-colors hover:bg-surface-container-low"
                         >
                              {content.secondaryButton}
                         </Link>
                    </div>
               </div>
          </section>
     );
}