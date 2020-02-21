export interface MdxNodeFrontmatter {
  created: string;
  updated: string;
  title: string;
  taxonomy?: string[];
  subNavItems?: Array<{
    to: string;
    title: string;
  }>;
  standfirst?: string;
  toc?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
  path?: string;
}

export interface MdxNode {
  id: string;
  excerpt: string;
  fields: {
    path: string;
  };
  frontmatter: MdxNodeFrontmatter;
  body: string;
}
