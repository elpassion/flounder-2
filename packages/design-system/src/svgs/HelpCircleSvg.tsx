const HelpCircleSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.05992 6C6.21665 5.55444 6.52602 5.17873 6.93322 4.93942C7.34042 4.7001 7.81918 4.61262 8.2847 4.69247C8.75022 4.77232 9.17246 5.01434 9.47664 5.37568C9.78081 5.73702 9.94729 6.19434 9.94659 6.66666C9.94659 8 7.94659 8.66666 7.94659 8.66666M7.99992 11.3333H8.00659M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33333 7.99992 1.33333C11.6818 1.33333 14.6666 4.3181 14.6666 8Z"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default HelpCircleSvg;
