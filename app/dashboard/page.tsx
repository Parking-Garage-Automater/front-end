'use client'
import SideNav from "@/components/side-nav";
import Header from "../header";
import { getUserCookie, setUserCookie } from "@/components/cookies";
import { useEffect, useState } from "react";
import { API_CONSTANTS } from "@/APIConstants";
import { setUser } from "@/lib/features/user/userSlice";
import router from "next/router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(40);


	useEffect(() => {
		fetchData().then((value: any) => {
			setProgress(90);
		});
	}, [])

	const fetchData = async () => {
		let cookieData = getUserCookie();
		if (cookieData) {
			let url = API_CONSTANTS.USER_API + '/' + cookieData.username + '/' + cookieData.license;
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let response = await res.json();
			if (response.status == 'success') {
				dispatch(setUser({
					username: response.data.username, licenseno: response.data.licence,
					autopayment: response.data.payment_plan, profileURL: response.data.profile_url, id: response.data.id
				}));
				setLoading(false);

			} else {
				toast.error("Session Expired");
				router.push('/login');
				setLoading(false);

			}
		}
	};

	return (loading ? (<div className="pt-96 flex items-center justify-center">
		<Progress value={progress} className="w-[60%]" /></div>) :
		(<div>
			<Header />
			<div className="flex">
				<SideNav />
				<div className="w-full overflow-x-auto">
					<div className="sm:h-[calc(99vh-60px)] overflow-auto ">
						<div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
							<div className='flex gap-2 pt-3'>
								<div className="flex gap-4">
									<button className="w-40 h-16 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
										Dashboard</button>
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