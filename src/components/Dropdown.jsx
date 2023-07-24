import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const Dropdown = (props) => {
  const {
    menuItems = [],
    value = null,
    label,
    handleDropdownChange,
    name,
    placeholder,
    isMulti,
  } = props;

  const onSelect = (event) => {
    handleDropdownChange(name, event.target.value);
  };

  return Array.isArray(menuItems) && menuItems.length ? (
    <div className="query-dropdown">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          placeholder={placeholder}
          label={label}
          value={value}
          onChange={onSelect}
          multiple={isMulti}
        >
          {menuItems.map((menuItem) => (
            <MenuItem value={menuItem.value}>{menuItem.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  ) : (
    <></>
  );
};
