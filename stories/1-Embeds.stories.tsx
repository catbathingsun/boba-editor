import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Editor, { setTumblrEmbedFetcher } from "../src";

export default {
  title: "Embeds Stories",
  component: Editor,
};

setTumblrEmbedFetcher((url: string) => {
  console.log(`""Fetching"" from ${url}`);
  return Promise.resolve({
    url:
      "https://turquoisemagpie.tumblr.com/post/618042321716510720/eternity-stuck-in-white-noise-can-drive-you-a",
    href:
      "https://embed.tumblr.com/embed/post/2_D8XbYRWYBtQD0A9Pfw-w/618042321716510720",
    did: "22a0a2f8b7a33dc50bbf5f49fb53f92b181a88aa",
  });
});

export const EmbedStories = () => (
  <div style={{ backgroundColor: "white", maxWidth: "500px" }}>
    <Editor
      editable={true}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"youtube-video":"https://www.youtube.com/embed/ROPpn-QcLZM"}},{"insert":"\\n"}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter
        console.log("submit!");
      }}
    />
  </div>
);

EmbedStories.story = {
  name: "youtube",
};

export const TumblrStory = () => (
  <div style={{ backgroundColor: "white", maxWidth: "500px" }}>
    <Editor
      editable={true}
      initialText={JSON.parse(
        '[{"insert":"NOTE: Tumblr Posts"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"Tumblr posts are a bit weird. Unless you provide an endpoint that allows fetching the oEmbed data given the Tumblr URL, they won\'t work. It sucks, and I accept solutions.\\n"},{"insert":{"tumblr-embed":{"href":"https://embed.tumblr.com/embed/post/2_D8XbYRWYBtQD0A9Pfw-w/618042321716510720","did":"22a0a2f8b7a33dc50bbf5f49fb53f92b181a88aa","url":"https://turquoisemagpie.tumblr.com/post/618042321716510720/eternity-stuck-in-white-noise-can-drive-you-a"}}},{"insert":"\\n"}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter
        console.log("submit!");
      }}
    />
  </div>
);

TumblrStory.story = {
  name: "tumblr",
};
