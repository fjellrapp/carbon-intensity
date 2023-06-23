import { ReactNode } from "react";

export default function TableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={`p-4  ${className}`}>{children}</th>;
}
