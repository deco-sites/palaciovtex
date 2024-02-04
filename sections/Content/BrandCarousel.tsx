import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Brand {
  image: ImageWidget;
  link: string;
  text: string;
}

export interface Props {
  title: string;
  brands?: Brand[];
}
export default function BrandCarousel({ brands, title }: Props) {
  const id = useId();
  return (
    <div class="container py-10 border-y-[#cccbc6] border-t border-solid border-b">
      <h2
        class="text-[30px] leading-[36px] font-bold text-center pb-[30px]"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h2>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-0 md:px-5 mb-[40px] "
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {brands && brands.map((brand, index) => {
            const { link, image, text } = brand;
            return (
              <Slider.Item
                index={index}
                class={`carousel-item md:w-1/5 w-full`}
              >
                <a
                  class="mx-[6px] w-full group transition-all flex flex-col justify-between items-center text-transparent px-0 py-6"
                  href={link} >
                  <Image
                    class="block min-w-[70px]"
                    src={image}
                    alt={text}
                    width={156}
                    height={120}
                    loading={"lazy"}
                    decoding="async"
                  />
                </a>
              </Slider.Item>
            );
          })}
        </Slider>

        <>
          <div class="relative block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon
                size={48}
                id="ChevronLeftCustom"
                strokeWidth={3}
                class="w-5 rotate-180"
              />
            </Slider.PrevButton>
          </div>
          <div class="relative block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={48} id="ChevronRightCustom" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
