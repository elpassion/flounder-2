import { NotificationProps } from "components/Notification/Notification.interface";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Notification as NotificationComponent } from "components/Notification";

const eventsExample = [
  {
    name: "Julia",
    src: "images/red.png",
    message: "mentioned you in the comment",
    time: "5 minutes ago",
    details: "Hello, how are you?",
    isNew: true,
  },
  {
    name: "Mark",
    src: "images/yellow.png",
    message: "mentioned you in the comment",
    time: "1 hour ago",
    details: "Hello, how are you?",
    isNew: true,
  },
  {
    name: "Sonia",
    src: "images/peach.png",
    message: "mentioned you in the comment",
    time: "2 days ago",
    details: "Hello, how are you?",
    isNew: false,
  },
];

export const Notification: ComponentStory<React.FC<NotificationProps>> = ({
  ...props
}) => (
  <div className="max-w-[400px]">
    <NotificationComponent {...props} />
  </div>
);

export default {
  title: "🟠 Molecules/Notification",
  component: Notification,
  argTypes: {
    events: {
      control: { type: "select", labels: { eventsExample: "events example" } },
      options: [undefined, eventsExample],
    },
    shape: {
      control: "select",
      description: "circle | square",
      options: ["circle", "square"],
    },
    contentType: {
      control: "select",
      description: "icon | text",
      options: ["icon", "text"],
    },
  },
  args: {
    events: eventsExample,
    shape: "circle",
    contentType: "icon",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3617%3A37320&t=IEUQcUR5hK1FA7l8-0",
    },
  },
} as ComponentMeta<React.FC<NotificationProps>>;
