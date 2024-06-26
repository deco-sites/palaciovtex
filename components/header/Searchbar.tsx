import { headerHeight as _headerHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import _Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  // deno-lint-ignore no-unused-vars
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <div class="w-full">
      <Searchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;
