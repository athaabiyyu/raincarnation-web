import {
     Car,
     Check,
     Clock,
     MapPinned,
     MessageSquareText,
     Route,
     type LucideIcon,
} from "lucide-react";
import {
     bookingStepsContent,
     type BookingStepIcon,
} from "@/constants/booking-steps";

// Menghubungkan nama ikon di constants dengan komponen ikon lucide.
const icons: Record<BookingStepIcon, LucideIcon> = {
     route: Route,
     location: MapPinned,
     chat: MessageSquareText,
     pickup: Car,
};

export default function BookingSteps() {
     const { eyebrow, title, description, steps } = bookingStepsContent;

     return (
          <section className="w-full bg-surface px-gutter py-space-lg md:py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-lg">
                    <div className="mx-auto max-w-2xl space-y-space-xs text-center">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              {eyebrow}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                              {title}
                         </h2>
                         <p className="font-body-md text-body-md text-on-surface-variant">
                              {description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:grid-cols-4">
                         {steps.map((step, index) => {
                              const Icon = icons[step.icon];
                              const isLast = index === steps.length - 1;

                              return (
                                   <div
                                        key={step.title}
                                        className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-shadow hover:shadow-md md:p-space-lg"
                                   >
                                        <div className="space-y-space-sm">
                                             <div className="flex items-center justify-between">
                                                  <span
                                                       className={`flex h-10 w-10 items-center justify-center rounded-full font-headline-sm text-headline-sm font-bold ${isLast
                                                                 ? "bg-primary-container text-on-primary"
                                                                 : "bg-primary/10 text-primary"
                                                            }`}
                                                  >
                                                       {index + 1}
                                                  </span>
                                                  <Icon
                                                       size={24}
                                                       className={isLast ? "text-primary-container" : "text-primary"}
                                                       aria-hidden="true"
                                                  />
                                             </div>
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                  {step.title}
                                             </h3>
                                             <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                  {step.description}
                                             </p>
                                        </div>

                                        {step.highlight && (
                                             <div
                                                  className={`flex items-center gap-1 pt-space-md font-label-sm text-label-sm ${isLast
                                                            ? "font-bold text-primary"
                                                            : "text-on-surface-variant"
                                                       }`}
                                             >
                                                  {isLast ? (
                                                       <Clock
                                                            size={16}
                                                            className="shrink-0"
                                                            aria-hidden="true"
                                                       />
                                                  ) : (
                                                       <Check
                                                            size={16}
                                                            className="shrink-0 text-primary"
                                                            aria-hidden="true"
                                                       />
                                                  )}
                                                  {step.highlight}
                                             </div>
                                        )}
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}