import { A, useRoute } from "../../../index.ts";

const Intro = () => (
  <main>
    <h2>Intro</h2>
  </main>
);

const Section = ({ id }: { id: string | undefined }) => (
  <main>
    <h2>Section {id}</h2>
  </main>
);

const ErrorSection = () => (
  <main>
    <h2>Error 404</h2>
  </main>
);

const routes = {
  intro: "/",
  sections: /^\/sections\/(?<id>\d+)\/?$/,
};

const knownRoutes = Object.values(routes);

export const App = () => {
  let { at } = useRoute();

  return (
    <>
      <header className={at(routes.intro, "full", "compact")}>
        <h1>App</h1>
        <nav>
          <A href={routes.intro}>Intro</A>
          {" | "}
          <A href="/sections/1">Section 1</A>
          {" | "}
          <A href="/sections/2">Section 2</A>
          {" | "}
          <A href="/test">Broken link</A>
        </nav>
      </header>
      {at(routes.intro, <Intro />)}
      {at(routes.sections, ({ params }) => (
        <Section id={params.id} />
      ))}
      {at(knownRoutes, null, <ErrorSection />)}
    </>
  );
};
