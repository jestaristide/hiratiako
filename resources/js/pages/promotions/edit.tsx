import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

interface User {
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
    track_title: string;
    intermediary_name: string | null;
    intermediary_contact: string;
    intermediary_channel: string;
    package_tier: string;
    boost_count: number;
    amount_paid: string;
    payment_method: string;
    receiver_number: string;
    transaction_id: string | null;
    manager_id: number;
    status: 'PENDING' | 'ACTIVE' | 'DONE';
}

interface Props {
    promotion: Promotion;
    users: User[];
    artists: Artist[];
}

export default function Edit({ promotion, users, artists }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Promotions',
            href: '/promotions',
        },
        {
            title: `Promotion #${promotion.id}`,
            href: `/promotions/${promotion.id}`,
        },
        {
            title: 'Éditer',
            href: `/promotions/${promotion.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        artist_id: promotion.artist_id,
        track_title: promotion.track_title,
        intermediary_name: promotion.intermediary_name || '',
        intermediary_contact: promotion.intermediary_contact,
        intermediary_channel: promotion.intermediary_channel,
        package_tier: promotion.package_tier,
        boost_count: promotion.boost_count,
        amount_paid: promotion.amount_paid,
        payment_method: promotion.payment_method,
        receiver_number: promotion.receiver_number,
        transaction_id: promotion.transaction_id || '',
        manager_id: promotion.manager_id,
        status: promotion.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/promotions/${promotion.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Éditer Promotion #${promotion.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Éditer la Promotion</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Row 1: Informations Artiste & Titre + Intermédiaire */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Informations Artiste/Track */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Artiste & Titre</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="artist_id">Artiste *</Label>
                                        <Select
                                            value={data.artist_id.toString()}
                                            onValueChange={(value) => setData('artist_id', parseInt(value))}
                                        >
                                            <SelectTrigger className={errors.artist_id ? 'border-red-500' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {artists.map((artist) => (
                                                    <SelectItem key={artist.id} value={artist.id.toString()}>
                                                        {artist.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.artist_id && (
                                            <p className="text-sm text-red-500">{errors.artist_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="track_title">Titre du morceau *</Label>
                                        <Input
                                            id="track_title"
                                            value={data.track_title}
                                            onChange={(e) => setData('track_title', e.target.value)}
                                            className={errors.track_title ? 'border-red-500' : ''}
                                        />
                                        {errors.track_title && (
                                            <p className="text-sm text-red-500">{errors.track_title}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Informations Intermédiaire */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Intermédiaire</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="intermediary_name">Nom de l'intermédiaire</Label>
                                        <Input
                                            id="intermediary_name"
                                            value={data.intermediary_name}
                                            onChange={(e) => setData('intermediary_name', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="intermediary_contact">Contact *</Label>
                                        <Input
                                            id="intermediary_contact"
                                            value={data.intermediary_contact}
                                            onChange={(e) => setData('intermediary_contact', e.target.value)}
                                            className={errors.intermediary_contact ? 'border-red-500' : ''}
                                        />
                                        {errors.intermediary_contact && (
                                            <p className="text-sm text-red-500">{errors.intermediary_contact}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="intermediary_channel">Canal *</Label>
                                        <Select
                                            value={data.intermediary_channel}
                                            onValueChange={(value) => setData('intermediary_channel', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FB">Facebook</SelectItem>
                                                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                                <SelectItem value="Telegram">Telegram</SelectItem>
                                                <SelectItem value="Email">Email</SelectItem>
                                                <SelectItem value="Phone">Téléphone</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Package & Boost */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Package & Boost</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="package_tier">Package *</Label>
                                    <Select
                                        value={data.package_tier}
                                        onValueChange={(value) => setData('package_tier', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Premium">Premium</SelectItem>
                                            <SelectItem value="Royal">Royal</SelectItem>
                                            <SelectItem value="Standard">Standard</SelectItem>
                                            <SelectItem value="Basic">Basic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="boost_count">Nombre de boosts</Label>
                                    <Input
                                        id="boost_count"
                                        type="number"
                                        min="0"
                                        value={data.boost_count}
                                        onChange={(e) => setData('boost_count', parseInt(e.target.value) || 0)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount_paid">Montant payé (Ar) *</Label>
                                    <Input
                                        id="amount_paid"
                                        type="number"
                                        step="0.01"
                                        value={data.amount_paid}
                                        onChange={(e) => setData('amount_paid', e.target.value)}
                                        className={errors.amount_paid ? 'border-red-500' : ''}
                                    />
                                    {errors.amount_paid && (
                                        <p className="text-sm text-red-500">{errors.amount_paid}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations de Paiement */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de Paiement</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="transaction_id">ID de transaction</Label>
                                    <Input
                                        id="transaction_id"
                                        value={data.transaction_id}
                                        onChange={(e) => setData('transaction_id', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="payment_method">Méthode de paiement *</Label>
                                    <Select
                                        value={data.payment_method}
                                        onValueChange={(value) => setData('payment_method', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OrangeMoney">OrangeMoney</SelectItem>
                                            <SelectItem value="MVola">MVola</SelectItem>
                                            <SelectItem value="Especes">Especes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="receiver_number">Numéro récepteur *</Label>
                                    <Select
                                        value={data.receiver_number}
                                        onValueChange={(value) => setData('receiver_number', value)}
                                    >
                                        <SelectTrigger className={errors.receiver_number ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0322616963">0322616963</SelectItem>
                                            <SelectItem value="0382616963">0382616963</SelectItem>
                                            <SelectItem value="0340247917">0340247917</SelectItem>
                                            <SelectItem value="0325047917">0325047917</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.receiver_number && (
                                        <p className="text-sm text-red-500">{errors.receiver_number}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Responsable & Statut */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Responsable & Statut</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">

                                <div className="space-y-2">
                                    <Label htmlFor="manager_id">Responsable *</Label>
                                    <Select
                                        value={data.manager_id.toString()}
                                        onValueChange={(value) => setData('manager_id', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors.manager_id ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.manager_id && (
                                        <p className="text-sm text-red-500">{errors.manager_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Statut *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value: 'PENDING' | 'ACTIVE' | 'DONE') =>
                                            setData('status', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">En attente</SelectItem>
                                            <SelectItem value="ACTIVE">Actif</SelectItem>
                                            <SelectItem value="DONE">Terminé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Mise à jour...' : 'Mettre à jour'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
