import React from "react";

export type DropdownProps = {
    title: string | React.ReactNode;
    children: React.ReactNode;
    exCls?: string;
};

const Dropdown = ({ title, children, exCls }: DropdownProps) => {
    return (
        <div className="group inline-block relative z-10 after:absolute after:content-'' after:top-[22px] after:left-[-50px] after:w-[50px] after:h-full after:bg-transparent">
            <button className="group-hover:bg-blue-1 group-hover:text-white inline-flex items-center">
                <>{title}</>
            </button>
            <div className={`absolute right-0 invisible origin-top-left text-left group-hover:visible min-w-[120px] rounded-md shadow-lg bg-blue-1 ring-1 ring-black ring-opacity-5 ${exCls}`}>
                <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;