import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="category-hero" style={{ paddingBottom: 60 }}>
        <h1>Page not found</h1>
        <p>That item or category isn&apos;t in the catalogue (any more).</p>
        <p style={{ marginTop: 20 }}>
          <Link href="/" className="btn btn-primary">Back to Tavirae</Link>
        </p>
      </section>
      <Footer />
    </>
  );
}
