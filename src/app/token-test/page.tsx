import Navbar from "@/components/layout/Navbar";

export default function TokenTestPage() {
     return (
          <>
               <Navbar />
               <main className="min-h-screen bg-surface p-gutter text-on-surface">
                    <h1 className="font-headline-lg text-headline-lg">
                         Headline LG (36/44/700)
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                         Body MD 16/24/400, warna on-surface-variant.
                    </p>
                    <p className="font-label-sm text-label-sm text-primary">
                         Label SM 12/16/600, warna primary.
                    </p>

                    <div className="mt-space-lg flex gap-space-md">
                         <div className="rounded-xl bg-primary p-space-md text-on-primary">
                              primary
                         </div>
                         <div className="rounded-xl bg-primary-container p-space-md text-on-primary">
                              primary-container
                         </div>
                         <div className="rounded-xl bg-surface-container p-space-md">
                              surface-container
                         </div>
                         <div className="rounded-xl bg-surface-container-low p-space-md">
                              surface-container-low
                         </div>
                    </div>

                    <div className="mt-[120vh]">Gulir sampai sini: Navbar harus tetap menempel di atas.</div>
               </main>
          </>
     );
}