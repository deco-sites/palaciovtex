import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Loja {
  image: ImageWidget;
}

export interface Props {
  title: string;
  lojas?: Loja[];
}
export default function LojasCarousel({ lojas, title }: Props) {
  const id = useId();
  return (
    <div class="container py-10 border-y-[#cccbc6] border-t border-solid border-b px-3 md:px-0">
      <h2
        class="text-[30px] leading-[36px] font-bold text-center pb-[30px]"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h2>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-0 md:px-5 mb-20 "
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {lojas && lojas.map((loja, index) => {
            const { image } = loja;
            return (
              <Slider.Item
                index={index}
                class={`carousel-item md:w-1/3 w-full`}
              >
                <Image
                  class="block min-w-[70px]"
                  src={image}
                  alt={"Nossa Loja de Tal Lugar"}
                  width={342}
                  height={288}
                  loading={"lazy"}
                  decoding="async"
                />
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
