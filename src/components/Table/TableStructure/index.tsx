export default function TableStructure({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}
