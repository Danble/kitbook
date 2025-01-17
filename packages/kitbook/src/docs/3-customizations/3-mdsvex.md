# Kitbook Uses [MDSvex](https://mdsvex.pngwn.io/) 

Kitbook automatically uses MDSvex to preprocess stories files. If you look at the source code, you'll see the extensions in the `mdsvex.config.ts` are set to `['.md', '.svx']`. As well, you'll notice the presence of a few rehype plugins to help with links, and shiki-twoslash for code highlighting. If you want to do your markdown differently you can pass your own `mdsvexConfig` to the `vite-plugin-kitbook`. Do note that if you use an MDSvex layout file then you can't use `lang='ts'` in your stories files.

## A note about `.md` and `.svx` file extensions

`.svx` extensions are also supported, but until [Foam](https://foambubble.github.io/foam/) supports custom extensions, `.md` will give you more power through [[6-easy-wikilinks]]. By default your editor will give you markdown language features which is great for writing documentation, but when you want to add a Story and import components, you want the editor to see your file as a Svelte file to get the Svelte language server's help. As you flip between documenting and prototyping, you will constantly be desiring the features of both languages, but so far there is no extension that has merged both. Fortunately you can [[5-add-the-kitbook-extension]] to easily toggle the language association of `.md` files.

## Using Prettier

Be aware that if you use prettier and run the `Format Document` command when a file is being treated as a `svelte` file you may need to add `<!--prettier-ignore>` above sections of markdown and want to avoid the code from being collapsed into a single paragraph.

[//begin]: # "Autogenerated link references for markdown compatibility"
[6-easy-wikilinks]: ../6-easy-wikilinks.md "Easy Wikilinks"
[5-add-the-kitbook-extension]: ../5-add-the-kitbook-extension.md "Add the Kitbook Extension"
[//end]: # "Autogenerated link references"