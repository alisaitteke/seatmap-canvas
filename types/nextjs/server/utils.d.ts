import type { BlockData, Venue } from '../types';
export declare function generateSeatmapStaticParams(venues: Venue[]): {
    id: string;
}[];
export declare function getStaticSeatmapProps(venueId: string, revalidate?: number): Promise<{
    props: {
        data: BlockData[];
        venueId: string;
    };
    revalidate: number;
}>;
export declare function getServerSideSeatmapProps(venueId: string): Promise<{
    props: {
        data: BlockData[];
        venueId: string;
    };
}>;
export declare function generateSeatmapMetadata(venueId: string): Promise<{
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        images: any[];
    };
} | {
    title: string;
    description: string;
    openGraph?: undefined;
}>;
export declare function preloadSeatmapData(venueId: string): void;
export declare const SEATMAP_CACHE_CONFIG: {
    readonly revalidate: 3600;
    readonly tags: readonly ["seatmap"];
};
export declare function getSeatmapCacheTags(venueId: string): string[];
