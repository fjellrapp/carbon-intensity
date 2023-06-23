import React from "react";
type Props = {
  label: string;
  options: readonly string[];
  placeholder?: string;
  capitalize?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
/** Native select */
export default function Dropdown({
  options = [],
  label,
  placeholder,
  capitalize = true,
  onChange,
}: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-white"
      >
        {label}
      </label>
      <select
        id="countries"
        defaultValue={options[0]}
        onChange={onChange}
        className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-200 placeholder-gray-400 text-dark focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {capitalize ? capitalizeFirstLetter(option) : option}
          </option>
        ))}
      </select>
    </>
  );
}
