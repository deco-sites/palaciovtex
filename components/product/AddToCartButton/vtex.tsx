// deno-lint-ignore-file no-constant-condition
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useSignal } from "@preact/signals";
export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
  const { addItems } = useCart();
  const count = useSignal(1);

  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: count.value,
      }],
    });

  return (
    <div class="flex items-center gap-3">
      <div class="hidden md:flex items-center justify-between w-[110px] h-[55px] border bg-white text-[#1e1e1e] text-xl rounded-[5px] border-solid border-[#cccbc6]">
        <button
          class="counter-minus px-2.5 py-[15px] border-[none]"
          onClick={() => (count.value = 1 ? 1 : count.value -= 1)}
        >
          -
        </button>
        <input
          class="counter-quantity w-[25px] text-center px-0 py-[15px]"
          type="number"
          min={1}
          value={count.value}
          disabled
        />
        <button
          class="counter-plus px-2.5 py-[15px] border-[none]"
          onClick={() => (count.value += 1)}
        >
          +
        </button>
      </div>

      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </div>
  );
}

export default AddToCartButton;
