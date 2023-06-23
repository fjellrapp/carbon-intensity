export default function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <thead className="text-xs uppercase bg-gray-300 rounded-md text-dark text-dark-400">
      {children}
    </thead>
  );
}
