// resources/js/pages/userMgmt/userVerification.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    requested_role: string;
    role: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Role',
        href: '/admin/users',
    },
];

export default function UserVerification() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios
            .get('/api/admin/users')
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = (id: number) => {
        axios.post(`/api/admin/users/${id}/approve`).then(() => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        });
    };

    const handleReject = (id: number) => {
        axios.post(`/api/admin/users/${id}/reject`).then(() => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border bg-white p-4 md:min-h-min dark:bg-neutral-900">
                    <h2 className="mb-4 text-xl font-semibold">Verifikasi Permintaan Role</h2>
                    {users.length > 0 ? (
                        <table className="w-full table-auto border">
                            <thead className="bg-gray-100 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">Nama</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Requested Role</th>
                                    <th className="px-4 py-2 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t dark:border-neutral-700">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.requested_role}</td>
                                        <td className="space-x-2 px-4 py-2">
                                            <button
                                                className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                                                onClick={() => handleApprove(user.id)}
                                            >
                                                Setujui
                                            </button>
                                            <button
                                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                onClick={() => handleReject(user.id)}
                                            >
                                                Tolak
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-10 text-center text-gray-500 dark:text-gray-400">Tidak ada permintaan role saat ini.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
