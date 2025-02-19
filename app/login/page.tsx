import { RegisterForm } from './form'

export default function RegisterPage() {
    return (
        <div>
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <span>Parking Automater 🚗</span>
            </header>
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                    <h1 className="font-semibold text-2xl">Sign in to your Account </h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
