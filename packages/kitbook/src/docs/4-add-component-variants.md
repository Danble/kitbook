# Add Component Variants

To easily mock a component in a variety of states **with type safety** you can create multiple variants of a component simply by adding a sibling file using a component's filename and replacing the the `.svelte` extension with `variants.ts`. See [[SearchResult]] for an example with several different variants.

Here is an example of a `Header.svelte` component's variants file:

```ts title="Header.variants.ts"
import type { Variants } from 'kitbook';
import type Component from './Header.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'Desktop',
    description: 'Write something about this example if desired.',
    width: 800,
    height: 600,
    props: {
      activeURL: "/",
      githubURL: "/",
    },
    slots: [
      {
        content: 'My Workbench'
      }
    ],
  },
]
```

`+page.svelte` files are actually just plain Svelte components with a very important `data` prop. You can create a variants file for them as well but replace `+` with `_` (`_page.variants.ts`) because `+` is reserved for SvelteKit files:

```ts title="_page.variants.ts" {2, 9-11}
import type { Variants } from 'kitbook';
import type Component from './+page.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'First',
    description: 'Foo',
    props: {
      data: {
        // place data props here
      },
    },
  },
]
```



[//begin]: # "Autogenerated link references for markdown compatibility"
[SearchResult]: ../lib/layout/sidebar/search/SearchResult.md "SearchResult"
[//end]: # "Autogenerated link references"