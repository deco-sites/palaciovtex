import { type Section } from "@deco/deco/blocks";
interface Props {
    sections?: Section[];
}
function InstitucionalContent({ sections }: Props) {
    return (<section class="container">
      <div>
        {sections &&
            sections.map((section) => <section.Component {...section.props}/>)}
      </div>
    </section>);
}
export default InstitucionalContent;
