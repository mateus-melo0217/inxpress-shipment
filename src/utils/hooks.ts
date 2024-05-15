import { useCallback, useEffect, useRef } from "react";

export default function useComponentVisible(
    hIndex: number,
    setHIndex: Function,
    rowId: number
) {
    const ref = useRef(null);

    const handleClickOutside = useCallback(
        (event: { target: any }) => {
            if (
                ref.current &&
                !(ref.current as any).contains(event.target) &&
                hIndex === rowId
            ) {
                setHIndex(-1);
            }
        },
        [hIndex, rowId, setHIndex]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [handleClickOutside, rowId]);

    return { ref };
}