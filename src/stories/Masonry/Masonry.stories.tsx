import { ComponentMeta, ComponentStory } from "@storybook/react";

import Masonry from "./index";
import { MasonryAbsoluteItem, MasonryFlexItem } from "./MasonryItem/index";
import MockData from "./mock.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Masonry",
  component: Masonry,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  type: { name: "string", required: false },
} as ComponentMeta<typeof Masonry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Masonry> = (args) => (
  <Masonry
    {...args}
    style={{
      backgroundColor: "#eee",
      padding: "20px",
    }}
  />
);

export const Column = Template.bind({});
Column.args = {
  direction: "column",
  columnsCountBreakPoints: {
    1400: 5,
    1000: 4,
    700: 3,
  },
  children: MockData.list.map((i, index) => {
    return (
      <div key={index}>
        <p>{index + 1}</p>
        <img src={i.img} style={{ maxWidth: "100%" }} />
      </div>
    );
  }),
};

export const Row = Template.bind({});
Row.args = {
  columnsCountBreakPoints: {
    1400: 5,
    1000: 4,
    700: 3,
  },
  children: MockData.list.map((i, index) => {
    return (
      <div key={index}>
        <p>{index + 1}</p>
        <img src={i.img} style={{ maxWidth: "100%" }} />
      </div>
    );
  }),
};

export const RowSortWithHeight = Template.bind({});
RowSortWithHeight.args = {
  sortWithHeight: true,
  columnsCountBreakPoints: {
    1400: 5,
    1000: 4,
    700: 3,
  },
  children: MockData.list.map((i, index) => {
    return (
      <MasonryFlexItem key={index} height={i.height}>
        <div>
          <p>{index + 1}</p>
          <img src={i.img} style={{ maxWidth: "100%" }} />
        </div>
      </MasonryFlexItem>
    );
  }),
};

export const RowSortWithHeightUseAbsolute = Template.bind({});
RowSortWithHeightUseAbsolute.args = {
  sortWithHeight: true,
  useAbsolute: true,
  columnsCountBreakPoints: {
    1400: 5,
    1000: 4,
    700: 3,
  },
  children: MockData.list.map((i, index) => {
    return (
      <MasonryAbsoluteItem key={index} width={i.width} height={i.height}>
        <div>
          <p>{index + 1}</p>
          <img src={i.img} style={{ maxWidth: "100%" }} />
        </div>
      </MasonryAbsoluteItem>
    );
  }),
};
