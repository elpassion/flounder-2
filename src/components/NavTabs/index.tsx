import classNames from "classnames";
import type { NavTabsProps } from "./NavTabs.interface";

export const NavTabs: React.FC<NavTabsProps> = ({
  layout,
  tabs,
  activeTab,
  type,
  onClick,
}) => {
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
    <div className={classNames("flex", {"flex-col gap-y-1": layout === 'vertical'})}>
      {tabs.map(({ id, label, icon }) => (
        <div
          key={id}
          className={classNames(
            "flex flex-1 cursor-pointer items-center gap-x-1.5 py-1.5 px-2 text-xs font-medium text-neutral-400 transition",
            typeVariant[type],
            id === activeTab && `text-primary-800 ${activeVariant[type]}`,
            layout !== "vertical" && "justify-center"
          )}
          onClick={() => onClick(id)}
        >
          {icon && (
            <div className="w-4 aspect-square">
              {icon}
            </div>
          )}
          <div className="shrink-0">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default NavTabs;
