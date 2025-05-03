import React from "react";
import VideoCall from "./components/VideoCall";

const VideoPage = ({
  searchParams,
}: {
  searchParams: { videoCallingId: string };
}) => {
  const videoCallingId = searchParams.videoCallingId;
  console.log(searchParams);
  return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoPage;
