
import React from "react";
import Page from "@/components/Page";
import GenerativeVideoCreator from "@/components/video-generation/GenerativeVideoCreator";

const GenerativeVideo = () => {
  return (
    <Page title="AI Video Generation" showBackButton={true}>
      <div className="container mx-auto max-w-3xl py-8">
        <GenerativeVideoCreator />
      </div>
    </Page>
  );
};

export default GenerativeVideo;
