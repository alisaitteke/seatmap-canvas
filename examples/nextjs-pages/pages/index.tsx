import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Seatmap Canvas - Next.js Pages Router Examples</h1>
        <p>Interactive seat selection examples using Next.js Pages Router</p>
      </div>

      <div className="grid">
        <Link href="/ssg-example" className="card">
          <h2>SSG Example</h2>
          <p>Static Site Generation with getStaticProps</p>
        </Link>

        <Link href="/isr-example" className="card">
          <h2>ISR Example</h2>
          <p>Incremental Static Regeneration with revalidation</p>
        </Link>

        <Link href="/ssr-example" className="card">
          <h2>SSR Example</h2>
          <p>Server-Side Rendering with getServerSideProps</p>
        </Link>

        <Link href="/client-example" className="card">
          <h2>Client-Side Example</h2>
          <p>Dynamic import with SSR disabled</p>
        </Link>
      </div>
    </div>
  );
}
