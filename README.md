# Astro Starter Kit: Minimal

## Production data on Vercel

The production build creates a validated static dashboard snapshot from MongoDB
Atlas. Database access happens only in the Vercel build environment; visitors
receive static HTML and assets.

1. Create a MongoDB Atlas user with read-only access to `elderly_analysis`.
2. Add `MONGO_URI` to Vercel Project Settings → Environment Variables for
   Production (and Preview if desired).
3. Create a Production Deploy Hook in Vercel Project Settings → Git → Deploy
   Hooks.
4. Add its URL to the `bigdata` GitHub repository as the Actions secret
   `VERCEL_DEPLOY_HOOK_URL`.

`bun run build` runs `scripts/generate-dashboard-data.mjs` before Astro. A
production build fails when MongoDB is unavailable or the snapshot is incomplete,
so Vercel keeps serving the previous valid deployment. Local builds without
`MONGO_URI` use the committed development fixture.

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
