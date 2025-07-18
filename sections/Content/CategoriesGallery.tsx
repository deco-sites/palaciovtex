import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Category {
  image: ImageWidget;
  hoverImage: ImageWidget;
  link: string;
  text: string;
}

export interface Props {
  categories?: Category[];
}
export default function CategoriesGallery({ categories }: Props) {
  const id = useId();
  return (
    <>
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 md:px-5 mb-20 "
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {categories && categories.map((category, index) => {
            return (
              <Slider.Item
                index={index}
                class={`carousel-item md:w-1/5 w-full`}
              >
                <a
                  class="mx-[6px] w-full group hover:bg-black transition-all flex flex-col justify-between items-center h-[177px] text-transparent border px-0 py-6 rounded-[5px] border-solid border-[#CCCBC6]"
                  href={category.link}
                >
                  <Image
                    class="block min-w-[70px] group-hover:hidden"
                    src={category.image}
                    alt={category.text}
                    width={80}
                    height={80}
                    loading={"lazy"}
                    decoding="async"
                  />
                  <Image
                    class="hidden group-hover:block min-w-[70px]"
                    src={category.hoverImage}
                    alt={category.text}
                    width={80}
                    height={80}
                    loading={"lazy"}
                    decoding="async"
                  />
                  <span
                    class="group-hover:text-[#F0D02C] text-base leading-[19px] text-black uppercase text-center"
                    dangerouslySetInnerHTML={{ __html: category.text }}
                  >
                  </span>
                </a>
              </Slider.Item>
            );
          })}
        </Slider>

        <>
          <div class="relative block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon
                size={24}
                id="ChevronLeftCustom"
                strokeWidth={3}
                class="w-5 rotate-180"
              />
            </Slider.PrevButton>
          </div>
          <div class="relative block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={24} class="w-5" id="ChevronRightCustom" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <Slider.JS rootId={id} />
      </div>
    </>
  );
}
