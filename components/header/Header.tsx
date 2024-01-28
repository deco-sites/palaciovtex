import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import Categories from "$store/sections/Header/Categories.tsx";
import { headerHeight } from "./constants.ts";

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

export interface Props {
  alerts?: string[];

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
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="fixed w-full z-50">
            {alerts && alerts.length > 0 &&
              (
                <div class="bg-[#F0D02C] px-0 py-2.5 border-b-[#777] border-b border-solid hidden md:block">
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
            <Navbar
              // items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
            />
            <Categories />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
