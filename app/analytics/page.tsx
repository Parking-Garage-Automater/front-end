// components/GridComponent.tsx
"use client";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import SideNav from "@/components/side-nav";
import Header from "../header";
import { API_CONSTANTS } from "@/constants/ApiConstants";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);



const GridComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);

    const formatDateTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, 
        });
      };

    useEffect(() => {
        let url: string = API_CONSTANTS.GET_HISTORY_ALL;
        let licenseno: string = localStorage.getItem('license') || '';
        if(licenseno !== 'admin'){
            url = API_CONSTANTS.GET_HISTORY + licenseno
        }
        fetch(url)
            .then((result) => result.json())
            .then((data) => {
                if (data.detail) {
                    toast.error(data.detail);
                } else {
                    console.log(data);
                    const formattedData = data.history.flatMap((session: any) =>
                        session.payments
                            .map((payment: any) => ({
                                session_id: session.session_id,
                                license_plate: session.license_plate,
                                entry_timestamp: formatDateTime(session.entry_timestamp),
                                exit_timestamp: formatDateTime(session.exit_timestamp),
                                amount: payment.amount, 
                                payment_timestamp: formatDateTime(payment.payment_timestamp),
                                is_paid: payment.is_paid ? "Yes" : "No",
                                payment_source: payment.payment_source,
                                note: payment.note,
                            }))
                    );
                    setRowData(formattedData);
                }

            });
    }, []);


    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: "Session ID", field: "session_id" },
        { headerName: "License Plate", field: "license_plate" },
        { headerName: "Entry Time", field: "entry_timestamp" },
        { headerName: "Exit Time", field: "exit_timestamp" },
        { headerName: "Amount", field: "amount" },
        { headerName: "Payment Time", field: "payment_timestamp" },
        { headerName: "Source", field: "payment_source" },
        { headerName: "Paid", field: "is_paid" },
        { headerName: "Note", field: "note" },
    ]);

    return (
        (<div>
            <Header />
            <div className="flex">
                <SideNav />
                <div className="w-full overflow-x-auto">
                    <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
                        <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                            <div className='flex gap-2 pt-3'>
                                <div className="flex gap-4">
                                    <div style={{ width: "80vw", height: "90vh", position: "relative" }}>
                                        <AgGridReact
                                            rowData={rowData}
                                            columnDefs={columnDefs}
                                            defaultColDef={{ sortable: true, filter: true }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    );
};


export default GridComponent;
