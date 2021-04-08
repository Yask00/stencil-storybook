import { Config } from '@stencil/core';
//Add these imports
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";
import replace from "postcss-replace";
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

import { sass } from '@stencil/sass';

const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/index.html"],
  safelist: [':host'],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const EVENTS = {
  "Select": "duetSelect",
  "Change": "duetChange"
};
const ATTRS = {
  "Checked": "checked",
  "Value": "value"
};

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: [ "my-button" ],
    event: EVENTS.Change,
    targetAttr: ATTRS.Checked,
    type: "boolean"
  },
];

export const config: Config = {
  namespace: 'stencil-storybook',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'stencil-storybook',
      directivesProxyFile: '../angular-test/stencil-to-angular-components/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      componentCorePackage: 'stencil-storybook',
      proxiesFile: '../react-test/stencil-to-react-components/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: './loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  //add postcss as a plugin
  plugins: [
    postcss({
      // add postcss plugins
      plugins: [
        // add tailwind css. Config file was added using `npx tailwindcss init`
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
        // shadow dom does not respect 'html' and 'body' styling, so we replace it with ':host' instead
        replace({ pattern: 'html', data: { replaceAll: ':host' } }),
        // purge and cssnano if production build
        ...(!process.argv.includes('--dev') ? [purge, cssnano()] : []),
      ],
    }),
    sass(),
  ],
};