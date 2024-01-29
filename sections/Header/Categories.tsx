import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  allCategories?: SiteNavigationElement[];
  items?: SiteNavigationElement[];
}

export default function Categories({ allCategories, items }: Props) {
  return (
    <>
      <div class="p-0 bg-black">
        <div class="m-auto container">
          <div class="header__bottom-in" id="menu">
            <ul class="m-0 flex justify-around">
              {allCategories && allCategories.map((categorie) => {
                const { url, name, children } = categorie;
                return (
                  <li class="group/item inline-block p-0 float-left relative text-center has-submenu">
                    <a
                      class="group-hover/item:underline p-[7px] m-auto text-center h-full flex flex-col justify-center transition-all"
                      href={url}
                    >
                      <span class="text-[10px] block mt-[10px] leading-[14px] text-white text-center uppercase">
                        {name}
                      </span>
                    </a>
                    {children && children.length > 0 &&
                      (
                        <div class="group-hover/item:block absolute top-[100%] left-0 hidden z-50 text-left">
                          <div class="submenu-in">
                            <div class="bg-[#f0d02c] rounded-sm w-[260px] h-[350px] overflow-auto pt-[23px] scrollbar-custom">
                              <ul>
                                {children.map((node) => {
                                  return (
                                    <li
                                      class="leading-[35px] group/submenu has-submenu block pb-[10px]"
                                      id={node.url}
                                    >
                                      <a
                                        class="group-hover/submenu:underline text-[14px] flex items-center relative py-0 px-[23px] transition-all"
                                        href={node.url}
                                      >
                                        <span class="text-right float-right inline-block">
                                          {node.name}
                                        </span>
                                      </a>
                                      {node?.image && node?.image.length != 0 &&
                                        (
                                          <div
                                            class="group-hover/submenu:flex dropdown-desktop hasBanner bg-white absolute 
                                            top-0 left-[98%] hidden z-50 w-[850px] max-w-[900px] space-between p-[13px] rounded-sm">
                                            <ul class="mr-[10px] flex flex-col max-h-[350px] overflow-hidden flex-wrap gap-x-[30px] w-full">
                                              {node.children?.map((leaf) => {
                                                return (
                                                  <li class="block pb-[5px]">
                                                    <a
                                                      class="leading-[35px] block text-[14px] text-[#595956]"
                                                      href={leaf.url}
                                                    >
                                                      {leaf.name}
                                                    </a>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                            {node?.image && node?.image.length != 0 && 
                                              (
                                                <div class="banners-submenu">
                                              <div>
                                                <div class="box-banner">
                                                  <a>
                                                    <img
                                                      class="inline-block align-top h-auto max-w-full"
                                                      width={"auto"}
                                                      height={"auto"}
                                                      alt={"banner"}
                                                      src={node?.image &&
                                                        node?.image[0]?.contentUrl}
                                                    />
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                              )
                                            }
                                            

                                          </div>
                                        )
                                      }
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                  </li>
                );
              })}

              {items && items.map((item, index) => {
                const { url, name, children } = item;
                return (
                  <li class="group inline-block float-left p-0 relative text-center has-submenu">
                    <a
                      class="group-hover:underline p-[7´x] m-auto text-center h-full flex flex-col justify-center transition-all"
                      href={url}>
                      <span class="text-[10px] block mt-[10px] text-white text-center uppercase">
                        {name}
                      </span>
                    </a>
                    {children && children.length > 0 &&
                      (
                        <div class={`group-hover:flex hidden rounded-[0_0_10px_10px] shadow-md absolute bg-white py-[24px] px-[30px] text-left min-w-[600px] ${index >= 5 ? "first-of-type:right-0" : ""} `}>
                          <ul class="flex-1 flex flex-col max-h-[400px] flex-wrap">
                            {children.map((node) => {
                              return (
                                <li class="block pb-[10px]">
                                  <a
                                    class="flex items-center justify-between text-[14px] text-[#595956] leading-[35px]"
                                    href={node.url} >
                                    {node.name}
                                  </a>
                                </li>
                              )
                            })}

                          </ul>
                        </div>
                      )
                    }

                  </li>

                )
              })}

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
