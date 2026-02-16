import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

interface Manager {
    id: number;
    name: string;
    email: string;
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
    status: 'PENDING' | 'ACTIVE' | 'DONE';
    manager: Manager;
    created_at: string;
    updated_at: string;
}

interface Props {
    promotion: Promotion;
}

const statusColors = {
    PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    ACTIVE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    DONE: 'bg-green-500/10 text-green-500 border-green-500/20',
};

const statusLabels = {
    PENDING: 'En attente',
    ACTIVE: 'Actif',
    DONE: 'Terminé',
};

export default function Show({ promotion }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Promotions',
            href: '/promotions',
        },
        {
            title: `Promotion #${promotion.id}`,
            href: `/promotions/${promotion.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${promotion.artist.name} - ${promotion.track_title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{promotion.artist.name}</h1>
                        <p className="text-muted-foreground">{promotion.track_title}</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge className={statusColors[promotion.status]}>
                            {statusLabels[promotion.status]}
                        </Badge>
                        <Link href={`/promotions/${promotion.id}/edit`}>
                            <Button>
                                <Pencil className="mr-2 h-4 w-4" />
                                Éditer
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Row 1: Artiste & Titre + Intermédiaire */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Informations Artiste & Titre */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations Artiste & Titre</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Nom de l'artiste</p>
                                    <p>{promotion.artist.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Titre du morceau</p>
                                    <p>{promotion.track_title}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations Intermédiaire */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations Intermédiaire</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Nom</p>
                                    <p>{promotion.intermediary_name || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Contact</p>
                                    <p>{promotion.intermediary_contact}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Canal</p>
                                    <p>{promotion.intermediary_channel}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Row 2: Package & Boost + Paiement */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Package & Boost */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Package & Boost</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Package</p>
                                    <p className="font-semibold">{promotion.package_tier}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Nombre de boosts</p>
                                    <p>{promotion.boost_count}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Montant payé</p>
                                    <p className="font-semibold">
                                        {parseFloat(promotion.amount_paid).toLocaleString()} Ar
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations de Paiement */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de Paiement</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">ID de transaction</p>
                                    <p className="font-mono">{promotion.transaction_id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Méthode de paiement</p>
                                    <p>{promotion.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Numéro récepteur</p>
                                    <p>{promotion.receiver_number}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    {/* Row 3: Gestionnaire + Dates */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Gestionnaire */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Gestionnaire</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Gestionnaire</p>
                                    <p>{promotion.manager.name}</p>
                                    <p className="text-sm text-muted-foreground">{promotion.manager.email}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dates */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Dates</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Créé le</p>
                                    <p>
                                        {new Date(promotion.created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Modifié le</p>
                                    <p>
                                        {new Date(promotion.updated_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

