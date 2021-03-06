# boba-editor

An advanced text editor based on [QuillJS](https://quilljs.com/), vaguely inspired by Tumblr's. Created for [BobaBoard](https://www.bobaboard.com).

## Demo

[Demo on Netlify!](https://bobaeditor.netlify.app/)

## Try on Storybook

Requires nodejs 12.9.1.

`yarn run storybook`

To enable all embed types you can run your own [Iframely instance](https://github.com/itteco/iframely) on your localhost (or server).

## How to Use

```
import { Editor } from "BobaEditor";

<div style={{ backgroundColor: "white", maxWidth: "500px" }}>
    <Editor
      editable={true}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
  </div>
```

#### Props

- **initialText:** A [QuillJS Delta](https://quilljs.com/docs/delta/).
- **focus:** Whether to focus on first render.

## Contributions

Pull requests are welcome. Feel free to open an issue to discuss!
