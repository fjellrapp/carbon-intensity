import { ReactNode } from "react";

export default function TableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={className}>{children}</th>;
}
