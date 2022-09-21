import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  console.log(videos);

  //content to render
  let content;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  //error content
  if (!isLoading && isError) {
    content = <Error message="something went wrong!" />;
  }
  // display videos
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message="Videos not found!" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
}
