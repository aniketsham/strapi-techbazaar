import TagsPage from "@/components/pages/tags-page/tags-page";
import React from "react";

const page = ({ params }: any) => {
  return (
    <div>
      <TagsPage slug={params.slug} />
    </div>
  );
};

export default page;
