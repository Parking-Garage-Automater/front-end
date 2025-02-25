'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setUser } from '@/lib/features/user/userSlice'
import { useDispatch } from 'react-redux';
import { API_CONSTANTS } from '@/APIConstants'
import { toast } from 'sonner'
import { setUserCookie } from '@/components/cookies'



export const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [licenseno, setLicenseno] = useState('')
    const dispatch = useDispatch();

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let url = API_CONSTANTS.USER_API + '/' + username + '/' + licenseno;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await res.json();
            if (response.status == 'success') {
                setUserCookie(response.data.username, response.data.licence);
                dispatch(setUser({username: response.data.username, licenseno: response.data.licence, id: response.data.id, 
                    autopayment: response.data.payment_plan, profileURL: response.data.profile_url}));
                toast.success("Login Successful");
                router.push('/dashboard');
            } else {
                toast.error(response.message)
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                    className="w-full"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="username"
                    maxLength={20}
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="licenseno">License Number</Label>
                <Input
                    className="w-full"
                    required
                    value={licenseno}
                    onChange={(e) => setLicenseno(e.target.value)}
                    id="licenseno"
                    type="licenseno"
                    maxLength={5}
                />
            </div>
            <div className="w-full">
                <Button className="w-full" size="lg">
                    Login 
                </Button>
            </div>
        </form>
    )
}
