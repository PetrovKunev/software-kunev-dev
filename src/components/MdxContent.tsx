import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import Callout from "./Callout";

/** Типографски стилове на cyber teal темата за MDX съдържание. */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 border-b border-edge pb-2 text-2xl font-bold text-foreground first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-lg font-semibold text-accent-bright" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-6 font-semibold text-foreground" {...props} />
  ),
  p: (props) => <p className="my-4 leading-relaxed text-muted" {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-1 pl-6 text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-1 pl-6 text-muted" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent underline decoration-accent-deep underline-offset-4 transition-colors hover:text-accent-bright"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded border border-edge bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent-bright"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-5 overflow-x-auto rounded-lg border border-edge bg-surface p-4 font-mono text-sm [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-5 border-l-2 border-accent-dim pl-4 text-muted italic"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-edge">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface" {...props} />,
  th: (props) => (
    <th
      className="border-b border-edge px-4 py-2 text-left font-mono text-xs font-bold tracking-wider text-accent uppercase"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-edge/60 px-4 py-2 align-top text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-edge" />,
  Callout,
};

/**
 * Рендерира MDX низ (от content/) при build време.
 * Server component — evaluate() се изпълнява само по време на prerender.
 */
export default async function MdxContent({ source }: { source: string }) {
  const options = {
    ...runtime,
    remarkPlugins: [remarkGfm],
  } as unknown as Parameters<typeof evaluate>[1];
  const { default: Content } = await evaluate(source, options);
  return <Content components={components} />;
}
