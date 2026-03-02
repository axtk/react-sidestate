import { useRef } from "react";
import { A, useRoute, useRouteLinks } from "../../../index.ts";

// Some safe HTML content that could have been fetched from the server.
// It contains a baked-in HTML link that will be acting like a SPA link
// after calling the `useRouteLinks` hook.
const htmlContent =
  '<p>Lorem ipsum. See the <a href="/story">full story</a>.</p>';

const Intro = () => {
  let containerRef = useRef<HTMLDivElement>(null);

  useRouteLinks(containerRef);

  return (
    <main>
      <h2>Intro</h2>
      <div
        ref={containerRef}
        className="content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </main>
  );
};

const Story = () => (
  <main>
    <h2>Story</h2>
  </main>
);

export const App = () => {
  let { at } = useRoute();

  return (
    <>
      <header className={at("/", "full", "compact")}>
        <h1>App</h1>
        <nav>
          <A href="/">Intro</A>
        </nav>
      </header>
      {at("/", <Intro />)}
      {at("/story", <Story />)}
    </>
  );
};
