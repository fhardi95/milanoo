const POINTS = [
  { label: '10,000+ pieces', detail: 'One feed, seven categories, searchable in one place.' },
  { label: 'Live pricing', detail: 'Prices and markdowns pull from our partner feed, not a stale cache.' },
  { label: 'Direct checkout', detail: "You pay our retail partner directly — Tavirae never touches your card." },
  { label: 'No account needed', detail: 'Browse and bag items without signing up for anything.' }
];

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why shop here">
      {POINTS.map((p) => (
        <div className="trust-item" key={p.label}>
          <strong>{p.label}</strong>
          <span>{p.detail}</span>
        </div>
      ))}
    </section>
  );
}
