'use client'
import SideNav from "@/components/side-nav";
import Header from "../header";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import "@/styles/globals.css"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_CONSTANTS } from "@/constants/ApiConstants";

export default function Dashboard() {
	const [parkingSpots, setParkingSpots] = useState<{ [key: string]: boolean }>({
		a1: false,
		a2: false,
	});
	let licenseno: string = '';
	if (typeof window !== "undefined"){
		licenseno = window.localStorage.getItem('license') || '';
	}


	useEffect(() => {
		const worker = new Worker("/parkingSpotWorker.js");
		worker.postMessage({ apiUrl: API_CONSTANTS.GET_PARKING_SPOT_STATUS });

		worker.onmessage = (event) => {
			console.log(event.data);
			let parkingSpotData = event.data;
			if (parkingSpotData.amount_in_use > 0) {
				setParkingSpots(parkingSpotData.lot)
			}
		};

		return () => worker.terminate();
	}, []);

	const MakePayment = async () => {
		try {
			let licenseno: string = '';
			if (typeof window !== "undefined"){
				licenseno = window.localStorage.getItem('license') || '';
			}
			let url = API_CONSTANTS.PAYMENT;
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					plate_number: licenseno,
					source: "website",
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let response = await res.json();
			console.log(response);
			if (response.status == 'success') {
				console.log(response);
				toast.success("Login Successful");
			} else {
				toast.error(response.detail);
			}
		} catch (error: any) {
			toast.error(error?.message)
		}
	};

	return (
		(<div>
			<Header />
			<div className="flex">
				<SideNav />
				<div className="w-full overflow-x-auto">
					<div className="sm:h-[calc(99vh-60px)] overflow-auto ">
						<div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
							<div className='flex flex-col gap-2 pt-3'>
								{licenseno !== 'admin' && <div className="flex justify-center">
									<Card className="w-[25vw] h-[12vh]">
										<CardHeader>
											<CardTitle className="text-center text-black">Make Payment</CardTitle>
											<CardDescription className="text-center">
												<Button onClick={MakePayment}>
													Pay
												</Button></CardDescription>
										</CardHeader>
									</Card>
								</div>}
								<div className="flex justify-center gap-4">
									{Object.entries(parkingSpots).map(([key, value]) => (
										<div key={key}>
											<Card className={!value ? 'bg-green-500 w-[30vw] h-[20vh]' : 'bg-red-500 w-[30vw] h-[20vh]'}>
												<CardHeader>
													<CardTitle className="text-center">{!value ? 'Parking Spot Available' : 'Parking Spot In Use'}</CardTitle>
													<CardDescription className="text-center text-black">Spot {key.toUpperCase()}</CardDescription>
												</CardHeader>
											</Card>
										</div>
									))}

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	);
}