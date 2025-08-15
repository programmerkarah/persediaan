import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Role, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

type UserRoleManagerProps = {
    users: User[];
    roles: Role[];
};

export default function UserRoleManager({ users, roles }: UserRoleManagerProps) {
    return (
        <div className="grid gap-6">
            {users.map((user) => (
                <UserCard key={user.id} user={user} roles={roles} />
            ))}
        </div>
    );
}

type UserCardProps = {
    user: User[];
    roles: Role[];
};

function UserCard({ user, roles }: UserCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    const { data, setData, patch, processing, errors } = useForm<{ role_ids: number[] }>({
        role_ids: user.roles.map((r) => r.id),
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('admin.users.role.update', user.id), {
            preserveScroll: true,
            onSuccess: () => setIsSaved(true),
        });
    };

    return (
        <Card className="w-full md:max-w-3xl">
            <CardHeader>
                <CardTitle>
                    {user.name} <span className="text-muted-foreground text-sm">({user.email})</span>
                </CardTitle>

                {user.roles.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                            <span key={role.id} className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs">
                                {role.name}
                            </span>
                        ))}
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="flex flex-col gap-4 md:flex-row md:items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between text-left whitespace-normal md:w-[300px]">
                                {data.role_ids.length > 0
                                    ? roles
                                          .filter((r) => data.role_ids.includes(r.id))
                                          .map((r) => r.name)
                                          .join(', ')
                                    : 'Pilih role'}
                                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px]">
                            <div className="flex flex-col gap-2">
                                {roles.map((role) => (
                                    <label key={role.id} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={data.role_ids.includes(role.id)}
                                            onCheckedChange={(checked: boolean) => {
                                                const updated = checked ? [...data.role_ids, role.id] : data.role_ids.filter((id) => id !== role.id);
                                                setData('role_ids', updated);
                                            }}
                                        />
                                        <span className="text-sm">{role.name}</span>
                                    </label>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Role'}
                    </Button>
                </form>
                <InputError message={errors.role_ids} className="mt-2" />
            </CardContent>
        </Card>
    );
}
