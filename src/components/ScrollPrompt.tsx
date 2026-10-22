export function ScrollPrompt({ label = 'Scroll to ignite' }: { label?: string }) {
  return (
    <div className="scroll-prompt" aria-hidden="true">
      <span className="scroll-prompt__label">{label}</span>
      <span className="scroll-prompt__track"><i /></span>
      <span className="scroll-prompt__arrow">↓</span>
    </div>
  );
}
