# Add Stories

Stories are quite flexible. Anything you can do inside Svelte or in markdown, you can do inside a Story with the added benefit of iframe encapsulation.

## Add a stories file
When you create a component named `Button.svelte`, add a file with an identical name but with the `.md` extension `Button.md`) to document it. Import the component into the stories file and document it:

```svelte title="Button.md"
<script lang="ts">
  import Button from './Button.svelte';
</script>

# Button

The reason we created this button component was to allow time travel...

<Button>Hello World</Button>
```

Because Kitbook uses [MDSvex](https://mdsvex.pngwn.io/) you can simply plop your components right into your stories file. That's great for documentation but you also want to prototype so let's move our button inside the `Story` component.

```svelte title="Button.md" {2,10,12}
<script lang="ts">
  import { Story } from 'kitbook';
  import Button from './Button.svelte';
</script>

# Button

The reason we created this button component was to allow time travel...

<Story>
  <Button>Hello World</Button>
</Story>
```

This will move it inside of an encapsulated iframe that allows you to adjust the viewport size, easily view code, adjust component props, listen to events, refresh it to observe how it looks coming from the server before being hydrated, and more...

Why don't you try adding a `name` [[Knobs|knob]]? 

```svelte title="Button.md"
...
<Story name="Fancy Button" knobs={{ name: 'John'}} let:knobs={{ name }}>
  <Button>Hello {name}</Button>
</Story>
```

Now try editing the name knob. For example, use a reallyyyyyyyyyyyyyyyy long name and see how things wrap.

Great! That's a very brief start, and there's many directions you could take this as seen from these [[complex-examples|complex examples]]. Continue to document and prototype your components and add stories for each situation you need, pulling from the provided [[8-examples|repo examples]]. Next, you should learn how to [[4-add-component-variants]].

[//begin]: # "Autogenerated link references for markdown compatibility"
[Knobs|knob]: ../lib/stories/Knobs.md "Knobs"
[complex-examples|complex examples]: 1-stories/complex-examples.md "A few Complex Examples"
[8-examples|repo examples]: 8-examples.md "Examples"
[4-add-component-variants]: 4-add-component-variants.md "Add Component Variants"
[//end]: # "Autogenerated link references"