type ChapterLabelProps = {
  number: string;
  title: string;
  light?: boolean;
};

export function ChapterLabel({ number, title, light = false }: ChapterLabelProps) {
  return (
    <div className={`chapter-label${light ? ' chapter-label--light' : ''}`}>
      <span className="chapter-label__number">{number}</span>
      <span className="chapter-label__line" aria-hidden="true" />
      <span className="chapter-label__title">{title}</span>
    </div>
  );
}
