import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { VerticalStepper as VerticalStepperComponent } from "components/Stepper/VerticalStepper";
import type { StepperProps } from "components/Stepper/Stepper.interface";

export const VerticalStepper: ComponentStory<React.FC<StepperProps>> = ({
  ...props
}) => <VerticalStepperComponent {...props} />;

export default {
  title: "🟢 Atoms/Stepper/VerticalStepper",
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
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<StepperProps>>;
