type IconProps = {
     className?: string;
};

const DEFAULT_CLASS = "h-5 w-5 shrink-0";

// Ikon mobil (Sewa Mobil). Warna mengikuti teks sekitarnya (currentColor).
export function CarIcon({ className = DEFAULT_CLASS }: IconProps) {
     return (
          <svg
               aria-hidden="true"
               viewBox="0 0 24 24"
               fill="currentColor"
               className={className}
          >
               <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
               />
          </svg>
     );
}

// Ikon kursi penumpang (Travel Reguler).
export function SeatIcon({ className = DEFAULT_CLASS }: IconProps) {
     return (
          <svg
               aria-hidden="true"
               viewBox="0 0 24 24"
               fill="currentColor"
               className={className}
          >
               <path d="M7.59 5.41c-.78-.78-.78-2.047 0-2.83.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0zM6 16V7H4v9c0 2.76 2.24 5 5 5h6v-2H9c-1.66 0-3-1.34-3-3zm14 4.07L14.93 15H11.5v-3.68c1.4 1.15 3.4 2.01 5.5 2.01v-2c-1.62.01-3.5-.78-4.72-2.05l-1.3-1.45c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C8.01 7 7 8.01 7 9.25V15c0 1.66 1.34 3 3 3h5.07l3.5 3.5L20 20.07z" />
          </svg>
     );
}