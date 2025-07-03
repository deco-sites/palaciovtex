import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

// deno-lint-ignore no-explicit-any
const handleZipCode = (event: any) => {
  const input = event.target;
  input.value = zipCodeMask(input.value);
};

const zipCodeMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    // <ul class="flex flex-col gap-4 p-4 bg-base-200 rounded-[4px]">
    //   {methods.map((method) => (
    //     <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
    //       <span class="text-button">
    //         até {formatShippingEstimate(method.shippingEstimate)}
    //       </span>
    //     </li>
    //   ))}
    //   <span class="text-base-300">
    //     Os prazos de entrega começam a contar a partir da confirmação do
    //     pagamento e podem variar de acordo com a quantidade de produtos na
    //     sacola.
    //   </span>
    // </ul>
    <table class="mt-3 rounded-md border-[#cccbc6] border">
      <thead>
        <tr class="border-b-[#CCCBC6] border">
          <th class="w-1/2 py-3 px-4 text-black font-medium uppercase">
            Valor do frete
          </th>
          <th class="w-1/2 py-3 px-4 text-black font-medium uppercase">
            disponibilidade
          </th>
        </tr>
      </thead>
      <tbody>
        {methods.map((method) => (
          <tr class="border-b-[#CCCBC6] border">
            <td class="py-3 px-4 whitespace-nowrap font-medium text-black ">
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price / 100, currencyCode, locale)
              )}
            </td>
            <td class="py-3 px-4 text-[#595956] ">
              {method.name.replace(/\s*\([a-f0-9-]{36}\)\s*/i, "").trim()}, entrega em{" "}
              {formatShippingEstimate(method.shippingEstimate)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 9) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span>Calcular frete</span>
        <span>
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div>

      <form
        class="join"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered join-item"
          placeholder="Seu cep aqui"
          value={postalCode.value}
          maxLength={9}
          size={9}
          onKeyUp={(event) => handleZipCode(event)}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="bg-[#F0D02C] join-item w-full md:w-auto btn no-animation rounded-[5px] font-medium text-xs flex justify-center items-center text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black border text-black border-solid border-[#F0D02C]"
        >
          Calcular
        </Button>
      </form>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
