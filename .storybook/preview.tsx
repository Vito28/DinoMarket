import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/Style/index.css";

import { MemoryRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#f8f9fa" },
      { name: "dark", value: "#0f172a" },
    ],
  },
};
export const decorators = [
  (Story: StoryFn) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];
