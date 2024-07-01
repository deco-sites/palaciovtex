// deno-lint-ignore-file
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Link {
  text: string;
  link: string;
}

export interface ThemeColors {
  /**
   * @format color
   * @title Cor de fundo do menu
   * @description Aqui se altera a cor de fundo do menu
   */
  corFundoNavegador?: string;
  /**
   * @format color
   * * @title Cor de fundo da topbar
   */
  corFundoTopbar?: string;
  // corTextoNavegador?: string;
}
interface AlertBanner {
  image: ImageWidget;
  link: string;
  title?: string;
}
export interface Props {
  alerts?: string[];
  gridImages?: AlertBanner[];

  alternateGridImages: boolean;

  colors: ThemeColors;

  links?: Link[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
}

function Header({
  alerts,
  gridImages,
  alternateGridImages,
  colors,
  links,
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header
        class={`bg-white h-[140px] md:h-[245px]`}
      >
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-white fixed w-full z-50 md:pb-0 pb-2">
            {alternateGridImages == false && alerts && alerts.length > 0 &&
              (
                <div
                style={{
                  backgroundColor: colors?.corFundoTopbar
                    ? colors?.corFundoTopbar
                    : "",
                }}
                class="bg-[#F0D02C] px-0 py-1.5 border-b-[#777] border-b border-solid hidden md:block">
                  <div class="flex justify-between items-center container">
                    <Alert alerts={alerts} />

                    <ul class="flex">
                      {links?.map((link, index) => {
                        return (
                          <li id={"index-" + index}>
                            <a
                              class={"inline-flex items-center px-[14px] py-0 text-black text-xs leading-[14px]" +
                                (index == 1 ? " font-bold" : "")}
                              href={link.link}
                            >
                              {link.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            {alternateGridImages == true && gridImages &&
              gridImages.length > 0 &&
              (
                <div
                  style={{
                    backgroundColor: colors?.corFundoTopbar
                      ? colors?.corFundoTopbar
                      : "",
                  }}
                  class={`bg-[#F0D02C] px-0 py-1.5 border-b-[#777] border-b border-solid hidden md:block`}
                >
                  <ul class="flex justify-between items-center container">
                    {gridImages?.map((gridImage, index) => {
                      return (
                        <li id={"index-" + index}>
                          <a target="_top" href={gridImage.link}>
                            <img
                              class={`hover:scale-95 transition-all`}
                              src={gridImage.image}
                              title={gridImage.title}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            <Navbar
              colors={colors}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
