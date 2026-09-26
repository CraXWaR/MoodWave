type AcceptedResult = {
  rejected: false;
  tracks: TrackMatchResult[];
};

type RejectedResult = {
  rejected: true;
  message: string;
};

export type GenerateResult = AcceptedResult | RejectedResult;

type MatchedTrack = {
  matched: true;
  title: string;
  artist: string;
  spotifyUri: string;
  albumImageUrl: string | null;
};

type UnmatchedTrack = {
  matched: false;
  title: string;
  artist: string;
};

export type TrackMatchResult = MatchedTrack | UnmatchedTrack;

export type CreatedPlaylist = {
  id: string;
  name: string;
  externalUrl: string;
};
