import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import _Modal from "$store/components/ui/Modal.tsx";
import Slider from "$store/components/ui/Slider.tsx";
// import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
}

function ProductImageZoom({ images, width, height }: Props) {
  const id = useId();
  const open = useSignal(false);

  return (
    <>
      <Button
        class="hidden sm:inline-flex btn-ghost"
        onClick={() => open.value = true}
      >
        <Icon id="Zoom" size={24} />
      </Button>
      <div id={id}>
        <_Modal
          loading="lazy"
          open={open.value}
          onClose={() => open.value = false}
        >
          <div class="modal-box w-8/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
            <div className="col-span-full col-start-1 row-start-1 row-span-full">
              <Slider class="w-full">
                {images.map((image, index) => (
                  <Slider.Item
                    index={index}
                    class="w-full"
                  >
                    <Image
                      // style={{ aspectRatio: `${width} / ${height}` }}
                      style={{ maxHeight: '800px'}}
                      src={image.url!}
                      alt={image.alternateName}
                      width={width}
                      height={height}
                      class="h-full w-auto m-auto"
                    />
                  </Slider.Item>
                ))}
              </Slider>
            </div>

            <Slider.PrevButton class="relative z-30 btn btn-circle btn-outline col-start-1 col-end-2 row-start-1 row-span-full">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton class="relative z-30 btn btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>

            <Slider.JS rootId={id} />
          </div>
        </_Modal>
      </div>
    </>
  );
}

export default ProductImageZoom;
