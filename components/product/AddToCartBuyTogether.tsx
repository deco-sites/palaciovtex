import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "site/components/ui/Button.tsx";
import { SkuListType } from "site/components/product/BuyTogether.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  skuList: SkuListType[] | undefined;
}

function AddToCartBuyTogether({ skuList }: Props) {
  const { addItems } = useCart();
  const { displayCart } = useUI();

  const handleAddToCart = () => {
    if (skuList) {
      const orderItems = skuList.map((sku) => ({
        id: sku.id,
        seller: sku.seller || "",
        quantity: 1,
      }));

      console.log(orderItems);
      addItems({ orderItems });

      displayCart.value = true;
    }
  };
  return (
    <>
      <>
        <Button
          onClick={() => handleAddToCart()}
          children={"Compre Junto"}
          class="rounded-[5px] font-medium text-xs flex justify-center items-center h-[40px] text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black bg-[#F0D02C] border text-black border-solid border-[#F0D02C]"
        />
      </>
    </>
  );
}

export default AddToCartBuyTogether;
