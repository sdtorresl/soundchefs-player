import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LibretimeService } from '../../../shared/service/libretime.service';

interface SongMetadata {
    title: string;
    artist: string;
    artwork: string;
}

@Injectable({
    providedIn: 'root',
})
export class FetchMetadataUseCase {
    defaultArtwork = 'assets/no-cover.png';

    constructor(private libreTimeService: LibretimeService) { }

    execute(): Observable<SongMetadata> {
        return this.libreTimeService.getLiveInfo().pipe(
            map((data) => {
                const current = data?.current?.metadata;
                return {
                    title: current?.track_title || 'Unknown Title',
                    artist: current?.artist_name || 'Unknown Artist',
                    artwork: current?.artwork_url || this.defaultArtwork,
                };
            })
        );
    }
}
