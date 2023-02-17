import classNames from "classnames";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import {
  StepperProps,
  StepProps,
  StepStatuses,
  TitleSectionProps,
} from "./Stepper.interface";

const docs: string = `# Usage <br/> 
| <div style="width:20vw">DO</div>  | DON’T |
| ----------- | ----------- |
| | Avoid using long step names in horizontal steppers. |`;

export const VerticalStepper: ComponentStory<React.FC<StepperProps>> = ({
  activeStep,
  steps,
  size = "md",
  completeVariant,
  onClick,
}) => {
  const VerticalStepper = {
    Container: ({ children }: React.PropsWithChildren) => {
      return (
        <ol
          className={classNames(
            "flex min-h-[400px] w-min flex-col justify-between gap-2"
          )}
        >
          {children}
        </ol>
      );
    },
    TitleSection: ({
      stepTitle,
      stepDescription,
      status,
      size = "md",
      className,
    }: TitleSectionProps) => {
      const titleStatusColorVariants = {
        complete: "text-neutral-700",
        current: "text-primary-800",
        incomplete: "text-neutral-400",
      };
      const descriptionStatusColorVariants = {
        complete: "text-neutral-500",
        current: "text-primary-700",
        incomplete: "text-neutral-300",
      };
      const sizeMarginVariants = {
        sm: "",
        md: "mt-1",
        lg: "mt-2",
      };
      const titleSizeVariants = {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      };

      return (
        <div
          className={classNames(
            "flex flex-col items-start whitespace-nowrap",
            sizeMarginVariants[size]
          )}
        >
          <p
            className={classNames(
              "text-sm font-medium empty:hidden",
              titleStatusColorVariants[status],
              titleSizeVariants[size],
              className
            )}
          >
            {stepTitle}
          </p>
          <p
            className={classNames(
              "text-sm empty:hidden",
              descriptionStatusColorVariants[status],
              className
            )}
          >
            {stepDescription}
          </p>
        </div>
      );
    },
    Step: ({
      index,
      status,
      size = "md",
      completeVariant = "default",
      icon,
      className,
      ...props
    }: StepProps) => {
      const sizeVariants = {
        sm: "w-6 h-6 text-xs p-1",
        md: "w-8 h-8 text-sm p-2",
        lg: "w-11 h-11 text-base p-2.5",
      };

      const iconSizeVariants = {
        sm: "text-base",
        md: "text-base",
        lg: "text-2xl",
      };

      const stepStatusStyle = {
        complete:
          "bg-primary-500 text-white border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-700 focus:border-primary-700",
        current:
          "bg-primary-500 text-white shadow-focused shadow-primary-50 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-700 focus:border-primary-700",
        incomplete:
          "bg-neutral-50 text-neutral-300 border-neutral-50 hover:bg-neutral-100 hover:border-neutral-100 focus:bg-white focus:border-neutral-100",
      };

      const renderContent = (
        index: number,
        status: StepStatuses
      ) => {
        if (completeVariant === "check" && status === StepStatuses.COMPLETE) {
          return (
            <span className={classNames("font-icons", iconSizeVariants[size])}>
              &#xeace;
            </span>
          );
        }
        return icon ? (
          <span
            className={classNames("font-icons", iconSizeVariants[size])}
            dangerouslySetInnerHTML={{ __html: `${icon};` }}
          />
        ) : (
          <>{`${index + 1}`}</>
        );
      };

      return (
        <div className="flex flex-row gap-3">
          <button
            className={classNames(
              "flex items-center justify-center rounded-full border",
              stepStatusStyle[status],
              sizeVariants[size],
              className
            )}
            onClick={onClick}
          >
            {renderContent(index, status)}
          </button>
          <VerticalStepper.TitleSection
            status={status}
            size={size}
            {...props}
          />
        </div>
      );
    },
  };

  const connectorSizeVariants = {
    sm: "after:h-[calc(100%-32px)] after:left-[11px] after:-top-[calc(50%-8px)]",
    md: "after:h-[calc(100%-40px)] after:left-[15px] after:-top-[calc(50%-12px)]",
    lg: "after:h-[calc(100%-52px)] after:left-[21px] after:-top-[calc(50%-18px)]",
  };

  const connectorStatusColorVariants = {
    complete: "after:border-primary-500",
    current: "after:border-primary-500",
    incomplete: "after:border-neutral-100",
  };

  const getStatus = (index: number): StepStatuses => {
    if (index < activeStep) return StepStatuses.COMPLETE;
    else if (index === activeStep) return StepStatuses.CURRENT;
    else return StepStatuses.INCOMPLETE;
  };

  return (
    <VerticalStepper.Container>
      {steps.map(({ id, ...step }, index) => {
        const stepStatus = getStatus(index);
        return (
          <li
            className={classNames(
              "relative w-full flex-1",
              "after:absolute after:w-px after:translate-y-[-50%] after:border-l-2 first:after:hidden",
              connectorStatusColorVariants[stepStatus],
              connectorSizeVariants[size]
            )}
            key={id}
          >
            {/* {index > 0 && (
              <VerticalStepper.LinearConnector
                status={stepStatus}
                size={size}
              />
            )} */}
            <VerticalStepper.Step
              {...step}
              status={stepStatus}
              index={index}
              size={size}
              completeVariant={completeVariant}
            />
          </li>
        );
      })}
    </VerticalStepper.Container>
  );
};

export default {
  title: "Atoms/Stepper/VerticalStepper",
  component: VerticalStepper,
  argTypes: {
    activeStep: {
      description: "number",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm | md | lg",
    },
    completeVariant: {
      control: "select",
      options: ["default", "check"],
      description: "default | check",
    },
  },
  args: {
    activeStep: 1,
    size: "md",
    completeVariant: "default",
    steps: [
      {
        id: "first",
        icon: "&#xea13",
        stepTitle: "first step",
        stepDescription: "step description",
      },
      {
        id: "second",
        stepTitle: "second step",
        stepDescription: "step description",
      },
      {
        id: "third",
        icon: "&#xea59",
        stepTitle: "third step",
        stepDescription: "step description",
      },
      {
        id: "fourth",
        stepTitle: "fourth step",
        stepDescription: "step description",
      },
      {
        id: "fifth",
        icon: "&#xeaf7",
        stepTitle: "fifth step",
        stepDescription: "step description",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2491%3A11885&t=3SwYgdehYmYCK1cv-0",
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Description markdown={docs} />
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<StepperProps>>;
