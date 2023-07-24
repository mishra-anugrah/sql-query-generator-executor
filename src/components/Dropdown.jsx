import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
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

  const getColumnLabel = (value) => {
    return menuItems.find((item) => item.value === value).label;
  };

  const renderMultiSelectvalue = (selected) => (
    <Stack gap={1} direction="row" flexWrap="wrap">
      {selected.map((value) => (
        <Chip key={value} label={getColumnLabel(value)} />
      ))}
    </Stack>
  );

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
          renderValue={isMulti ? renderMultiSelectvalue : (val) => val}
        >
          {menuItems.map((menuItem, index) => (
            <MenuItem key={index} value={menuItem.value}>
              {menuItem.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  ) : (
    <></>
  );
};
