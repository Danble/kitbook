<script lang="ts">
  import { setContext, type SvelteComponent } from 'svelte';
  import type { GroupedPage, GroupedPageMap, LoadedModules, Variant } from '../kitbook-types';
  import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.js';
  import { pagesStore } from '../modules/hmrUpdatedModules';

  export let data: {
    pages: GroupedPageMap;
    page: GroupedPage;
    pageKey: string;
    loadedModules: LoadedModules;
    storyId: string;
    variant?: Variant<typeof SvelteComponent>;
    variantIdx?: string; // string is better because it works as an index also and doesn't give false negative on '0'
    editedProps?: Record<string, any>;
    // error?: string;
  };

  let updatedVariant: Variant<typeof SvelteComponent>;
  $: if ($pagesStore?.[data.pageKey] && data.variantIdx) {
    (async () => {
      updatedVariant =
        ((await $pagesStore[data.pageKey].loadVariants.loadModule())?.variants[
          data.variantIdx
        ] as Variant<typeof SvelteComponent>) || {};
    })();
  }

  const isStory = !!data.storyId;
  $: variantProps = updatedVariant?.props || data.variant?.props || {};

  if (isStory) {
    // `Story` components check the `sandboxId` context to know whether to show when in the sandbox - this is passed to the sandbox originally using the `storyId` query param in iframe url
    setContext<string>('sandboxId', data.storyId);
    setContext<Record<string, any>>('sandboxProps', data.editedProps || {});
  }

  for (const { key, context } of data.variant?.contexts || []) {
    setContext(key, context);
  }
</script>

<div class="absolute inset-0 overflow-auto">
  {#if isStory}
    <div id="sandbox" style="display: contents;">
      <svelte:component this={data.loadedModules.svx} />
    </div>
  {:else}
    <ErrorBoundary onError={console.error}>
      <div slot="before">
        {#if Object.keys(variantProps).length == 0}
          <b>Kitbook tip</b>: Your component may need props passed in. Create a "{data.page
            ?.name}.variants.ts" file with at least variant. In the future Kitbook will try to
          automatically supply default props, but until then they must be supplied manually.
        {/if}
      </div>
      {#if data.variant?.slots}
        {@const content = data.variant.slots[0].content}
        <svelte:component this={data.loadedModules.component} {...variantProps}>
          {#if typeof content === 'string'}
            {@html content}
          {:else}
            <svelte:component this={content} />
          {/if}
        </svelte:component>
      {:else}
        <svelte:component this={data.loadedModules.component} {...variantProps} />
      {/if}
    </ErrorBoundary>
  {/if}
</div>

<style>
  #sandbox > :global(:not(.show-in-sandbox)) {
    display: none;
  }
</style>
