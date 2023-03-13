import React from "react";
import iconConfigFile from "../../fonts/fonticon.json";
import { getIcons } from "../../helpers/getIcons";
import { Icon } from "../../components/Icon";

export const Icons = () => {
  const icons = getIcons(iconConfigFile);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {icons.map((icon) => {
            return (
              <tr className="divide-x divide-gray-200" key={icon.name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center">
                  <Icon iconName={`${icon.name}`} size="lg" />
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center">
                  <span className="text-sm font-bold text-gray-700">
                    {icon.name}
                  </span>
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                  {`<Icon size="lg" iconName="${icon.name}" />`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default {
  title: "🟢 Atoms/Icons",
  component: Icons,
};
