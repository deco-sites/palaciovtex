import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
  content: HTML;
}

function InstitucionalHTML({ content }: Props) {
  return (
    <section class="container">
      <div class="mb-5" dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
  );
}

export default InstitucionalHTML;
