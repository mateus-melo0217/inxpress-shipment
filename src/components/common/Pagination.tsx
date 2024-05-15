import React from 'react';

type PageProps = {
    pageNum?: number;
    currentPage?: number;
    setCurrent?: Function;
    next?: Function;
    prev?: Function;
    toSpecifiedPage?:Function;
    totalCnt: number;
    perPage: number;
}

export const Pagination = (props: PageProps) => {
    const {pageNum = 5, currentPage = 0, setCurrent = () =>{}, next = () => {}, prev = () => {}, toSpecifiedPage = () => {}, totalCnt, perPage} = props;
    const calcShowPageArr= () => {
        let showPageNumArr = [];

        if (!totalCnt) {
            showPageNumArr = [1];
            return showPageNumArr;
        }

        if (currentPage === 1) {
            showPageNumArr = [1,2,3]
        } else if (currentPage === pageNum) {
            showPageNumArr = [pageNum-2, pageNum-1, pageNum]
        } else {
            showPageNumArr = [currentPage - 1, currentPage, currentPage + 1]
        }
        showPageNumArr = showPageNumArr.filter(num => num > 0 && num <= Math.ceil(totalCnt / perPage))
        return showPageNumArr;
    }
    const arr = calcShowPageArr();
    return (
        <div className="items-center lg:my-8 my-4 hidden md:flex">
            <div
                onClick={() => {
                    if (currentPage > 1) {
                        toSpecifiedPage(1)
                    }
                }}
                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${currentPage > 1 ? ' hover:bg-green-1 hover:text-white cursor-pointer':' text-disabled-gray-2'}`}>
                &lt;&lt;
            </div>
            <div
                onClick={() => {
                    if (currentPage > 1) {
                        prev()
                    }
                }}
                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${currentPage > 1 ? ' hover:bg-green-1 hover:text-white cursor-pointer':' text-disabled-gray-2'}`}>
                &lt;
            </div>

            {arr.length &&
                arr.map((item, index) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(item)
                            }}
                            className={`w-12 h-12 text-sbase cursor-pointer  border hover:bg-green-1 hover:text-white flex items-center justify-center rounded ${ item === currentPage ? ' bg-green-1 text-white':''}`} key={`pagination_${index}`}>
                            {item}
                        </div>
                    );
                })}
            <div
                onClick={() => {
                    if (currentPage < pageNum) {
                        next()
                    }
                }}
                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${currentPage < pageNum ? ' hover:bg-green-1 hover:text-white cursor-pointer' : ' text-disabled-gray-2'}`}>
                &gt;
            </div>
            <div
                onClick={() => {
                    if (currentPage < pageNum) {
                        toSpecifiedPage(pageNum)
                    }
                }}
                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${currentPage < pageNum ? ' hover:bg-green-1 hover:text-white cursor-pointer' : ' text-disabled-gray-2'}`}>
                &gt;&gt;
            </div>
        </div>
    )
}