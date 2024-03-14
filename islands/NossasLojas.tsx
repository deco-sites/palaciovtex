import { ImageWidget } from "apps/admin/widgets.ts";
import Button from "$store/components/ui/Button.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";

interface Loja {
  image: ImageWidget;
  title: string;
  endereco: string;
  horario: string;
  iframe?: string;
}

interface Props {
  lojas: Loja[];
}

function NossasLojas({ lojas }: Props) {
  const selectedLoja = useSignal<null | Loja>(null);
  const isOpen = selectedLoja.value !== null;

  return (
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 container">
      {lojas && lojas.map((loja) => {
        return (
          <div class="pb-4">
            <img class="w-full h-auto" src={loja.image} alt={loja.title} />
            <h4 class="block mt-5 mr-0 mb-2 ml-0 text-base font-bold leading-6">
              {loja.title}
            </h4>
            <p
              class="min-h-12 block mb-4 text-sm text-[#595956]"
              dangerouslySetInnerHTML={{ __html: loja.endereco }}
            >
            </p>
            <span
              class="mb-4 block text-sm leading-6 text-[#A6A5A1]"
              dangerouslySetInnerHTML={{ __html: loja.horario }}
            >
            </span>
            <Button
              class="transition-all w-[230px] bg-white border border-black text-black rounded h-10"
              onClick={() => (selectedLoja.value = loja)}
            >
              Ver no Mapa
            </Button>
          </div>
        );
      })}

      <Modal
        loading="lazy"
        open={isOpen}
        onClose={() => selectedLoja.value = null}
      >
        <div class="modal-box w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
          <div class="col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
            <iframe
              src={selectedLoja.value?.iframe}
              width="100%"
              height="400"
              style="border:0"
              loading="lazy"
            >
            </iframe>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default NossasLojas;
