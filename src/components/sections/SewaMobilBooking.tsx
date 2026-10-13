import Link from "next/link";
import SewaMobilForm from "@/components/sections/SewaMobilForm";
import { sewaMobilFormIntro, sewaMobilHero } from "@/constants/sewa-mobil";
import type { RuteCarter } from "@/types/rute-carter";

type SewaMobilBookingProps = {
     whatsapp: string;
     routes: RuteCarter[];
     fleet: { id: number; name: string }[];
};

export default function SewaMobilBooking({
     whatsapp,
     routes,
     fleet,
}: SewaMobilBookingProps) {
     if (!whatsapp || routes.length === 0) return null;

     const link = sewaMobilHero.regularLink;

     return (
          <section className="w-full bg-surface-container-low py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                    <div className="space-y-space-xs">
                         <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                              {sewaMobilFormIntro.title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {sewaMobilFormIntro.description}
                         </p>
                    </div>

                    <SewaMobilForm
                         routes={routes}
                         fleet={fleet}
                         whatsapp={whatsapp}
                         embedded
                    />

                    <p className="pt-space-sm text-center font-body-md text-body-md text-on-surface-variant">
                         {link.text}{" "}
                         <Link
                              href={link.href}
                              className="font-bold text-primary underline underline-offset-4 hover:text-primary-container"
                         >
                              {link.label}
                         </Link>
                         .
                    </p>
               </div>
          </section>
     );
}