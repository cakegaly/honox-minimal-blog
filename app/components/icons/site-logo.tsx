import { IconProps } from '@/components/icons';

export const SiteLogo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M128 240c-40-24-64-56-64-96 0-36 22.5-66 56-88 0 24 8 40 24 56s24 32 24 56c0 24-8 48-40 72z" />
      <path d="M128 208c-20-12-32-28-32-48 0-18 11-34 28-46 0 12 4 20 12 28s12 16 12 28c0 12-4 24-20 38z" />
    </svg>
  );
};
