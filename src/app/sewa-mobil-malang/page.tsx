import type { Metadata } from "next";
import { CheckCircle, Clock, Key, UserCheck } from "lucide-react";
import SewaMobilCityHero, {
	type FeatureItem,
} from "@/components/sections/SewaMobilCityHero";
import SewaMobilCityInfo, {
	type CityInfoBlock,
} from "@/components/sections/SewaMobilCityInfo";
import SewaMobilFleet from "@/components/sections/SewaMobilFleet";
import SewaMobilFaq, { type FaqItem } from "@/components/sections/SewaMobilFaq";
import { siteConfig } from "@/config/site";
import { sewaMobilPackageConfig } from "@/constants/sewa-mobil";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getArmadaList } from "@/lib/wordpress/armada";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { lowestPrice, formatRupiah } from "@/utils/price";
import type { Armada } from "@/types/armada";

const title = "Sewa Mobil Malang & Batu, Lepas Kunci & Sopir | Raincarnation";
const description =
	"Sewa mobil Malang & Batu lepas kunci atau dengan sopir, unit matic tersedia. Diantar ke alamat atau ambil di kantor Batu. Admin 24 jam via WhatsApp.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sewa-mobil-malang" },
	openGraph: {
		type: "website",
		locale: "id_ID",
		siteName: siteConfig.name,
		url: "/sewa-mobil-malang",
		title,
		description,
		images: [
			{
				url: "/images/og-sewa-mobil.jpg",
				width: 1200,
				height: 670,
				alt: "Armada sewa mobil Raincarnation Indonesia",
			},
		],
	},
};

async function loadArmada(): Promise<Armada[]> {
	try {
		return await getArmadaList();
	} catch (error) {
		console.error("Gagal memuat armada:", error);
		return [];
	}
}

function price(values: Array<string | undefined>): string {
	const lowest = lowestPrice(values);
	if (lowest === null || lowest <= 0) return "";
	return formatRupiah(lowest) ?? "";
}

function buildFaqs(armada: Armada[]): FaqItem[] {
	const lepasKunci = price(armada.map((item) => item.acf?.harga));
	const bulanan = price(
		armada.map((item) => item.acf?.harga_lepas_kunci_bulanan),
	);
	const allIn = price(armada.map((item) => item.acf?.harga_all_in));
	const nonAllIn = price(armada.map((item) => item.acf?.harga_non_all_in));

	const dayParts: string[] = [];
	if (lepasKunci) dayParts.push(`Lepas Kunci per 12 jam mulai ${lepasKunci}.`);
	if (allIn) dayParts.push(`All In per hari mulai ${allIn}.`);
	if (nonAllIn) dayParts.push(`Non All In per hari mulai ${nonAllIn}.`);
	dayParts.push("Harga tergantung unit. Tanyakan tarif terbaru ke admin lewat WhatsApp.");

	const monthAnswer = bulanan
		? `Lepas Kunci bulanan mulai ${bulanan}, tergantung unit. Tanyakan ke admin lewat WhatsApp untuk tarif unit yang Anda inginkan.`
		: "Lepas Kunci tersedia bulanan, tergantung unit. Tanyakan tarifnya ke admin lewat WhatsApp.";

	const avanzaLines = armada
		.filter((item) =>
			decodeHtml(item.title).toLowerCase().includes("avanza"),
		)
		.map((item) => {
			const parts: string[] = [];
			const lk = price([item.acf?.harga]);
			const ai = price([item.acf?.harga_all_in]);
			const nai = price([item.acf?.harga_non_all_in]);
			if (lk) parts.push(`Lepas Kunci per 12 jam ${lk}`);
			if (ai) parts.push(`All In per hari ${ai}`);
			if (nai) parts.push(`Non All In per hari ${nai}`);
			return parts.length > 0
				? `${capitalizeFirst(decodeHtml(item.title))}: ${parts.join(", ")}.`
				: "";
		})
		.filter(Boolean);

	const avanzaAnswer =
		avanzaLines.length > 0
			? `${avanzaLines.join(" ")} Tanyakan ketersediaan unit ke admin lewat WhatsApp.`
			: "Harga Avanza tergantung layanan: Lepas Kunci per 12 jam, All In dan Non All In per hari. Tanyakan tarifnya ke admin lewat WhatsApp.";

	return [
		{
			question: "Sewa mobil Malang per hari berapa?",
			answer: dayParts.join(" "),
		},
		{
			question: "Harga sewa mobil 1 bulan berapa?",
			answer: monthAnswer,
		},
		{
			question: "Rental Avanza 1 hari berapa?",
			answer: avanzaAnswer,
		},
		{
			question: "Apa syarat sewa mobil lepas kunci?",
			answer: "Dokumen utama: KTP dan SIM A yang masih berlaku. Ada syarat tambahan dan deposit. Syarat lengkapnya ada di halaman Syarat Sewa Mobil Lepas Kunci.",
		},
		{
			question: "Apakah mobil bisa diantar ke alamat?",
			answer:
				"Bisa. Unit dapat diantar ke alamat Anda di area layanan, atau diambil di kantor kami di Jl. Torongrejo, Kota Batu. Biaya antar dikonfirmasi admin lewat WhatsApp.",
		},
		{
			question: "Apakah ada sewa mobil dengan sopir di Malang dan Batu?",
			answer:
				"Ada. Pilihannya All In dan Non All In, dengan harga per hari. All In sudah termasuk unit, BBM, sopir, makan sopir, tol, dan parkir. Non All In termasuk unit, BBM, dan sopir, sedangkan tol dan parkir tidak termasuk. Rute bebas lewat pilihan rute custom.",
		},
		{
			question: "Apakah ada sewa mobil lepas kunci (tanpa sopir) di Malang dan Batu?",
			answer:
				"Ada. Mobil dikemudikan sendiri, dengan durasi per 12 jam, bulanan, atau tahunan. Sudah termasuk unit dan biaya cuci, tidak termasuk ongkos pengantaran. Pembayaran di muka. Untuk durasi lain, tanyakan ke admin.",
		},
		{
			question: "Apakah sewa mobil lepas kunci pakai deposit?",
			answer:
				"Ya, ada deposit atau jaminan. Besarannya ditentukan oleh jenis kendaraan, durasi sewa, hasil verifikasi penyewa, wilayah penggunaan, dan risiko operasional. Deposit dikembalikan setelah kendaraan diperiksa. Jika ada potongan, kami memberikan rincian dan bukti pendukung.",
		},
		{
			question: "Apakah ada unit matic?",
			answer:
				"Ada. Unit matic dan mobil listrik tersedia di Malang dan Batu. Pilihan unitnya bisa dilihat di bagian Pilihan Unit di halaman ini, dan ketersediaan dikonfirmasi admin lewat WhatsApp.",
		},
		{
			question: "Bagaimana cara memesan sewa mobil di Malang dan Batu?",
			answer:
				"Klik tombol WhatsApp, sebutkan tanggal, lokasi antar atau ambil di kantor Batu, jenis layanan (lepas kunci atau dengan sopir), dan unit yang dibutuhkan. Admin akan mengonfirmasi ketersediaan dan total biaya.",
		},
	];
}

const serviceBlocks: CityInfoBlock[] = [
	{
		eyebrow: "PILIHAN SEWA FLEKSIBEL",
		heading: "Pilihan Sewa Mobil di Malang dan Batu",
		subheading: "Sesuaikan kebutuhan perjalanan Anda dengan paket fleksibel yang kami sediakan:",
		items: [
			{
				title: "Lepas Kunci (Tanpa Sopir)",
				text: "Sewa mobil tanpa sopir, dikemudikan sendiri. Per 12 jam, bulanan, atau tahunan. Sudah termasuk unit dan biaya cuci, tidak termasuk ongkos pengantaran.",
			},
			{
				title: "All In (Dengan Sopir)",
				text: "Sewa mobil dengan sopir, harga per hari. Termasuk unit, BBM, sopir, makan sopir, tol, dan parkir.",
			},
			{
				title: "Non All In (Dengan Sopir)",
				text: "Sewa mobil dengan sopir, harga per hari. Termasuk unit, BBM, dan sopir. Tol dan parkir tidak termasuk.",
			},
			{
				title: "Carter Drop Off 1 Arah",
				text: "Harga per rute. Termasuk unit, BBM, dan sopir.",
			},
		],
		paragraphs: [
			"Untuk Lepas Kunci, All In, dan Non All In, rute bebas lewat pilihan rute custom. Durasi lain bisa ditanyakan ke admin.",
		],
	},
];

const detailBlocks: CityInfoBlock[] = [
	{
		icon: "map",
		heading: "Diantar ke Alamat atau Ambil di Kantor Batu",
		paragraphs: [
			"Unit bisa diantar ke alamat pelanggan di area layanan, atau diambil langsung di kantor kami di Jl. Torongrejo, Kota Batu. Biaya antar dikonfirmasi admin lewat WhatsApp.",
			"Kantor berada di Kota Batu dan melayani area Malang.",
		],
	},
	{
		icon: "file",
		heading: "Syarat Sewa Mobil Lepas Kunci",
		paragraphs: [
			"Dokumen utama: KTP dan SIM A. Ada syarat tambahan dan deposit. Lepas Kunci tersedia per 12 jam, bulanan, dan tahunan. Untuk durasi lain, tanyakan ke admin.",
		],
		link: {
			before: "Butuh syarat lengkapnya?",
			label: "Lihat Syarat Sewa Mobil Lepas Kunci",
			href: "/syarat-sewa-mobil-lepas-kunci",
		},
	},
];

const heroFeatures: FeatureItem[] = [
	{
		icon: <Key className="size-5 text-primary" />,
		tag: "Lepas Kunci",
		title: "Tanpa Sopir, Per 12 Jam",
	},
	{
		icon: <UserCheck className="size-5 text-primary" />,
		tag: "Dengan Sopir",
		title: "All In & Non All In",
	},
	{
		icon: <CheckCircle className="size-5 text-primary" />,
		tag: "Unit Matic",
		title: "Tersedia",
	},
	{
		icon: <Clock className="size-5 text-primary" />,
		tag: "Admin WhatsApp",
		title: "Chat 24 Jam",
	},
];

export default async function SewaMobilMalangPage() {
	const [config, armada] = await Promise.all([
		getSiteConfig(),
		loadArmada(),
	]);
	const whatsapp = config.contact?.whatsapp ?? "";
	const telephone = whatsapp
		? whatsapp.startsWith("+")
			? whatsapp
			: `+${whatsapp}`
		: undefined;

	const serviceLd = {
		"@context": "https://schema.org",
		"@type": "TransportationService",
		name: "Sewa Mobil Malang & Batu - Raincarnation",
		serviceType: "Sewa mobil dengan sopir dan lepas kunci",
		description,
		url: `${siteConfig.url}/sewa-mobil-malang`,
		areaServed: [
			{ "@type": "AdministrativeArea", name: "Kota Malang" },
			{ "@type": "AdministrativeArea", name: "Kota Batu" },
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Layanan Sewa Mobil Malang & Batu",
			itemListElement: sewaMobilPackageConfig.packages.map((item) => ({
				"@type": "Offer",
				itemOffered: { "@type": "Service", name: item.name },
			})),
		},
		provider: {
			"@type": "AutoRental",
			"@id": `${siteConfig.url}/#business`,
			name: siteConfig.name,
			image: `${siteConfig.url}/images/og-sewa-mobil.jpg`,
			telephone,
			address: {
				"@type": "PostalAddress",
				streetAddress: "Jl. Torongrejo, Torongrejo, Kec. Junrejo",
				addressLocality: "Kota Batu",
				addressRegion: "Jawa Timur",
				postalCode: "65325",
				addressCountry: "ID",
			},
			location: [
				{
					"@type": "Place",
					name: "Garasi Surabaya",
					address: {
						"@type": "PostalAddress",
						streetAddress:
							"Jl. Baruk Barat VIII No.A-103, Kedung Baruk, Kec. Rungkut",
						addressLocality: "Kota Surabaya",
						addressRegion: "Jawa Timur",
						postalCode: "60298",
						addressCountry: "ID",
					},
				},
			],
			openingHoursSpecification: [
				{
					"@type": "OpeningHoursSpecification",
					dayOfWeek: [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
						"Sunday",
					],
					opens: "05:00",
					closes: "22:00",
				},
			],
			sameAs: [
				"https://www.instagram.com/raincar_nation.indonesia",
				"https://www.tiktok.com/@raincar.nation_indonesia",
				"https://www.threads.com/@raincarnation.indonesia",
			],
		},
	};

	const breadcrumbLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Beranda",
				item: siteConfig.url,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Sewa Mobil",
				item: `${siteConfig.url}/sewa-mobil`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: "Sewa Mobil Malang & Batu",
				item: `${siteConfig.url}/sewa-mobil-malang`,
			},
		],
	};

	return (
		<main className="w-full bg-surface">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(serviceLd).replace(/</g, "\\u003c"),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
				}}
			/>

			<SewaMobilCityHero
				badge="RENTAL MOBIL TERPERCAYA DI JAWA TIMUR"
				titleStart="Sewa Mobil Malang & Batu"
				titleHighlight="Lepas Kunci atau dengan Sopir"
				intro="Raincarnation melayani sewa mobil di Malang dan Batu, dengan sopir atau lepas kunci. Kantor dan garasi kami ada di Kota Batu dan melayani pengantaran area Malang. Kami juga menyediakan unit matic dan mobil listrik."
				whatsapp={whatsapp}
				whatsappMessage="Halo Admin Raincarnation, saya ingin tanya sewa mobil di Malang dan Batu."
				fleetAnchorId="#pilihan-armada"
				features={heroFeatures}
				bottomLink={{
					before: "Butuh sewa mobil di Surabaya?",
					label: "Lihat Sewa Mobil Surabaya",
					href: "/sewa-mobil-surabaya",
				}}
			/>

			<SewaMobilCityInfo blocks={serviceBlocks} tone="low" />
			<SewaMobilFleet
				armada={armada}
				whatsapp={whatsapp}
				title="Pilihan Unit Sewa Mobil Malang & Batu"
				description="Pilih unit sesuai jumlah penumpang dan bagasi, untuk lepas kunci maupun dengan sopir. Tanyakan ketersediaan dan tarifnya lewat WhatsApp."
			/>
			<SewaMobilCityInfo blocks={detailBlocks} tone="low" />

			<SewaMobilFaq
				items={buildFaqs(armada)}
				heading="Pertanyaan Seputar Sewa Mobil Malang & Batu"
				intro="Jawaban singkat seputar harga, syarat, dan pengantaran sewa mobil di Malang dan Batu."
			/>
		</main>
	);
}