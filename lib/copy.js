const INTROS = {
  "Women's Clothing":
    "Occasion dresses, daily wear and vacation pieces in one rail — filter by colour or size below to narrow it down.",
  'Wedding':
    "Bridal gowns, mother-of-the-bride dresses and wedding-party pieces, spanning ivory and colour alike.",
  'Costumes':
    "Latin dance, zentai and character costume pieces built for performance and stage.",
  'Shoes':
    "Boots, heels and booties — filter by colour or size to find the pair that fits the outfit.",
  'Lolita Fashion':
    "Coats, dresses and shoes cut for lolita silhouettes, from ruffled overcoats to platform Mary Janes.",
  "Men's Clothing":
    "Menswear pulled from the same catalogue — smaller in number, but filterable the same way.",
  "Men's Shoes":
    "Men's boots and formal shoes from the catalogue."
};

export function categoryIntro(categoryName, count) {
  const base = INTROS[categoryName] || `A curated set of ${categoryName.toLowerCase()} pieces.`;
  return `${base} ${count.toLocaleString()} pieces currently listed.`;
}
