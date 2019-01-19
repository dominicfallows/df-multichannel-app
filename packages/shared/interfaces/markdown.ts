export interface MarkdownRemarkNode {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    path: string;
  };
  frontmatter: {
    created: string;
    updated: string;
    title: string;
    taxonomy?: string[];
    subNavItems?: Array<{
      to: string;
      title: string;
    }>;
  };
}
