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
      <script
        type="script"
        dangerouslySetInnerHTML={{__html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          fbq('init', '935881335124841');
          fbq('track', 'PageView');
        `}}
      />

      <noscript>
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=935881335124841&ev=PageView&noscript=1"/>
      </noscript>
    </>
  );
});
