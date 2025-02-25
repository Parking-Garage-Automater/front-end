'use client'
import { useEffect } from 'react';
import Dashboard from './dashboard/page';
import { getUserCookie } from '@/components/cookies';
import { useDispatch } from 'react-redux';
import { API_CONSTANTS } from '@/APIConstants';
import { setUser } from '@/lib/features/user/userSlice';
import router from 'next/router';
import { toast } from 'sonner';


export default function Home() {

  const dispatch = useDispatch();

	useEffect(() => {
		fetchData();
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
			} else {
				toast.error("Session Expired")
				router.push('/login')
			}
		}
	};

  return <Dashboard />;
}