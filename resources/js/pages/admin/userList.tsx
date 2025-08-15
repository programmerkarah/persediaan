import UserRoleManager from '@/components/admin/userRoleManager';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { router } from '@inertiajs/react';
import { SelectContent } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';

export default function UserList({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(route('admin.users.index'), { search, role }, { preserveState: true });
        }, 500);
        return () => clearTimeout(delay);
    }, [search, role]);

    return (
        <AuthLayout title="Manajemen Role" description="Atur role untuk setiap user yang terdaftar.">
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
                <Input placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Select value={role} onValueChange={setRole}>
                    <SelectContent>
                        <SelectItem value="__all__">Semua Role</SelectItem>
                        {roles.map((r) => (
                            <SelectItem key={r.id} value={r.name}>
                                {r.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <UserRoleManager users={users.data} roles={roles} />

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                {users.links.map((link) => (
                    <button
                        key={link.label}
                        disabled={!link.url}
                        onClick={() => router.get(link.url)}
                        className={`rounded px-3 py-1 ${link.active ? 'bg-primary text-white' : 'bg-muted'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </AuthLayout>
    );
}
