import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IShipmentNote } from "./ShipmentNoteTypes";
import {FiEdit} from "react-icons/fi";
import {FaRegTrashAlt, FaFileDownload, FaEye} from "react-icons/fa";
import {useDeleteShipmentNote} from "./ShipmentNoteQueries";
import {ApiClientFileDownload} from "../../../../utils/apiClient";
import { TOKEN } from "pages/bol_info/constants/BOLConstants";
import {isNull} from "lodash";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper<IShipmentNote>()

export const ShipmentNoteTableColumns = (setDlgShipmentNote: Function, addNoteModalFun: Function) => {

    const {mutate: deleteShipmentNote} = useDeleteShipmentNote();

    const onDelete = (id: number) => {
        deleteShipmentNote(id);
        toast.success('Note deleted successfully');
    }

    const onDownload = async (id: number, attachment: string|null) => {

        if(isNull(attachment)){
            return null;
        }

        return await ApiClientFileDownload.get(`freight-notes/${id}/attachment`).then((response) => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", attachment);
            document.body.appendChild(link);
            link.click();
        });
    };

    async function onView(id: number, shipmentId:number, attachment:string|null) {

        if(isNull(attachment)){
            return null;
        }

        return await ApiClientFileDownload.get(`freight-notes/${id}/attachment`).then((response) => {
            const href = URL.createObjectURL(response.data);
            const baseUrl = `${process.env.REACT_APP_API_FREIGHT_URL}/freight-notes/${id}/attachment/${attachment}`;
            const token = localStorage.getItem(TOKEN);
            const decodedToken = token ? decodeURIComponent(token) : null;
            const urlWithToken = decodedToken ? `${baseUrl}?token=${encodeURIComponent(decodedToken)}` : baseUrl;
    
            window.open(urlWithToken, '_blank');
            URL.revokeObjectURL(href);
        });
    }

    const onEdit = (row: IShipmentNote) => {

        setDlgShipmentNote({
            id: row.id,
            title: row.title,
            message: row.message,
            public: row.public.toString(),
            shipmentId: row.shipmentId,
        })

        addNoteModalFun()
    }

    return [

        columnHelper.display({
            id: "title",
            header: () => 'Notes and Documents',
            cell: (props) => {

                const row = props.row.original;

                return (
                    <>
                        <div className="text-[#262626]">{row.title}</div>
                        <div className="text-gray-2 mt-2">
                            <p>{row.message}</p>
                        </div>
                    </>
                )
            }
        }),

        columnHelper.accessor('createdDate', {
            header: () => (
                <div className="text-center">
                    Date
                </div>
            ),
            cell: info => {
                
                const date = new Date(info.getValue());
                
                const formattedDate = date.toISOString().split('T')[0];
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                const formattedDateTime = `${formattedDate}  ${formattedTime}`;
                
                return (
                    <div className={'text-gray-2 text-center'}>
                        {formattedDateTime}
                    </div>
                );
            },
        }),
        

        columnHelper.accessor('createdBy', {
            header: () => (
                <div className="text-center">
                    Created By
                </div>
            ),
            cell: info => (
                <div className={'text-gray-2 text-center'}>
                    {info.getValue()}
                </div>
            ),
        }),

        columnHelper.display({
            id: "action",
            header: () => 'ACTION',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <>
                        <div className="flex items-center justify-center space-x-4">
                            {
                                row.editable && <>
                                    <FiEdit
                                        size={"1.4em"}
                                        className="cursor-pointer"
                                        onClick={() => onEdit(row)}
                                    />
                                    <FaRegTrashAlt
                                        color="#c6292a"
                                        size={"1.4em"}
                                        className="cursor-pointer"
                                        onClick={() => onDelete(row.id)}
                                    />
                                </>
                            }
                            {
                                row.attachment &&
                                <>
                                    <FaEye
                                        size={"1.4em"}
                                        className="cursor-pointer"
                                        onClick={() => onView(row.id, row.shipmentId, row.attachment)}
                                    />
                                    <FaFileDownload
                                        size={"1.4em"}
                                        className="cursor-pointer"
                                        onClick={() => onDownload(row.id, row.attachment)}
                                    />
                                </>
                            }
                        </div>
                    </>
                )
            }
        }),
    ];
}

