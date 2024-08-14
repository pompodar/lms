import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>

            {status && <div className="mb-4 font-medium text-sm text-white">{status}</div>}

            <form onSubmit={submit}
                className="bg-body-dark text-white"
            >
                <div>
                    <InputLabel 
                        className="text-white"
                        htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full bg-body-dark text-white"
                        style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                            boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                        }}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel 
                        className="text-white"
                        htmlFor="password" value="Password" 
                        />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full bg-body-dark text-white"
                        style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                            boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                        }}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-white">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}
                    style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                        boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                    }}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
