import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

interface Props {
    artist: Artist;
}

export default function Edit({ artist }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artistes',
            href: '/artists',
        },
        {
            title: artist.name,
            href: `/artists/${artist.id}`,
        },
        {
            title: 'Éditer',
            href: `/artists/${artist.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: artist.name,
        slug: artist.slug,
        profil_photo: artist.profil_photo || '',
        cover_photo: artist.cover_photo || '',
        real_name: artist.real_name || '',
        birthdate: artist.birthdate || '',
        birthplace: artist.birthplace || '',
        biography: artist.biography || '',
        description: artist.description || '',
        keywords: artist.keywords || '',
        email: artist.email || '',
        phone: artist.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/artists/${artist.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Éditer ${artist.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Éditer l'Artiste</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Informations de base */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de base</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom de scène *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className={errors.slug ? 'border-red-500' : ''}
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-red-500">{errors.slug}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Photos */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Photos</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="profil_photo">Photo de profil</Label>
                                    <Input
                                        id="profil_photo"
                                        value={data.profil_photo}
                                        onChange={(e) => setData('profil_photo', e.target.value)}
                                        placeholder="URL de la photo"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover_photo">Photo de couverture</Label>
                                    <Input
                                        id="cover_photo"
                                        value={data.cover_photo}
                                        onChange={(e) => setData('cover_photo', e.target.value)}
                                        placeholder="URL de la photo"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations personnelles */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="real_name">Nom réel</Label>
                                    <Input
                                        id="real_name"
                                        value={data.real_name}
                                        onChange={(e) => setData('real_name', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthdate">Date de naissance</Label>
                                    <Input
                                        id="birthdate"
                                        type="date"
                                        value={data.birthdate}
                                        onChange={(e) => setData('birthdate', e.target.value)}
                                        className={errors.birthdate ? 'border-red-500' : ''}
                                    />
                                    {errors.birthdate && (
                                        <p className="text-sm text-red-500">{errors.birthdate}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthplace">Lieu de naissance</Label>
                                    <Input
                                        id="birthplace"
                                        value={data.birthplace}
                                        onChange={(e) => setData('birthplace', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description & SEO */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Description & SEO</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description courte (SEO)</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        placeholder="Résumé court pour l'aperçu et le SEO"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="biography">Biographie</Label>
                                    <Textarea
                                        id="biography"
                                        value={data.biography}
                                        onChange={(e) => setData('biography', e.target.value)}
                                        rows={6}
                                        placeholder="Biographie complète de l'artiste"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Mots-clés</Label>
                                    <Input
                                        id="keywords"
                                        value={data.keywords}
                                        onChange={(e) => setData('keywords', e.target.value)}
                                        placeholder="Ex: Rap, Trap, Gasy"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Séparez les mots-clés par des virgules
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
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
