import { getArtistInfo } from "@/api";
import { formatImgUrl } from "@/utils";
import React, { memo } from "react";
import { LoaderFunctionArgs, isRouteErrorResponse, useLoaderData, useRouteError } from "react-router-dom";

export async function loader(arg: LoaderFunctionArgs) {
  const id = arg.params.id;
  if (!id) return Promise.reject(new Error("id is required"));
  return await getArtistInfo({ id }).then(res => res.data.data) || null;
}

type ArtistData = {
  user: any;
  artist: any;
};

const Artist: React.FC = memo(() => {
  const data = useLoaderData() as ArtistData;
  const user = data.user;
  const artist = data.artist;

  return (
    <div className="px-8 py-4">
      <div className="flex space-x-8">
        <img className="w-56 h-56 rounded-xl" src={formatImgUrl(artist.avatar, 320)} />
        <div>
          <h2 className="text-2xl font-bold">{artist.name}</h2>
        </div>
      </div>
    </div>
  );
});

Artist.displayName = "Artist";

export const Component = Artist;

export default Artist;

export function ErrorBoundary() {
  let error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    //@ts-ignore
    <h1>{error.message || error}</h1>
  );
}

ErrorBoundary.displayName = "ArtistErrorBoundary";
