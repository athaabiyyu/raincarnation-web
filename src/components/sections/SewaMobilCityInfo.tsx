import Link from "next/link";
import { CircleCheck, Info, MapPin, FileText, ExternalLink } from "lucide-react";

export type CityInfoBlock = {
	eyebrow?: string;
	heading: string;
	subheading?: string;
	icon?: "map" | "file";
	paragraphs?: string[];
	items?: { title: string; text: string }[];
	link?: { before: string; label: string; href: string };
};

type SewaMobilCityInfoProps = {
	blocks: CityInfoBlock[];
	tone?: "surface" | "low";
};

export default function SewaMobilCityInfo({
	blocks,
	tone = "low",
}: SewaMobilCityInfoProps) {
	const bg = tone === "low" ? "bg-surface-container-low" : "bg-surface";

	const hasItemsBlocks = blocks.filter((b) => b.items && b.items.length > 0);
	const gridCardsBlocks = blocks.filter((b) => !b.items || b.items.length === 0);

	const renderHeading = (heading: string) => {
		if (heading.includes("Ambil di")) {
			const parts = heading.split("Ambil di");
			return (
				<>
					{parts[0]}Ambil di <br className="hidden sm:inline" />
					{parts[1]}
				</>
			);
		}
		return heading;
	};

	return (
		<section className={`w-full ${bg} py-space-xl`}>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-space-xl px-gutter">
				{/* 1. SECTION DENGAN ITEMS (Pilihan Sewa Mobil - Rata Tengah) */}
				{hasItemsBlocks.map((block) => (
					<div
						key={block.heading}
						className="flex w-full max-w-3xl flex-col items-center gap-space-lg text-center"
					>
						<div className="flex w-full flex-col items-center gap-space-sm">
							{block.eyebrow && (
								<span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary mb-0.5">
									{block.eyebrow}
								</span>
							)}

							<h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
								{block.heading}
							</h2>

							{block.subheading && (
								<p className="max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant pt-1">
									{block.subheading}
								</p>
							)}
						</div>

						{block.items && (
							<ul className="flex w-full flex-col gap-space-md text-left pt-space-xs">
								{block.items.map((item) => (
									<li
										key={item.title}
										className="flex items-start gap-3.5 rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-space-md shadow-xs transition-all hover:border-primary/30"
									>
										<div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
											<CircleCheck size={18} aria-hidden="true" />
										</div>
										<div className="flex flex-col gap-0.5 min-w-0">
											<strong className="font-bold text-on-surface font-body-md text-body-md">
												{item.title}
											</strong>
											<p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
												{item.text}
											</p>
										</div>
									</li>
								))}
							</ul>
						)}

						{block.paragraphs?.map((text) => (
							<div
								key={text}
								className="mt-space-xs flex w-full items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-left text-on-surface-variant"
							>
								<Info size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
								<p className="font-body-md text-body-md leading-relaxed">
									{text}
								</p>
							</div>
						))}
					</div>
				))}

				{/* 2. SECTION GRID CARDS 2 KOLOM (Diantar ke Alamat & Syarat Sewa) */}
				{gridCardsBlocks.length > 0 && (
					<div className="grid w-full grid-cols-1 gap-space-md md:grid-cols-2">
						{gridCardsBlocks.map((block) => {
							const hasFooter = Boolean(block.paragraphs?.[1] || block.link);

							return (
								<div
									key={block.heading}
									className="flex flex-col justify-between rounded-3xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-xs text-left"
								>
									{/* Top Content */}
									<div className="flex flex-col gap-space-md">
										<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
											{block.icon === "file" ? (
												<FileText size={20} aria-hidden="true" />
											) : (
												<MapPin size={20} aria-hidden="true" />
											)}
										</div>

										<h3 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">
											{renderHeading(block.heading)}
										</h3>

										{block.paragraphs && block.paragraphs[0] && (
											<p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
												{block.paragraphs[0]}
											</p>
										)}
									</div>

									{/* Bottom Footer Area */}
									{hasFooter && (
										<div className="mt-space-md border-t border-surface-container-high/40 pt-space-md">
											{/* Card 1: Bullet Green Text dengan Native List Padding (No Wrapping Bug) */}
											{block.paragraphs?.[1] && (
												<ul className="list-disc pl-4 font-body-sm text-body-sm font-semibold text-primary marker:text-primary">
													<li className="leading-relaxed">
														{block.paragraphs[1]}
													</li>
												</ul>
											)}

											{/* Card 2: Link */}
											{block.link && (
												<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between font-body-sm text-body-sm">
													<span className="text-on-surface-variant">
														{block.link.before}
													</span>
													<Link
														href={block.link.href}
														className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary-container"
													>
														<span>{block.link.label}</span>
														<ExternalLink size={14} aria-hidden="true" />
													</Link>
												</div>
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}