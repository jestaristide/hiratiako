import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Artist {
    id: number;
    name: string;
    slug: string;
    profil_photo: string | null;
    cover_photo: string | null;
    real_name: string | null;
    birthdate: string | null;
    birthplace: string | null;
    biography: string | null;
    description: string | null;
    keywords: string | null;
    email: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    artist: Artist;
}

export default function Show({ artist }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artistes',
            href: '/artists',
        },
        {
            title: artist.name,
            href: `/artists/${artist.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={artist.name} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{artist.name}</h1>
                        {artist.real_name && (
                            <p className="text-muted-foreground">{artist.real_name}</p>
                        )}
                    </div>
                    <Link href={`/artists/${artist.id}/edit`}>
                        <Button>
                            <Pencil className="mr-2 h-4 w-4" />
                            Éditer
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    {/* Informations de base */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations de base</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <p className="text-sm font-medium">Nom de scène</p>
                                <p className="text-sm text-muted-foreground">{artist.name}</p>
                            </div>
                            <div className="grid gap-2">
                                <p className="text-sm font-medium">Slug</p>
                                <p className="text-sm text-muted-foreground">{artist.slug}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Photos */}
                    {(artist.profil_photo || artist.cover_photo) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Photos</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {artist.profil_photo && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Photo de profil</p>
                                        <img
                                            src={artist.profil_photo}
                                            alt={`Photo de profil de ${artist.name}`}
                                            className="h-32 w-32 rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                {artist.cover_photo && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Photo de couverture</p>
                                        <img
                                            src={artist.cover_photo}
                                            alt={`Photo de couverture de ${artist.name}`}
                                            className="h-48 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Informations personnelles */}
                    {(artist.real_name || artist.birthdate || artist.birthplace) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {artist.real_name && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Nom réel</p>
                                        <p className="text-sm text-muted-foreground">{artist.real_name}</p>
                                    </div>
                                )}
                                {artist.birthdate && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Date de naissance</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(artist.birthdate).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                )}
                                {artist.birthplace && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Lieu de naissance</p>
                                        <p className="text-sm text-muted-foreground">{artist.birthplace}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Description & Biographie */}
                    {(artist.description || artist.biography || artist.keywords) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Description & Biographie</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {artist.description && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Description courte</p>
                                        <p className="text-sm text-muted-foreground">{artist.description}</p>
                                    </div>
                                )}
                                {artist.biography && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Biographie</p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                            {artist.biography}
                                        </p>
                                    </div>
                                )}
                                {artist.keywords && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Mots-clés</p>
                                        <p className="text-sm text-muted-foreground">{artist.keywords}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact */}
                    {(artist.email || artist.phone) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {artist.email && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Email</p>
                                        <a
                                            href={`mailto:${artist.email}`}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {artist.email}
                                        </a>
                                    </div>
                                )}
                                {artist.phone && (
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">Téléphone</p>
                                        <a
                                            href={`tel:${artist.phone}`}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {artist.phone}
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Métadonnées */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Métadonnées</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <p className="text-sm font-medium">Créé le</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(artist.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <p className="text-sm font-medium">Modifié le</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(artist.updated_at).toLocaleDateString('fr-FR', {
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
        </AppLayout>
    );
}
