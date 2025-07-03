import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  /** @format color */
  buttonColor?: string;
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      style={{
        backgroundColor: props.buttonColor ? props.buttonColor : "",
        borderColor: props.buttonColor ? props.buttonColor : "",
      }}
      class="w-full md:w-100 shrink btn no-animation rounded-[5px] bg-[#F0D02C] font-medium text-xs flex justify-center items-center text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black border text-black border-solid border-[#F0D02C] h-[55px]"
    >
      Adicionar à Sacola
    </Button>
  );
}
