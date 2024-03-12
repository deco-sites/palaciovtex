import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Item {
  title: string;
  content: HTML;
}

interface Props {
  items: Item[];
}

function InstitucionalAccordion({ items }: Props) {
  return (
    <>
      <div className="join join-vertical w-full">
        {items.length > 0 && items.map((item, index) => {
          return (
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input
                type="radio"
                name={`my-accordion-4`}
                checked={index == 0 ? true : false}
              />
              <div className="collapse-title text-xl font-medium">
                {item.title}
              </div>
              <div
                className="collapse-content"
                dangerouslySetInnerHTML={{ __html: item.content }}
              >
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default InstitucionalAccordion;
