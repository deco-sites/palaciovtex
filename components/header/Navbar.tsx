import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
// import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
// import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
// import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
// import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
// import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
// import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "$store/components/header/Header.tsx";

import NavItem from "site/components/header/NavItem.tsx";
import { ThemeColors } from "site/components/header/Header.tsx";

function Navbar(
  { colors, items, searchbar, logo, buttons, logoPosition = "left" }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
    colors: ThemeColors;
  },
) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <>
        <div
          style={{ height: navbarHeight }}
          class="bg-white lg:hidden grid grid-cols-3 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
        >
          <MenuButton />
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                loading="lazy"
              />
            </a>
          )}

          <div class="flex justify-end gap-1">
            {/* <SearchButton /> */}
            {platform === "vtex" && <CartButtonVTEX />}
            {/* {platform === "vnda" && <CartButtonVDNA />} */}
            {/* {platform === "wake" && <CartButtonWake />} */}
            {/* {platform === "linx" && <CartButtonLinx />} */}
            {/* {platform === "shopify" && <CartButtonShopify />} */}
            {/* {platform === "nuvemshop" && <CartButtonNuvemshop />} */}
          </div>
        </div>
      </>

      {/* Desktop Version */}
      <div
        style={{
          backgroundColor: colors?.corFundo ? colors?.corFundo : "",
        }}
        class="hidden lg:grid container lg:grid-cols-3 items-center w-full px-6 bg-white"
      >
        <div class="flex w-full relative">
          <Searchbar searchbar={searchbar} />
        </div>
        <div
          class={`flex ${
            logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
          }`}
        >
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                loading="lazy"
              />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-6 col-span-1">
          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/login-page"
              aria-label="Login ou Account"
            >
              <div class="flex btn btn-circle btn-sm btn-ghost gap-1">
                <Icon id="User" size={20} strokeWidth={0.4} />
              </div>
              Minha Conta
            </a>
          )}
          {!buttons?.hideWishlistButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <div class="flex btn btn-circle btn-sm btn-ghost gap-1">
                <Icon id="Heart" size={24} strokeWidth={0.4} />
              </div>
              Lista de Desejos
            </a>
          )}
          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX />}
              {/* {platform === "vnda" && <CartButtonVDNA />} */}
              {/* {platform === "wake" && <CartButtonWake />} */}
              {/* {platform === "linx" && <CartButtonLinx />} */}
              {/* {platform === "shopify" && <CartButtonShopify />} */}
              {/* {platform === "nuvemshop" && <CartButtonNuvemshop />} */}
            </div>
          )}
        </div>
      </div>
      <div class="px-2 lg:hidden flex w-full">
        <Searchbar searchbar={searchbar} />
      </div>
      {
        <div
          style={{
            backgroundColor: colors?.corFundoNavegador
              ? colors?.corFundoNavegador
              : "",
          }}
          class="p-0 bg-white hidden md:block"
        >
          <div class="m-auto container">
            <div class="header__bottom-in" id="menu">
              <ul class="m-0 flex justify-between">
                {items.map((item, index) => (
                  <NavItem colors={colors} index={index} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Navbar;
