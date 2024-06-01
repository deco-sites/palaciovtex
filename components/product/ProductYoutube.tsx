import Button from "$store/components/ui/Button.tsx";
import _Modal from "$store/components/ui/Modal.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  video: string;
}

function ProductYoutube({ video }: Props) {
  const id = useId();
  const open = useSignal(false);

  return (
    <>
      <Button
        class="hidden sm:inline-flex btn-ghost"
        onClick={() => open.value = true}
      >
        <Image
          src={"https://palaciodasferramentas.vteximg.com.br/arquivos/thumb-video.png"}
          width={48}
          height={36}
          loading={"lazy"}
        />
      </Button>
      <div id={id}>
        <_Modal
          loading="lazy"
          open={open.value}
          onClose={() => open.value = false}
        >
          <div class="modal-box w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
            <div
              class="col-span-full col-start-1 row-start-1 row-span-full h-full w-full"
              dangerouslySetInnerHTML={{ __html: video }}
            >
            </div>
          </div>
        </_Modal>
      </div>
    </>
  );
}

export default ProductYoutube;
