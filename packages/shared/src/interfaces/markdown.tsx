export interface MarkdownRemarkNode {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    title: string;
  };
};
