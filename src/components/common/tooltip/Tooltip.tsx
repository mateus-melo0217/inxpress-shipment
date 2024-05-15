import React, { memo } from "react";

export type TooltipProps = {
  children: React.ReactNode;
  text: any;
  extClsName?: string;
  position?: string;
};

const Tooltip: React.FC<TooltipProps> = memo(({text, children, extClsName="", position=""}) => {
  const tooltipStyle = position === "top-left" ? { right: "10px" } : {};
  return (
    <span className="group">
      <span className={`pointer-events-none z-100 rounded-lg bg-white absolute top-[-10px] right-[-40px] border-[1px] border-grey whitespace-nowrap px-2 py-1 opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#888] before:content-[''] group-hover:opacity-100 ` + extClsName} style={tooltipStyle}>
        {text}
      </span>
      {children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
