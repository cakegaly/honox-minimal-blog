import { IconProps } from '@/components/icons';

export const SiteLogo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M64 48V208M192 48V208M64 128H192" />
    </svg>
  );
};
