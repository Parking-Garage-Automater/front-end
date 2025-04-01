'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_CONSTANTS } from '@/constants/ApiConstants'
import { toast } from 'sonner'
import { useAuth } from '@/authContext/authContext'
import { setCookie } from 'cookies-next'



export const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [licenseno, setLicenseno] = useState('')
    const { login } = useAuth();

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let url = API_CONSTANTS.LOGIN;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    licence: licenseno,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await res.json();
            if (response.status == 'success') {
                login(response.data.username);
                setCookie('Token', response.data.token);
                if (typeof window !== "undefined"){
                    window.localStorage.setItem("license", response.data.licence);
                }
                toast.success("Login Successful");
                router.push('/dashboard');
            } else {
                toast.error("Login Failed. Please Try Again")
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
