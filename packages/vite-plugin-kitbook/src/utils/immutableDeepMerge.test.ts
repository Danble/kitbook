import { immutableDeepMerge } from './immutableDeepMerge';

describe('immutableDeepMerge', () => {
  test('basic', () => {
    const obj1 = {
      a: 1,
      b: 1,
      c: { x: 1, y: 1 },
      d: [1, 1],
    }
    const obj2 = {
      b: 2,
      c: { y: 2, z: 2 },
      d: [2, 2, 3],
      e: 2,
    }

    expect(immutableDeepMerge(obj1, obj2)).toMatchInlineSnapshot(`
        {
          "a": 1,
          "b": 2,
          "c": {
            "x": 1,
            "y": 2,
            "z": 2,
          },
          "d": [
            1,
            2,
            3,
          ],
          "e": 2,
        }
      `);
  });

  test('plugins', () => {
    const plugIn = () => {
      return {
        process: 'plugIn'
      }
    };
    const fooIn = () => {
      return {
        process: 'fooIn'
      }
    };

    const obj1 = {
      process: [plugIn()]
    }
    const obj2 = {
      process: [fooIn()]
    }

    expect(immutableDeepMerge(obj1, obj2)).toMatchInlineSnapshot(`
        {
          "process": [
            {
              "process": "plugIn",
            },
            {
              "process": "fooIn",
            },
          ],
        }
      `);
  });

  test('works with different types', () => {
    const obj1 = {
      b: {
        c: 'hallo',
        f: 'yes'
      }
    }
    const obj2 = {
      b: {
        c: {
          d: {
            e: 12345
          }
        }
      }
    }

    expect(immutableDeepMerge(obj1, obj2)).toMatchInlineSnapshot(`
        {
          "b": {
            "c": {
              "d": {
                "e": 12345,
              },
            },
            "f": "yes",
          },
        }
      `);
  });

  test('handles odd numbers of objects', () => {
    expect(immutableDeepMerge({ a: 1 }, { a: 2, b: 2 }, { b: 3 })).toMatchInlineSnapshot(`
        {
          "a": 2,
          "b": 3,
        }
      `);
    expect(immutableDeepMerge({ a: 1 })).toMatchInlineSnapshot(`
        {
          "a": 1,
        }
      `);
  });

  test('gracefully handles being passed undefined instead of an object', () => {
    expect(immutableDeepMerge({ a: 1 }, undefined)).toMatchInlineSnapshot(`
        {
          "a": 1,
        }
      `);
    expect(immutableDeepMerge(undefined)).toMatchInlineSnapshot('{}');
  });

  test('merges vite config with additional Kitbook options', () => {
    const sveltekitMockPlugin: () => Promise<any> = () => {
      return new Promise((resolve) => resolve([]));
    };

    function kitbookMockPlugin() {
      return {
        name: 'kitbook',
        transform(src, id) {
          console.log(id)
          return {
            code: src,
          }
        }
      }
    }

    const viteConfig: import('vite').UserConfig = {
      plugins: [sveltekitMockPlugin()],
      server: {
        port: 9999,
      }
    };

    const kitbookViteConfig: import('vite').UserConfig = {
      plugins: [kitbookMockPlugin()],
      server: {
        port: 4321,
        fs: {
          allow: ['..'],
        }
      },
      cacheDir: "node_modules/.vite-kitbook",
    }

    expect(immutableDeepMerge(viteConfig, kitbookViteConfig)).toMatchInlineSnapshot(`
        {
          "cacheDir": "node_modules/.vite-kitbook",
          "plugins": [
            Promise {},
            {
              "name": "kitbook",
              "transform": [Function],
            },
          ],
          "server": {
            "fs": {
              "allow": [
                "..",
              ],
            },
            "port": 4321,
          },
        }
      `);
  });
});
