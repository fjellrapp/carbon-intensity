export default function TableRow({
  children,
  className,
  isTableHead = false,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  isTableHead?: boolean;
  onClick?: (
    event:
      | React.MouseEvent<HTMLTableRowElement>
      | React.KeyboardEvent<HTMLTableRowElement>
  ) => void;
  className?: string;
}) {
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
      {...props}
    >
      {children}
    </tr>
  );
}
