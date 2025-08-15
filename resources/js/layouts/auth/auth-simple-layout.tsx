import { Link, usePage } from '@inertiajs/react';

export default function AuthSimpleLayout({ title, description, children }) {
    const user = usePage().props.auth?.user;
    const isAdmin = user?.roles?.some((role) => role.name === 'Admin');

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            {/* Navigation */}
            <nav className="flex gap-4 border-b p-4">
                <Link href={route('dashboard')} className="text-sm font-medium">
                    Dashboard
                </Link>

                {isAdmin && (
                    <Link href={route('admin.users.index')} className="text-sm font-medium">
                        Menu Admin
                    </Link>
                )}
            </nav>

            {/* Page Content */}
            <main className="p-6">
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-muted-foreground mb-4">{description}</p>
                {children}
            </main>
        </div>
    );
}
