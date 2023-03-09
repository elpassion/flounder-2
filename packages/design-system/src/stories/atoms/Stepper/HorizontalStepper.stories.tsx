import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { HorizontalStepper as HorizontalStepperComponent } from "../../../components/Stepper/HorizontalStepper";
import type { StepperProps } from "../../../components/Stepper/Stepper.interface";

const docs: string = `# Usage <br/> 
| <div style="width:20vw">DO</div>  | DON’T |
| ----------- | ----------- |
| | Avoid using long step names in horizontal steppers. |`;

export const HorizontalStepper: ComponentStory<React.FC<StepperProps>> = ({
  ...props
}) => <HorizontalStepperComponent {...props} />;

export default {
  title: "🟢 Atoms/Stepper",
  component: HorizontalStepper,
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
