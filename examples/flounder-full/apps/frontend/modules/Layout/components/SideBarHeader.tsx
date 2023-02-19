export interface SideBarHeaderProps {
  src: string;
  alt: string;
  appName: string;
}

export function AppLogo({ src, alt, appName }: SideBarHeaderProps) {
  return (
    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
      <img className="h-10 w-auto" src={src} alt={alt} />
      <p className="ml-5 text-blue-300 text-lg">{appName}</p>
    </div>
  );
}
