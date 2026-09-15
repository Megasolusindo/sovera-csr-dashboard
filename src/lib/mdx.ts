import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  category?: string;
  tags?: string[];
  updated?: string;
  readTime?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export interface ArticleMetadata extends ArticleFrontmatter {
  slug: string;
}

/**
 * Get all article metadata sorted by date descending (for blog listing)
 */
export function getAllArticles(): ArticleMetadata[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  const articles = files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(ARTICLES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug,
        ...(data as ArticleFrontmatter),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

/**
 * Get single article with full content
 */
export function getArticle(slug: string): Article | null {
  let filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    content,
    ...(data as ArticleFrontmatter),
  };
}

/**
 * Get all article slugs (for static page pre-rendering)
 */
export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}
