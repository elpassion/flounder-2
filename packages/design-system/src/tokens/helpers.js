const colorPalletConfig = require("./color.json");
const buttonConfig = require("./button.json");
const inlineMessageConfig = require("./inlineMessage.json");

const componentConfig = {
  button: buttonConfig,
  inlineMessage: inlineMessageConfig,
};

module.exports = {
  getColorPallet: () => {
    return module.exports.getColorsConfig(colorPalletConfig);
  },
  getComponentsPallet: () => {
    return module.exports.getComponentsColorConfig(componentConfig);
  },
  mapColorValuesToKey: (colorObject) => {
    return Object.keys(colorObject).reduce(
      (acc, red) => ({ ...acc, [red]: colorObject[red].value }),
      {}
    );
  },
  getColorPalletHex: (value) => {
    if(!value) return null;
    if (value.startsWith("{")) {
      const key = value.substring(1, value.length - 1).split(".");
      const colorName = key[0];
      const colorVariant = key[1];
      const colorPallet = module.exports.getColorPallet();
      const hex = colorPallet?.[colorName]?.[colorVariant] || "#FF3131";
      return hex;
    }
    return value;
  },
  mapColorValuesToHex: (colorObject) => {
    return Object.keys(colorObject).reduce(
      (styles, variant) => ({
        [variant === "default" ? variant.toUpperCase() : variant]:
          module.exports.getColorPalletHex(colorObject[variant].value),
        ...styles,
      }),
      {}
    );
  },
  getComponentColorConfig: (config, prefix) => {
    const variants = Object.keys(config).map((variant) => ({
      name: variant,
      ...config[variant].color,
    }));

    return variants.reduce(
      (acc, red) => ({
        backgroundColor: {
          [prefix]: {
            [red.name]: !!red?.background ? module.exports.mapColorValuesToHex(red.background) : {},
            ...acc.backgroundColor?.[prefix],
          },
        },
        textColor: {
          [prefix]: {
            [red.name]: !!red?.text ? module.exports.mapColorValuesToHex(red.text) : {},
            ...acc.textColor?.[prefix],
          },
        },
        borderColor: {
          [prefix]: {
            [red.name]: !!red?.border ? module.exports.mapColorValuesToHex(red.border) : {},
            ...acc.borderColor?.[prefix],
          },
        },
      }),
      {}
    );
  },
  getComponentsColorConfig: (configs) => {
    const colorConfigsMap = Object.keys(configs).map((componentConfig) =>
      module.exports.getComponentColorConfig(
        configs[componentConfig],
        componentConfig
      )
    );
    const componentsColorConfig = colorConfigsMap.reduce((acc, red) => ({
        backgroundColor: {
            ...red.backgroundColor,
            ...acc.backgroundColor
        },
        textColor: {
            ...red.textColor,
            ...acc.textColor
        },
        borderColor: {
            ...red.borderColor,
            ...acc.borderColor
        },
    }), {});

    return componentsColorConfig;
  },
  getColorsConfig: (colors) => {
    return Object.keys(colors).reduce(
      (acc, red) => ({
        ...acc,
        [red]: module.exports.mapColorValuesToKey(colors[red]),
      }),
      {}
    );
  },
};
