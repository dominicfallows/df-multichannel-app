export interface MdxNodeFrontmatter {
  created: string;
  updated: string;
  title: string;
  taxonomy?: string[];
  subNavItems?: Array<{
    to: string;
    title: string;
  }>;
}

export interface MdxNode {
  id: string;
  excerpt: string;
  fields: {
    path: string;
  };
  frontmatter: MdxNodeFrontmatter;
}
