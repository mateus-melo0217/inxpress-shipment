import { flexRender, Table } from '@tanstack/react-table'
import { IShipmentNote } from "./ShipmentNoteTypes";
import React from 'react'

interface IShipmentNoteTableProps {
    table: Table<IShipmentNote>
}
const ShipmentNoteTable = ({ table }: IShipmentNoteTableProps) => {
    return (
        <table className="w-full text-left max-h-[200px] overflow-y-scroll">
            <thead className="bg-lightest-gray uppercase">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="text-blue-1 text-sbase font-medium py-4 px-6">
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-lighter-gray border-solid">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="py-4 px-6 text-gray-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ShipmentNoteTable