type Props = {
  /**  The table row children */
  children: React.ReactNode;
  /** Whether the table row is a table head. Defaults to false. */
  isTableHead?: boolean;
  /** The onClick handler for the table row */
  onClick?: (
    event:
      | React.MouseEvent<HTMLTableRowElement>
      | React.KeyboardEvent<HTMLTableRowElement>
  ) => void;
  /** The className for the table row */
  className?: string;
};
export default function TableRow({
  children,
  className,
  isTableHead = false,
  onClick,
}: Props) {
  return (
    <tr
      className={`focus:outline-1 bg-gray-200 ${
        isTableHead ? "bg-gray-100" : "bg-gray-50"
      } focus-within:outline-black focus-within:bg-gray-100 ${
        !isTableHead && "cursor-pointer hover:bg-gray-100"
      } ${className}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        event.key === "Enter" && onClick && onClick(event);
      }}
    >
      {children}
    </tr>
  );
}
