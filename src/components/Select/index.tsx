import capitalizeFirstLetter from "@/utils/helpers/capitalizeFirstLetter";
import React from "react";
type Props = {
  /** The label for the dropdown */
  label: string;
  /** The options for the dropdown. Is readonly */
  options: readonly string[];
  /** Whether to capitalize the first letter of the label. Defaults to true. */
  capitalize?: boolean;
  /** The onChange handler for the dropdown */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

/**
 *  Dropdown component
 *  This uses the browser native select element
 */

export default function Dropdown({
  options = [],
  label,
  capitalize = true,
  onChange,
}: Props) {
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
