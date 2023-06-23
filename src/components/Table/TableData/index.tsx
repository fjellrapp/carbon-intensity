import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export default function TableData({ children, className }: Props) {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
}
