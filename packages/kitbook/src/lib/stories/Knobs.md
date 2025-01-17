<script>
  import Knobs from '$lib/stories/Knobs.svelte';
  import Story from '$lib/stories/Story.svelte';
  import parseInput from '$lib/stories/knobs';
</script>

# Knobs

<Story persist="localStorage" name="boolean knob" knobs={{ fieldName: 'toggle_me' }} let:knobs={{ fieldName }}>
  <Knobs id="bknobChild" knobs={parseInput({ [fieldName]: true })} />
</Story>

<Story
  name="string knob"
  knobs={{ fieldName: 'stringFieldName', startingValue: 'my string value' }}
  let:knobs={{ fieldName, startingValue }}
>
  <Knobs id="sKnobChild" knobs={parseInput({ [fieldName]: startingValue })} />
</Story>

<Story
  name="number knob"
  knobs={{ fieldName: 'numberFieldName', startingValue: 2 }}
  let:knobs={{ fieldName, startingValue }}
>
  <Knobs id="nKnobChild" knobs={parseInput({ [fieldName]: startingValue })} />
</Story>

<Story
  name="range knob"
  knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}
  let:knobs={{ fieldName, min, max, defaultValue }}
>
  <Knobs id="rKnobChild" knobs={parseInput({ [fieldName]: {min} + '-' + {max} +';' + {defaultValue} })} />
</Story>

- Note that currently the range knob breaks when given negative default value (the regex parser needs improved if desiring to fix.)

<Story
  name="color knob"
  knobs={{ fieldName: 'background_color', defaultValue: '#a23123' }}
  let:knobs={{ fieldName, defaultValue }}
>
  <Knobs id="cKnobChild" knobs={parseInput({ [fieldName]: defaultValue })} />
</Story>

<!-- prettier-ignore -->
- If a 6 digit color hex beginning with a # is used as a knob value, a color picker will be shown.

Note:The Knobs component is not exported as they are part of the story component. If someone has a
use case where this component should be exported, please create an issue.
