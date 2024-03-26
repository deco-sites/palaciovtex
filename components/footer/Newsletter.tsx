import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  placeholderNome?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const firstName = (e.currentTarget.elements.namedItem("nome") as RadioNodeList)
        ?.value;
      await invoke.vtex.actions.masterdata.createDocument({
        data: {email, firstName}, 
        acronym: "NS"
      });
      // await invoke.vtex.actions.newsletter.subscribe({ email, name });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
          : "flex-col gap-4"
      }`}
    >
      <div class="flex flex-col gap-4 justify-center items-center">
        {content?.title && (
          <h3
            class={"text-[30px] leading-[normal] relative text-center m-0 max-w-[60%]"}
            dangerouslySetInnerHTML={{ __html: content?.title }}
          >
          </h3>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4 pt-[30px]">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 justify-center">
            <input
              name="nome"
              class=" w-[350px] h-10 text-[#595956] text-base px-[15px] py-2.5 rounded-[5px] border-[none]"
              placeholder={content?.form?.placeholderNome || "Nome"}
            />
            <input
              name="email"
              class=" w-[350px] h-10 text-[#595956] text-base px-[15px] py-2.5 rounded-[5px] border-[none]"
              placeholder={content?.form?.placeholder || "E-mail"}
            />

            <button
              type="submit"
              class="enviado-sucesso disabled:loading flex justify-center items-center h-10 shadow-none border cursor-pointer font-medium text-center uppercase transition-all duration-[0.3s] ease-[ease-out] text-xs bg-black text-white w-[230px] rounded-[5px] border-solid border-transparent"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
