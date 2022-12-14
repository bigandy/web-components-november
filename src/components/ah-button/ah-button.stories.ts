// demo-button.stories.js

import { html } from "lit-html";

import "./index";

import type { Meta } from "@storybook/web-components";
import { styleMap } from "lit-html/directives/style-map.js";
// import type { ButtonProps } from "./Button";
// import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
const meta: Meta = {
  title: "Components/AH Button",
  tags: ["docsPage"],
  argTypes: {
    label: { type: "string", defaultValue: "derp" },
    before: { type: "string", defaultValue: "" },
    after: { type: "string", defaultValue: "" },
    backgroundColor: {
      control: "color",
      defaultValue: "inherit",
    },
    color: { control: "color", defaultValue: "inherit" },
    // onClick: { action: "onClick" },
    outlined: {
      type: "boolean",
    },
    fullWidth: {
      type: "boolean",
    },
  },
  render: (args) => html` <ah-button
    ?outlined=${args.outlined}
    ?fullwidth=${args.fullwidth}
    style=${styleMap({
      "--ah-button-background": `${args.backgroundColor}`,
      "--ah-button-color": `${args.color}`,
    })}
  >
    ${args.before
      ? html`<div slot="before">${args.before}</div>`
      : null}
    ${args.label}
    ${args.after
      ? html`<div slot="after">${args.after}</div>`
      : null}
  </ah-button>`,
};

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/web-components/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  args: {
    label: "derp",
  },
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/web-components/api/csf
 * to learn how to use render functions.
 */

export const Slotted = {
  args: {
    before: "🤬",
    label: "Slotted",
    after: "🦊",
  },
};

export const Outlined = {
  args: {
    label: "Outlined Button",
    outlined: true,
  },
};

export const Fullwidth = {
  args: {
    label: "Fullwidth Button",
    fullwidth: true,
  },
};
