import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Manager {
    id: number;
    name: string;
}

interface Artist {
    id: number;
    name: string;
}

interface Promotion {
    id: number;
    artist_id: number;
    artist: Artist;
    track_title: string;
    intermediary_name: string | null;
    intermediary_contact: string;
    intermediary_channel: string;
    package_tier: string;
    boost_count: number;
    amount_paid: string;
    payment_method: string;
    receiver_number: string;
    transaction_id: string;
    manager_id: number;
    status: 'PENDING' | 'ACTIVE' | 'DONE';
    manager: Manager;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PromotionsData {
    data: Promotion[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    promotions: PromotionsData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promotions',
        href: '/promotions',
    },
];

const statusColors = {
    PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    ACTIVE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    DONE: 'bg-green-500/10 text-green-500 border-green-500/20',
};

export default function Index({ promotions }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
            router.delete(`/promotions/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promotions" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Promotions</h1>
                    <Link href="/promotions/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Promotion
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Artiste</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Intermédiaire</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {promotions.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                                        Aucune promotion trouvée
                                    </TableCell>
                                </TableRow>
                            ) : (
                                promotions.data.map((promotion) => (
                                    <TableRow key={promotion.id}>
                                        <TableCell className="font-medium">{promotion.artist.name}</TableCell>
                                        <TableCell>{promotion.track_title}</TableCell>
                                        <TableCell>{promotion.package_tier}</TableCell>
                                        <TableCell>{parseFloat(promotion.amount_paid).toLocaleString()} Ar</TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[promotion.status]}>
                                                {promotion.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {promotion.intermediary_name || '-'}
                                            {promotion.intermediary_name && (
                                                <div className="text-xs text-muted-foreground">
                                                    {promotion.intermediary_channel}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/promotions/${promotion.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/promotions/${promotion.id}/edit`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(promotion.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
