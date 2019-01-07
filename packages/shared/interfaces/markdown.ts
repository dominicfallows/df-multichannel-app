export interface MarkdownRemarkNode {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    created: string;
    updated: string;
    title: string;
    taxonomy: string[];
  };
}
