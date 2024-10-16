// deno-lint-ignore-file
import SearchResult, { Props as SearchResultProps, } from "$store/components/search/SearchResult.tsx";
import { type AppContext } from "@deco/deco";
export type Props = SearchResultProps;
async function loader(props: Props, req: Request, ctx: AppContext<any>) {
    if (!props.page || !props.page.products || props.page.products.length === 0) {
        return {
            ...props,
        };
    }
    const products = await ctx.invoke.vtex.loaders.intelligentSearch.productList({
        ids: props.page?.products.map((product) => product.productID),
    });
    console.log('produtos', products);
    return {
        ...props,
        page: {
            ...props.page,
            products,
        },
        isWishlist: true,
    };
}
export { loader };
function WishlistGallery(props: Props) {
    const isEmpty = !props.page || !props.page.products ||
        props.page.products.length === 0;
    if (isEmpty) {
        return (<div class="md:container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl text-center">
            Sua Lista de Desejos está vazia
          </span>
          <span class="text-center">
            Faça login e adicione itens à sua lista de desejos para
            visualizá-los mais tarde. Eles serão exibidos aqui.
          </span>
        </div>
      </div>);
    }
    return (<section class="container my-14 px-5 sm:px-0  flex flex-col justify-center items-center ">
      <h1 class="text-xl font-bold lg:text-[32px] leading-8 lg:leading-1053 text-primary pb-10">
        Minha Lista de Desejo
      </h1>
      <SearchResult {...props}/>
    </section>);
}
export default WishlistGallery;
