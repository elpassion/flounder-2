import * as ToastComponents from "components/Toast";
import type { ToastProps } from "components/Toast/Toast.interface";

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  icon,
  firstActionText,
  secondActionText,
  sectionVariants,
  onClose,
}) => {
  return (
    // @TODO: Add special sizes to config and ditch JIT to keep design system consistent embeded into config
    <ToastComponents.Container className="grid w-full max-w-md grid-cols-[1fr_auto] bg-white text-neutral-500">
      <div className="flex gap-2 px-4 py-5">
        {icon && <ToastComponents.Icon icon={icon} />}
        <div className="flex flex-col">
          <ToastComponents.Text textType="title" className="text-primary-500">
            {title}
          </ToastComponents.Text>
          <ToastComponents.Text textType="description">
            {description}
          </ToastComponents.Text>
        </div>
      </div>
      {sectionVariants === "action" && (
        <ToastComponents.ActionsSection
          firstActionText={firstActionText}
          secondActionText={secondActionText}
        />
      )}
      {sectionVariants === "close" && (
        <ToastComponents.CloseButtonSection onClose={onClose} />
      )}
    </ToastComponents.Container>
  );
};

export default Toast;
