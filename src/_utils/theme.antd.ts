export const PRIMARY_BRAND_COLOR = "#602EDF";
export const LAYOUT_BG_COLOR = "#F6F8F8";
export const TERTIARY_LAYOUT_BG_COLOR = "#F3F5FB";

const theme = {
  token: {
    colorPrimary: PRIMARY_BRAND_COLOR,
    colorInfo: PRIMARY_BRAND_COLOR,
    colorBgLayout: LAYOUT_BG_COLOR,
    fontFamily: "var(--font-dm-sans)",
  },
  components: {
    Button: {
      colorPrimary: "rgb(96, 46, 223)",
      colorPrimaryActive: "rgb(58, 28, 134)",
      colorPrimaryHover: "rgb(58, 28, 134)",
      textHoverBg: "rgb(249, 249, 255)",
      colorLink: "rgb(114, 46, 209)",
      colorLinkHover: "rgb(58, 28, 134)",
      colorLinkActive: "rgb(58, 28, 134)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
      colorText: "rgb(114, 46, 209)",
    },
    Breadcrumb: {
      linkHoverColor: "rgb(114, 46, 209)",
      lastItemColor: "rgba(69, 67, 67, 0.88)",
      linkColor: "rgb(0, 0, 0)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
    },
    Dropdown: {
      controlItemBgHover: "rgb(249, 249, 255)",
    },
    Pagination: {
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(58, 28, 134)",
      colorBgTextHover: "rgb(249, 249, 255)",
      controlOutline: "rgb(249, 249, 255)",
    },
    Steps: {
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
    },
    Cascader: {
      colorPrimaryBorder: "rgb(114, 46, 209)",
      colorPrimary: "rgb(114, 46, 209)",
      colorHighlight: "rgb(114, 46, 209)",
    },
    Checkbox: {
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(114, 46, 209)",
    },
    DatePicker: {
      activeBorderColor: "rgb(114, 46, 209)",
      colorPrimary: "rgb(114, 46, 209)",
    },
    Form: {
      colorPrimary: "rgb(114, 46, 209)",
      controlOutline: "rgb(114, 46, 209)",
      colorBorder: "rgb(235, 47, 150)",
      controlOutlineWidth: 0,
    },
    Input: {
      activeBorderColor: "rgb(114, 46, 209)",
      hoverBorderColor: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(114, 46, 209)",
      colorPrimaryActive: "rgb(249, 249, 255)",
      colorPrimary: "rgb(114, 46, 209)",
    },
    InputNumber: {
      activeBorderColor: "rgb(114, 46, 209)",
      handleHoverColor: "rgb(114, 46, 209)",
      hoverBorderColor: "rgb(114, 46, 209)",
    },
    Mentions: {
      activeBorderColor: "rgb(114, 46, 209)",
      hoverBorderColor: "rgb(114, 46, 209)",
    },
    Radio: {
      colorPrimary: "rgb(114, 46, 209)",
      buttonSolidCheckedActiveBg: "rgb(114, 46, 209)",
      buttonSolidCheckedBg: "rgb(114, 46, 209)",
      buttonSolidCheckedHoverBg: "rgb(114, 46, 209)",
    },
    Select: {
      optionSelectedBg: "rgb(249, 249, 255)",
      optionSelectedColor: "rgb(114, 46, 209)",
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(114, 46, 209)",
    },
    Switch: {
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(58, 28, 134)",
    },
    TreeSelect: {
      colorPrimaryHover: "rgb(114, 46, 209)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
      colorPrimary: "rgb(114, 46, 209)",
      nodeSelectedBg: "rgb(249, 249, 255)",
      controlItemBgHover: "rgb(249, 249, 255)",
      nodeHoverBg: "rgb(249, 249, 255)",
    },
    Slider: {
      handleColor: "rgb(96, 46, 223)",
      trackBg: "rgb(96, 46, 223)",
      trackHoverBg: "rgb(58, 28, 134)",
      handleActiveColor: "rgb(58, 28, 134)",
    },
    Upload: {
      colorPrimary: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(114, 46, 209)",
    },
    Avatar: {
      colorTextPlaceholder: "rgb(249, 249, 255)",
      colorTextLightSolid: "rgb(114, 46, 209)",
    },
    Badge: {
      colorError: "rgb(114, 46, 209)",
    },
    Calendar: {
      itemActiveBg: "rgb(249, 249, 255)",
      colorPrimary: "rgb(114, 46, 209)",
      controlItemBgHover: "rgb(249, 249, 255)",
      colorIconHover: "rgb(235, 47, 150)",
      controlItemBgActive: "rgb(114, 46, 209)",
    },
    Popover: {
      colorBgElevated: "rgb(58, 28, 134)",
      colorText: "rgba(255, 255, 255, 0.88)",
      colorTextHeading: "rgba(249, 249, 249, 0.88)",
    },
    Segmented: {
      trackBg: "rgb(249, 249, 255)",
      itemSelectedBg: "rgb(114, 46, 209)",
      itemSelectedColor: "rgba(255, 255, 255, 0.88)",
      colorText: "rgb(114, 46, 209)",
    },
    Statistic: {
      colorText: "rgb(114, 46, 209)",
      colorTextHeading: "rgb(114, 46, 209)",
    },
    Table: {
      rowHoverBg: "rgb(249, 249, 255)",
      headerBg: "rgb(249, 249, 255)",
      colorLinkHover: "rgb(114, 46, 209)",
      colorLinkActive: "rgb(114, 46, 209)",
      colorLink: "rgb(114, 46, 209)",
      colorPrimary: "rgb(114, 46, 209)",
      rowSelectedHoverBg: "rgb(114, 46, 209)",
      controlItemBgHover: "rgb(245, 34, 45)",
      controlItemBgActive: "rgb(114, 46, 209)",
      rowSelectedBg: "rgb(114, 46, 209)",
      borderColor: "rgb(204, 211, 222)",
      bodySortBg: "rgb(229, 229, 239)",
    },
    Tabs: {
      inkBarColor: "rgb(96, 46, 223)",
      itemActiveColor: "rgb(114, 46, 209)",
      itemHoverColor: "rgb(114, 46, 209)",
      itemSelectedColor: "rgb(114, 46, 209)",
      colorBorder: "rgb(114, 46, 209)",
      colorPrimaryBorder: "rgb(114, 46, 209)",
    },
    Timeline: {
      colorPrimary: "rgb(114, 46, 209)",
      colorSuccess: "rgb(114, 46, 209)",
    },
    Tooltip: {
      colorBgSpotlight: "rgb(58, 28, 134)",
    },
    Tree: {
      directoryNodeSelectedBg: "rgb(114, 46, 209)",
      colorPrimaryHover: "rgb(58, 28, 134)",
      nodeHoverBg: "rgb(249, 249, 255)",
      nodeSelectedBg: "rgba(114, 46, 209, 0.29)",
      colorPrimaryBorder: "rgb(255, 255, 255)",
      colorPrimary: "rgb(114, 46, 209)",
    },
    Message: {
      colorInfo: "rgb(114, 46, 209)",
    },
    Notification: {
      colorBgElevated: "rgb(43, 17, 110)",
      colorText: "rgba(255, 255, 255, 0.88)",
      colorTextHeading: "rgba(255, 255, 255, 0.88)",
      colorIconHover: "rgba(255, 255, 255, 0.88)",
      colorInfo: "rgb(255, 255, 255)",
      colorIcon: "rgba(231, 230, 230, 0.45)",
    },
    Popconfirm: {
      colorWarning: "rgb(255, 255, 255)",
    },
    Progress: {
      defaultColor: "rgb(114, 46, 209)",
    },
    Result: {
      colorSuccess: "rgb(58, 28, 134)",
    },
    Spin: {
      colorPrimary: "rgb(114, 46, 209)",
    },
  },
};

export default theme;
