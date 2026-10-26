type SewaMobilUnitAboutProps = {
     name: string;
     html: string;
};

function cleanHtml(raw: string): string {
     return raw
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "")
          .replace(/\sdata-[a-z-]+\s*=\s*("[^"]*"|'[^']*')/gi, "")
          .trim();
}

export default function SewaMobilUnitAbout({
     name,
     html,
}: SewaMobilUnitAboutProps) {
     const safeHtml = cleanHtml(html ?? "");
     if (!safeHtml) return null;

     return (
          <section className="w-full bg-white py-12 md:py-16">
               <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 md:gap-8">

                    {/* Header Section */}
                    <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
                         <h2 className="text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl md:text-4xl">
                              Tentang {name}
                         </h2>
                    </div>

                    {/* Deskripsi dari editor WordPress */}
                    <div
                         className="mx-auto w-full max-w-3xl text-left text-sm leading-relaxed text-on-surface-variant sm:text-base md:text-lg md:leading-8 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_b]:font-bold [&_b]:text-on-surface [&_strong]:font-bold [&_strong]:text-on-surface [&_i]:italic [&_em]:italic [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_li_p]:mb-0 [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-on-surface [&_a]:text-primary [&_a]:underline"
                         dangerouslySetInnerHTML={{ __html: safeHtml }}
                    />

               </div>
          </section>
     );
}