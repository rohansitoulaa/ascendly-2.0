/**
 * JsonLd  injects one or more JSON-LD <script> tags into the <head>.
 *
 * Usage (Server Component  no "use client" needed):
 *   <JsonLd schema={organizationSchema()} />
 *   <JsonLd schema={[webPageSchema(...), breadcrumbSchema(...)]} />
 *
 * Why dangerouslySetInnerHTML is correct here:
 *   JSON-LD is a <script> tag with serialised JSON  it is NOT user-supplied
 *   HTML. React's dangerouslySetInnerHTML is the only way to set a script's
 *   text content; using children would double-encode the JSON.
 *
 * Google reads these tags during its crawl. They are invisible to users.
 */

type JsonLdSchema = Record<string, unknown>;

interface JsonLdProps {
  schema: JsonLdSchema | JsonLdSchema[];
}

/** Renders one <script type="application/ld+json"> per schema object. */
export default function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Safe: content is our own serialised data, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
