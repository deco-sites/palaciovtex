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

function Formulario() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("nome") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const cpf = (e.currentTarget.elements.namedItem("cpf") as RadioNodeList)
        ?.value;
      const celular =
        (e.currentTarget.elements.namedItem("celular") as RadioNodeList)?.value;
      const telefone =
        (e.currentTarget.elements.namedItem("telefone") as RadioNodeList)
          ?.value;
      const assunto =
        (e.currentTarget.elements.namedItem("assunto") as RadioNodeList)?.value;
      const mensagem =
        (e.currentTarget.elements.namedItem("mensagem") as RadioNodeList)
          ?.value;

      await invoke.vtex.actions.masterdata.createDocument({
        data: {
          name,
          email,
          cpf,
          celular,
          telefone,
          assunto,
          mensagem,
        },
        acronym: "FC",
        isPrivateEntity: false,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={"flex"}
    >
      <div class="flex flex-col gap-4 pt-[30px]">
        <form onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <label for="nome">Nome*</label>
              <input
                type="text"
                name="nome"
                value=""
                size={40}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
                required
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <label for="email">Email*</label>
              <input
                type="email"
                name="email"
                value=""
                size={40}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
                required
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3">
              <label for="cpf">CPF/CNPJ*</label>
              <input
                type="number"
                name="cpf"
                value=""
                size={40}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
                required
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <label for="celular">Celular*</label>
              <input
                type="tel"
                name="celular"
                value=""
                size={40}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
                required
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <label for="telefone">Telefone</label>
              <input
                type="tel"
                name="telefone"
                value=""
                size={40}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <label for="assunto">Assunto*</label>
              <select
                class="select select-bordered w-full max-w-xs"
                name="assunto"
                aria-required="true"
                aria-invalid="false"
                required
              >
                <option value="Elogio, Crítica ou Sugestão">
                  Elogio, Crítica ou Sugestão
                </option>
                <option value="Seus Pedidos">Seus Pedidos</option>
                <option value="Cancelamento">Cancelamento</option>
                <option value="Desistência">Desistência</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <label for="mensagem">Mensagem*</label>
              <textarea
                name="mensagem"
                cols={40}
                rows={10}
                class="input input-bordered flex items-center gap-2"
                aria-required="true"
                aria-invalid="false"
                required
              >
              </textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <span class="warning">Os campos com * são obrigatórios</span>
            </div>
            <div class="col-xs-12 col-sm-6">
              <button
                disabled={loading}
                type="submit"
                value="Enviar"
                class="form-control submit btn btn-secondary"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
