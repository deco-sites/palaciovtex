import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight as _headerHeight } from "./constants.ts";
import { ThemeColors } from "deco-sites/palaciovtex/components/header/Header.tsx";

function NavItem({ item, index }: {
  item: SiteNavigationElement;
  colors: ThemeColors;
  index: number;
}) {
  const { url, name, children } = item;
  // const image = item?.image?.[0];

  return (
    <li
      data-index={index}
      class="group inline-block float-left p-0 relative text-center has-submenu"
    >
      <a
        class="group-hover:underline p-[7px] m-auto text-center h-full flex flex-col justify-center transition-all"
        href={url}
      >
        <span class="text-[12px] block my-[10px] text-black text-center uppercase">
          {name}
        </span>
      </a>
      {children && children.length > 0 &&
        (
          <div
            class={`group-hover:flex hidden rounded-[0_0_10px_10px] shadow-md absolute bg-white py-[24px] px-[30px] text-left min-w-[600px] ${
              index >= 5 ? "first-of-type:right-0" : ""
            }`}
          >
            <ul class="flex-1 flex flex-col max-h-[400px] flex-wrap">
              {children.map((node) => {
                return (
                  <li class="block pb-[10px]">
                    <a
                      class="flex items-center justify-between text-[14px] text-black leading-[35px]"
                      href={node.url}
                    >
                      {node.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            {item?.image &&
              item?.image.length != 0 &&
              (
                <div class="banners-submenu">
                  <div>
                    <div class="box-banner">
                      <Image
                        class="inline-block align-top h-auto max-w-full"
                        width={100}
                        height={300}
                        alt={"banner"}
                        src={item?.image[0]?.url ?? ""}
                        loading={"lazy"}
                      />
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
    </li>
  );
}

export default NavItem;
