import { heroContent } from "@/constants/travel-reguler";

export default function TravelHero() {
     return (
          <section className="relative w-full overflow-hidden bg-surface pt-space-md pb-space-xl">
               <div
                    className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
                    aria-hidden
               />
               <div
                    className="pointer-events-none absolute -bottom-10 left-1/4 h-80 w-80 rounded-full bg-secondary-container/20 blur-2xl"
                    aria-hidden
               />

               <div className="relative mx-auto max-w-6xl px-gutter pt-space-lg">
                    <div className="max-w-3xl space-y-space-xs">
                         <h1 className="font-display text-display font-extrabold leading-tight tracking-tight text-on-surface">
                              {heroContent.title}
                         </h1>
                         <p className="max-w-2xl pt-space-xs font-body-lg text-body-lg text-on-surface-variant">
                              {heroContent.description}
                         </p>
                    </div>
               </div>
          </section>
     );
}