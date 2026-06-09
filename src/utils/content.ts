/**
 * Extracts headings from markdown content.
 * 使用 github-slugger 生成 slug，与 rehype-slug 保持一致，确保中文等 Unicode 标题能正确跳转。
 * @param content - The markdown content
 * @returns An array of heading objects with depth, slug, and text
 */
import GithubSlugger from 'github-slugger';

export async function getHeadings(content: string) {
  // Regular expression to match markdown headings
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = slugger.slug(text);

    headings.push({
      depth,
      slug,
      text
    });
  }

  return headings;
}

/**
 * Calculates the reading time for content
 * @param content - The text content
 * @param wordsPerMinute - Reading speed in words per minute (default: 200)
 * @returns A string representing the reading time
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200) {
  // Remove markdown syntax, code blocks, and other non-text content
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just the text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove images
    .replace(/#/g, '') // Remove heading markers
    .replace(/\*\*|\*|__|_/g, '') // Remove bold and italic markers
    .replace(/>\s?/g, '') // Remove blockquotes

  // Count words
  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
} 