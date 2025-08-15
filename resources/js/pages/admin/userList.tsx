
import UserRoleManager from '@/components/admin/UserRoleManager';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm, router } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function UserList({ users, roles, filters }) {
  const { data, setData, post } = useForm({
    search: filters.search || '',
    role: Array.isArray(filters.role) ? filters.role : filters.role ? [filters.role] : [],
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: route('admin.users.index') },
    { title: 'User List', href: route('admin.users.index') },
  ];

  useEffect(() => {
    const delay = setTimeout(() => {
      post(route('admin.users.index'), {
        preserveState: true,
        replace: true, // ✅ Hindari perubahan URL
      });
    }, 500);
    return () => clearTimeout(delay);
  }, [data.search, data.role]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {/* Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Cari nama atau email..."
          value={data.search}
          onChange={(e) => setData('search', e.target.value)}
          className="w-full md:w-[300px]"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between md:w-[200px]">
              {data.role.length > 0
                ? roles
                    .filter((r) => data.role.includes(r.name))
                    .map((r) => r.name)
                    .join(', ')
                : 'Semua Role'}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px]">
            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <label key={role.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={data.role.includes(role.name)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...data.role, role.name]
                        : data.role.filter((name) => name !== role.name);
                      setData('role', updated);
                    }}
                  />
                  <span className="text-sm">{role.name}</span>
                </label>
              ))}

            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* User Role Cards */}
      <div className="grid gap-6">
        <UserRoleManager users={users.data} roles={roles} />
      </div>

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
    </AppLayout>
  );
}
