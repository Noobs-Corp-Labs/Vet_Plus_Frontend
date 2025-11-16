import { ReactNode } from "react";

interface LabelValueDisplayProps {
  title: string;
  text?: ReactNode;
}

export function LabelValueDisplay({ title, text }: LabelValueDisplayProps) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <h1 className="scroll-m-20 text-xl w-full tracking-tight font-bold text-wrap wrap-break-word">
        {title || ""}
      </h1>
      <h2 className="tracking-tight text-xl">
        {text}
      </h2>
    </div>
  );
}