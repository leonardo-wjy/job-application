export const primary = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px solid #b1b7c1" : "1px solid #b1b7c1",
    outline: state.isFocused ? "none" : "none",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      border: "1px solid #b1b7c1",
      boxShadow: "none",
    },
  }),
};
