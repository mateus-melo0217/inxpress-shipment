import React, { useState, useCallback, useEffect } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { quoteItemTypes, ShipmentTypes } from './SavedQuotesTypes';
import { CHANGE_COLUMN_ORDER_SAVED_QUOTES, UPDATE_ADDITIONAL_INFO, UPDATE_SELECTED_QUOTE } from 'actions';
import { useDispatch } from 'react-redux';
import { useQuoteItems } from './SavedQuotesQueries';
import { QuoteNumberColumn } from './columns/QuoteNumberColumn';
import { ProviderQuoteIdColumn } from './columns/ProviderQuoteIdColumn';
import { CarrierColumn } from './columns/CarrierColumn';
import { PriceColumn } from './columns/PriceColumn';
import { ServiceColumn } from './columns/ServiceColumn';
import { TransitTimeColumn } from './columns/TransitTimeColumn';
import { HandlingUnitsColumn } from './columns/HandlingUnitsColumn';
import { InsuredAmountColumn } from './columns/InsuredAmountColumn';
import ClipLoader from 'react-spinners/ClipLoader';
import { DispatchButton } from "./action_menus/DispatchButton";
import { Overlay } from "../bol_info/common/AddressBookDialog";
import {hiddenCellGroup, columns} from 'utils/constants/Quotes'
import spinningWheel from "assets/images/spinningWheel.svg";
interface PropTypes {
  table: Table<ShipmentTypes>;
  isTableLoading: boolean;
}

const shouldHide = (cell: string) => {
  if (hiddenCellGroup.includes(cell)) {
    return true;
  }
  return false;
};

export const SavedQuotesTable = ({
  table,
  isTableLoading,
}: PropTypes) => {
  const dispatch = useDispatch();

  const [from, setFrom] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pointQuoteRow, setPointQuoteRow] = useState<string>('');
  const { data: quoteItemsData, isLoading } = useQuoteItems(pointQuoteRow);
  const [itemInd, setItemInd] = useState<number>(-1);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const startDragging = (from: string) => {
    setIsDragging(true);
    setFrom(from);
  };

  const changeColumnOrder = useCallback(
    (to: string) => {
      if (to === from) return;
      if (from == null) return null;
      dispatch({
        type: CHANGE_COLUMN_ORDER_SAVED_QUOTES,
        moving: {
          from: from,
          to: to,
        },
      });
      setIsDragging(false);
    },
    [dispatch, from]
  );

  const getColVal = useCallback((col: any, data: quoteItemTypes) => {
    const quoteItem = data.quoteItem;
    switch (col) {
      case 'providerQuoteId':
        return <ProviderQuoteIdColumn  providerQuoteId={quoteItem.providerQuoteId} />;
      case 'quoteNumber':
        return (
          <QuoteNumberColumn quoteNumber={quoteItem.quoteNumber} />
        );
      case 'carrier':
        return <CarrierColumn carrierName={quoteItem.carrierName} />;
      case 'price':
        return <PriceColumn price={quoteItem.price} />;
      case 'franchiseCost':
        return <PriceColumn price={quoteItem.baseRate} />;
      case 'service':
        return <ServiceColumn serviceType={quoteItem.serviceType} />;
      case 'transitTime':
        return <TransitTimeColumn transitTime={quoteItem.transitTime} />;
      case 'handlingUnits':
        return <HandlingUnitsColumn palletCount={data.palletCount} />;
      case 'insurance':
        return (
          <InsuredAmountColumn cellContext={data}
          />
        );
      default:
        break;
    }
  }, []);

  const shouldExpand = useCallback(
    (id: string) => {
      if (quoteItemsData && quoteItemsData?.length) {
        const oddRow = quoteItemsData.find(
          (data: any) => data.freightQuoteRequest.uuid !== id
        );
        return oddRow ? false : true;
      }
      return false;
    },
    [quoteItemsData]
  );

  const headerCnt = table.getHeaderGroups()[0].headers.length;
    
  const getTableHeader = () => {
    const tableHeader: any[] = [];
    table.getHeaderGroups().forEach((group: any) => {
        const filteredHeaders = group.headers.filter((item: any) => columns.includes(item.id));
        tableHeader.push(...filteredHeaders);
    });
    return tableHeader;
  }

  const getSubTableHeader = () => {
    const subTableHeader: any[] = [];
    table.getHeaderGroups().forEach((group: any) => {
        const filteredHeaders = group.headers.filter((item: any) => hiddenCellGroup.includes(item.id));
        subTableHeader.push(...filteredHeaders);
    });
    return subTableHeader;
  }


  const getTableContent = (row:any) => {
      const tableContent = row.getVisibleCells().filter((cell:any)=>{
          return columns.includes(cell.id.slice(2));
      })
      return tableContent;
  }   
  
  const getSubTableContent = (row:any) => {
    const tableContent = row.getVisibleCells().filter((cell:any)=>{
        return hiddenCellGroup.includes(cell.id.slice(2));
    })
    return tableContent;
  }  

  useEffect(()=>{
    if(quoteItemsData?.length && itemInd >= 0){
      const additionalObj = {
        uuid: quoteItemsData[itemInd]["freightQuoteRequest"]["uuid"] ? quoteItemsData[itemInd]["freightQuoteRequest"]["uuid"] : "uuid_demo",
        freightItems: quoteItemsData[itemInd]["freightQuoteRequest"]["freightItems"][0],
        tariffDescription: quoteItemsData[itemInd]["quoteItem"]["tariffDescription"] ? quoteItemsData[itemInd]["quoteItem"]["tariffDescription"] : "",
        transitTime: quoteItemsData[itemInd]["quoteItem"]["transitTime"] ? quoteItemsData[itemInd]["quoteItem"]["transitTime"] : "",
        providerQuoteItemId: quoteItemsData[itemInd]["quoteItem"]["providerQuoteItemId"] ? quoteItemsData[itemInd]["quoteItem"]["providerQuoteItemId"] : 0,
        carrierName: quoteItemsData[itemInd]["quoteItem"]["carrierName"] ? quoteItemsData[itemInd]["quoteItem"]["carrierName"] : "",
        serviceType: quoteItemsData[itemInd]["quoteItem"]["serviceType"] ? quoteItemsData[itemInd]["quoteItem"]["serviceType"] : "",
        providerId: quoteItemsData[itemInd]["quoteItem"]["providerId"] ? quoteItemsData[itemInd]["quoteItem"]["providerId"] : 0,
        providerQuoteId: quoteItemsData[itemInd]["quoteItem"]["providerQuoteId"] ? quoteItemsData[itemInd]["quoteItem"]["providerQuoteId"] : 0,
        tariffId: quoteItemsData[itemInd]["quoteItem"]["markupToApply"]["freightPricingId"] ? quoteItemsData[itemInd]["quoteItem"]["markupToApply"]["freightPricingId"] : "",
        price: quoteItemsData[itemInd]["quoteItem"]["displayPrice"] ? quoteItemsData[itemInd]["quoteItem"]["displayPrice"] : 0,
      }
      dispatch({
        type: UPDATE_ADDITIONAL_INFO,
        payload: additionalObj
      });
    }
  },[quoteItemsData, itemInd, dispatch])
  
  return (
    <React.Fragment>
      <table
        className="mt-15 pb-44 transition-all duration-200 min-h-[500px] w-full"
      >
        <thead>
          <tr className={'h-36 bg-lightest-gray'}>
            {getTableHeader().map((header:any) => (
              <th
                key={header.id}
                className={`relative text-center uppercase px-8 after:content-[''] after:border-r after:border-dashed after:border-light-gray after:absolute after:h-1/2 after:top-1/2 after:right-0 after:-translate-y-1/2 cursor-move ${
                  isDragging && header.id === from ? 'w-40 opacity-50' : 'w-52 last:w-[-webkit-fill-available]'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragStart={() => startDragging(header.id)}
                onDragLeave={() => changeColumnOrder(header.id)}
                draggable='true'
              >
                <div
                  className={`flex items-center justify-center select-none ${
                    header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : ''
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <TiArrowSortedUp size='1.2em' />,
                    desc: <TiArrowSortedDown size='1.2em' />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
            <th key='details'
              className="relative text-center uppercase px-8 after:content-[''] after:border-r after:border-dashed after:border-light-gray after:absolute after:h-1/2 after:top-1/2 after:right-0 after:-translate-y-1/2 cursor-move w-52 last:w-[-webkit-fill-available]'
              ">
                <div className="flex items-center justify-center select-none uppercase">
                  Details
                </div>
            </th>
          </tr>
        </thead>
        {isTableLoading ? (
          <tbody className='h-full'>
            <tr className='h-full'>
              <td colSpan={headerCnt} className='text-center h-full'>
                <ClipLoader
                  loading={isTableLoading}
                  size={100}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className='border-[0.5px] border-solid border-lighter-gray'>
             {table.getRowModel().rows.map((row:any) => {
              return (
                <React.Fragment key={row.id}>
                  <tr key={row.id} className={'h-56'}>
                  {getTableContent(row).map((cell:any) => {
                      const isQuoteIdCol = cell.column.id === 'quoteId';
                      const isSameQuoteRow =
                        pointQuoteRow ===
                        cell.getContext().row.original?.uuid;
                      return (
                        <td
                          key={cell.id}
                          className='border-solid border-0 border-t relative overflow-visible'
                        >
                          {shouldHide(cell.column.id) ? null : (
                            <div
                              onClick={
                                isQuoteIdCol
                                  ? () => {
                                    const item = cell.getContext().row.original
                                    ?.uuid;
                                      dispatch({
                                        type: UPDATE_SELECTED_QUOTE,
                                        payload: {
                                          selectedIndex: item 
                                        }
                                      })
                                      isSameQuoteRow
                                        ? setPointQuoteRow('')
                                        : setPointQuoteRow(item);
                                    }
                                  : () => {}
                              }
                              className={`flex justify-center items-center ${
                                isQuoteIdCol
                                  ? `cursor-pointer ${
                                      isSameQuoteRow ? 'text-green-1' : ''
                                    }`
                                  : ''
                              }`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                              {isQuoteIdCol ? (
                                isLoading ? (
                                  isSameQuoteRow ? (
                                    <ClipLoader
                                      loading={isLoading}
                                      size={10}
                                      aria-label='Loading Spinner'
                                      data-testid='loader'
                                    />
                                  ) : (
                                    <HiDocumentDuplicate />
                                  )
                                ) : (
                                  <HiDocumentDuplicate />
                                )
                              ) : null}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
  
                  {quoteItemsData?.length
                    ? shouldExpand(row.original.uuid) &&
                      quoteItemsData.map((data: any, ind: number) => {
                        const rowOption = {label: 'Dispatch', is_active: true}
                        const subVirtualColumns = (!row.original.expired && !row.original.dispatched) ? new Array(getTableHeader().length - 1).fill(0) : new Array(getTableHeader().length).fill(0);
                        const subTableHeader = getSubTableHeader().map((cell:any, idx:any) => flexRender(cell.column.columnDef.header, cell.getContext()))
                        const subTableContent = getSubTableContent(row).map((cell:any, idx:any) => cell.column.id)
                        // Check if the franchise cost column is displayed
                        if(data.quoteItem.baseRate){
                          subTableHeader.splice(3, 0, "franchise Cost")
                          subTableContent.splice(3, 0, "franchiseCost")
                        }
                        return (
                          <tr key={'items_' + ind + row.id} className={'h-[fit-content]'}>
                            {(!row.original.expired && !row.original.dispatched) && (
                              <td className='border-solid border-0 border-t relative overflow-visible text-center'>
                                <div className={`${ind === 0 && 'absolute bottom-[15px] left-1/2 transform -translate-x-1/2'}`}>
                                  <DispatchButton {...{ row, options: rowOption, ind, setItemInd, setIsSaving}} />
                                </div>
                              </td>
                            )}
                            {subVirtualColumns.map((_, idx) => (
                              <td key={'items_' + idx + row.id} className='border-solid border-0 border-t relative overflow-visible text-center'></td>
                            ))}
                            <td
                              key={'items_detail' + row.id}
                              className='relative overflow-visible text-center'
                            >
                              <table className='w-[-webkit-fill-available]'>
                                  <thead className={`${ind === 0 ? 'h-[inherit]' : 'h-[0px]'}`}>
                                    <tr className={`${ind === 0 ? 'h-36 bg-lightest-gray' : 'h-[0px] bg-transprent'}`}>
                                      {subTableHeader.map((cell:any, idx:any) => (
                                        <th key={'details' + idx}
                                          className={`relative text-center uppercase px-8 after:content-[''] after:border-r after:border-dashed after:${ind === 0 ? 'border-light-gray' : 'transparent'} after:absolute after:h-1/2 after:top-1/2 after:right-0 after:-translate-y-1/2 cursor-move ${data.quoteItem.baseRate ? "w-[calc(100% / 8)]" : "w-[calc(100% / 7)]"}`}>
                                            <div className={`flex items-center justify-center select-none uppercase ${ind === 0 ? 'text-inherit h-[inherit]' : 'text-[transparent] h-[0px]'}`}>
                                              { cell }
                                            </div>
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                <tbody className='h-[60px]'>
                                  <tr>
                                    {subTableContent.map((cell:any, idx:any) => (
                                        <td
                                          key={'items_' + idx}
                                          className={`border-solid border-0 border-b relative overflow-visible text-center min-w-[130px] max-w-[130px]`}
                                        >
                                          {getColVal(cell, data)}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                  </tbody>
                                </table> 
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </React.Fragment>
              );
            })}
          </tbody>
        )}
      </table>
      {isSaving ? (
        <>
        <Overlay />
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center">
          <div role="status">
            <img src={spinningWheel} className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" alt="Loading..." />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        </>) : 
        (<></>)
      }
    </React.Fragment>
  );
};
