import { SvelteComponentTyped } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        /**
           * Until IDs are provided by the Kitbook plugin, each story in a story file must have a unique name to work
           */ name?: string;
        /**
           * Used by knobs to save state in URL, and to pass props to sandboxed stories; need a plugin to give these sequentially or need to pass in manually
           */ id?: string;
        width?: number;
        height?: number;
        persist?: "localStorage" | "sessionStorage";
        useSandbox?: boolean;
        knobs?: T;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            props: T;
            knobs: T;
            set: (field: string, value: any) => void;
        };
    };
}
export type StoryProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type StoryEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type StorySlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
/**
 * Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:knobs`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.
 *
 * Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).
 *
 * Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:knobs={{myBool, myNum, myStr, myRange}}>`
 *
 * TODO: accept negative values for range initialValue
 *
 * TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
 */
export default class Story<T> extends SvelteComponentTyped<StoryProps<T>, StoryEvents<T>, StorySlots<T>> {
}
export {};
