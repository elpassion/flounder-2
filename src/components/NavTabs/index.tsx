import classNames from "classnames";

interface Tab extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: string;
}

export interface NavTabsProps {
  layout: "horizontal" | "vertical";
  tabs: Tab[];
  activeTab: string;
  type: "filled" | "outlined" | "line";
}

export const NavTabs: React.FC<NavTabsProps> = ({
  layout,
  tabs,
  activeTab,
  type,
}) => {
  const layoutVariant = {
    horizontal: "",
    vertical: "flex-col gap-y-1",
  };

  const typeVariant = {
    filled: "rounded-lg",
    outlined: "border border-transparent rounded-lg",
    line: "border-b border-neutral-100",
  };

  const activeVariant = {
    filled: "bg-primary-100",
    outlined: "border-primary-800",
    line: "border-primary-800",
  };

  return (
    <div className={classNames("flex", layoutVariant[layout])}>
      {tabs.map(({ id, label, icon, ...props }) => (
        <div
          {...props}
          key={id}
          className={classNames(
            "flex flex-1 cursor-pointer items-center gap-x-1.5 py-1.5 px-2 text-xs font-medium text-neutral-400 transition",
            typeVariant[type],
            id === activeTab && `text-primary-800 ${activeVariant[type]}`,
            layout !== "vertical" && "justify-center"
          )}
        >
          {icon && (
            <span
              className={classNames("h-4 w-4 text-center font-icons")}
              dangerouslySetInnerHTML={{
                __html: icon,
              }}
            />
          )}
          <div className={classNames("shrink-0")}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default NavTabs;
