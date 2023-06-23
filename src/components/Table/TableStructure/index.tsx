export default function TableStructure({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full text-sm text-left text-black">{children}</table>
    </div>
  );
}
