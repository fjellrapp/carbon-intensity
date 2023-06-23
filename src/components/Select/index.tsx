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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="countries"
        defaultValue={options[0]}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
