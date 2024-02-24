import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface TipbarItem {
  icon?: ImageWidget;
  content: string;
}

export interface Props {
  items: TipbarItem[];
}

export default function Tipbar({ items }: Props) {
  return (
    <div class="my-[50px]">
      <div class="container">
        <div class="tipbar-in">
          <ul class="flex m-0 flex-row overflow-auto md:overflow-hidden pb-3 md:pb-0">
            {items?.length > 0 && items.map((item, index) => {
              return (
                <li
                  class={`${
                    index == 3 ? "md:mr-0 mx-[12px]" : "md:mr-[12px] mx-[12px]"
                  } md:min-w-max min-w-[80%]  flex-1 inline-flex justify-center items-center border px-2.5 py-9 rounded-[5px] border-solid border-[#A6A5A1]`}
                >
                  <div class="w-full flex items-center justify-center">
                    <div class="tipbar-left">
                      {item?.icon &&
                        (
                          <Image
                            class={"min-w-[50px] text-[#F0D02C] text-[40px]"}
                            src={item.icon}
                            alt={"Icone Representativo"}
                            width={60}
                            height={41}
                            loading={"lazy"}
                          />
                        )}
                    </div>
                    <div class="pl-[40px] uppercase">
                      <p
                        class="text-[14px] uppercase font-normal"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      >
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
