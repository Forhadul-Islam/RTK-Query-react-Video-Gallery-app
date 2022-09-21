import { useParams } from "react-router-dom";
import { useGetVideoByIdQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
  const { videoId } = useParams();
  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useGetVideoByIdQuery(videoId);

  // content case handling
  let content = null;
  if (isLoading) {
    content = <DescriptionLoader />;
  }
  if (!isLoading && isError) {
    content = <Error message="Sorry, something went wrong" />;
  }
  if (!isLoading && !isError) {
    console.log(video);
    content = (
      <>
        <Player link={video.link} title={video.title} />
        <Description video={video} />
      </>
    );
  }
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {!isLoading && !isError && video.id && (
            <RelatedVideos id={video.id} title={video.title} />
          )}
        </div>
      </div>
    </section>
  );
}
