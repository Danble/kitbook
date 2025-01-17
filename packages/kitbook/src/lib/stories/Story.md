<script lang="ts">
  import { Story } from '$lib';
</script>

<!-- prettier-ignore -->
# Story

The Story component is the basic building block of Kitbook. 

<Story>Hello World</Story>

And this one will have a lot of content to be able to test scrolling:

<Story name="tall story">
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
  Hello World<br />
</Story>

<Story name="I have a Story Inside" useSandbox={false}>
  <Story name="Nested Story">Hello World from inside a Story</Story>
</Story>

<Story name="With Knobs" knobs={{ value: true }} let:knobs={{ value }}>{value}</Story>

If a width and height are defined, you can adjust them. If not, you can define them by turning them
on.

<Story name="Adjust height and width" height={200} width={200}>
  <div style="width: 100%; height: 100%; background: red;" />
</Story>

<!-- prettier-ignore -->
- todo: range prop needs typed as a number, not text on the way out

## How Stories are displayed

- written as `.svx/.md` files, the file is shown as is, except for anything placed inside of a `Story` component. This component when shown in the main page will show controls and metadata, but will not actually show anything passed into it's main slot. Each story will pass it's ID to the sandboxed story page via a query param in the iframe url which will be set as the `sandboxId` using `setContext` so that when the `.svx/md` file is displayed in the sandbox, only the slot contents of the story with a matching ID  will be shown.

- you can opt out of sandboxing a particular `Story` if you are wanting to inherit context from your (main) Kitbook layout page, but really, if you need to initialize anything, you could just do this via a root layout which both (main) pages and sandboxed pages will inherit.