module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module:react-native-dotenv",
      {
        "moduleName": "@env",
        "path": ".env"
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    "@babel/plugin-transform-runtime",
    "react-native-reanimated/plugin"
  ],
  "env": {
    "production": {
      "plugins": ["react-native-paper/babel", "react-native-reanimated/plugin"]
    },
    "test": {
      "plugins": [
        [
          "module:react-native-dotenv",
          {
            "moduleName": "@env",
            "path": ".env.test"
          }
        ]
      ]
    }
  }
}
