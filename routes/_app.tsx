import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        <script
          id="embla-carousel-js"
          src="https://unpkg.com/embla-carousel@8.5.2/embla-carousel.umd.js"
        />

        <script
          id="embla-carousel-autoplay-js"
          src="https://unpkg.com/embla-carousel-autoplay@8.5.2/embla-carousel-autoplay.umd.js"
        />
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />
        <meta
          name="facebook-domain-verification"
          content="fe5y1st4agj0hql6ontuodg5xk9b6w"
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />
        <link href={asset(`/custom.css`)} rel="stylesheet" />
        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}

      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
