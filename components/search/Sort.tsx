import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(globalThis.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(globalThis.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "orders:desc": "Mais vendidos",
  "discount:desc": "Maior desconto",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  // Cria um mapa rápido para acessar os sortOptions recebidos
  const optionsMap = sortOptions.reduce((acc, option) => {
    acc[option.label] = option.value;
    return acc;
  }, {} as Record<string, string>);

  // Garante a ordem com base na ordem das chaves do portugueseMappings
  const orderedOptions = Object.entries(portugueseMappings)
    .map(([key, label]) => {
      const value = optionsMap[key];
      if (!value) return null;
      return { value, label, backSort: key };
    })
    .filter((option): option is { value: string; label: string; backSort: string } => option !== null);

  return (
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="w-min p-4 px-1 rounded ml-2 cursor-pointer outline-none flex-grow justify-between font-bold text-black uppercase max-w-[284px] h-[55px] max-h-[55px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
    >
      {orderedOptions?.map(({ value, label, backSort }) => (
        <option key={value} value={backSort} selected={backSort === sort}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Sort;
