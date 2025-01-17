# Use Kitbook by Itself

## Understand Kitbook's Initialization

When first running the `kitbook` plugin in your package, a folder will be copied into your `.kitbook` directory, as well as a configurable function to adjust your `svelte.config.js` file to use Kitbook's internal routing files, `app.html` and assets when running Vite in `kitbook` mode.

You'll also notice that since you're now running a 2nd SvelteKit app inside the same directory, SvelteKit's automatically generated files for your Kitbook app will be placed into `/.svelte-kit-kitbook` in order to not conflict with your main app's generated files in `/.svelte-kit`. So you can ignore the warning that shows upon running kitbook: `Your tsconfig.json should extend the configuration generated by SvelteKit...`.

### Building a library

If you look in [Kitbook's source code](https://github.com/jacob-8/kitbook/tree/main/packages/kitbook) you'll see the `routes` folder living inside of the `lib` directory (so it will be packaged up) or in [Svelte Pieces' source code](https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces) you won't see a `src/routes` folder at all. When you are only building a library and not an app, then there is no main app to run Kitbook alongside and your Kitbook becomes your main app. You could then just delete the `src/routes` folder.

## Styles Reset

If you are happy with the default Kitbook styles reset, you can go ahead and delete the standard SvelteKit `app.html` sitting in your repo because Kitbook provides its own. If you prefer to provide your own `app.html` see [[2-app-html]].

## Filtering out stories and variants files from your package

If you are using `svelte-package` and you don't want to add your stories and variants files to the output package, you can update the `package.files` function in your `svelte.config.js`:

```js twoslash title="svelte.config.js"
/** @type {import('@sveltejs/kit').Config} */
// ---cut---
const config = {
  package: {
    files: (filepath) => {
      const isStoriesOrVariants = filepath.endsWith('.variants.ts') || filepath.endsWith('.md') || filepath.endsWith('.svx');
      return !isStoriesOrVariants;
    },
  },
}
```

[//begin]: # "Autogenerated link references for markdown compatibility"
[2-app-html]: 2-app-html.md "Customizing app.html"
[//end]: # "Autogenerated link references"