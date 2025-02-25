'use client'
import { useEffect, useState } from 'react';
import Dashboard from './dashboard/page';
import { getUserCookie } from '@/components/cookies';
import { useDispatch } from 'react-redux';
import { API_CONSTANTS } from '@/APIConstants';
import { setUser } from '@/lib/features/user/userSlice';
import router from 'next/router';
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress"


export default function Home() {

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
					autopayment: response.data.payment_plan, profileURL: response.data.profile_url,
					id: response.data.id
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
		<Progress value={progress} className="w-[60%]" /></div>) : (<Dashboard />));
}