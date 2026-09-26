interface MatchedTrack {
  matched: true;
  title: string;
  artist: string;
  spotifyUri: string;
  albumImageUrl: string | null;
}

interface UnmatchedTrack {
  matched: false;
  title: string;
  artist: string;
}

export type TrackMatchResult = MatchedTrack | UnmatchedTrack;

export type SongSuggestion = {
  title: string;
  artist: string;
};
