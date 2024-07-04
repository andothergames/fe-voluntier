import DropDownPicker from 'react-native-dropdown-picker';

export function DropDown({
  items,
  setItems,
  value,
  setValue,
  open,
  setOpen,
  multiple,
  min,
  max,
}) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      multiple={multiple}
      min={min}
      max={max}
    />
  );
}
