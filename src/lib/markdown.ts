import { remark } from "remark";
import html from "remark-html";

import remarkGfm from "remark-gfm";
import { rehype } from "rehype";

import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const processor = remark()
  .use(remarkGfm) // GitHub Flavored Markdown
  .use(html, {
    sanitize: false, // Allows custom HTML
    allowDangerousHtml: true,
  });

// Separate processor for syntax highlighting
const rehypeProcessor = rehype()
  .use(rehypeHighlight, {
    // highlight.js settings
    detect: true,
    subset: [
      "javascript",
      "typescript",
      "jsx",
      "tsx",
      "html",
      "css",
      "json",
      "bash",
      "python",
      "sql",
      "yaml",
      "markdown",
    ],
  })
  .use(rehypeStringify);

/**
 * Convert markdown to HTML with syntax highlighting
 */
async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // First convert markdown to HTML
    const remarkResult = await processor.process(markdown);
    let html = remarkResult.toString();

    // Then apply syntax highlighting
    const rehypeResult = await rehypeProcessor.process(html);
    return rehypeResult.toString();
  } catch (error) {
    return markdown; // Returns original markdown on error
  }
}

/**
 * Extract only the text from markdown (remove formatting)
 */
function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // Remove images
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered lists
    .replace(/^\s*>\s+/gm, "") // Remove blockquotes
    .replace(/\n\s*\n/g, "\n") // Remove extra line breaks
    .trim();
}

/**
 * Extracts a summary from markdown content
 */
function extractExcerpt(markdown: string, maxLength: number = 160): string {
  const plainText = stripMarkdown(markdown);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last space before the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Extract headers from markdown to table of contents
 */
function extractHeaders(markdown: string): Array<{
  level: number;
  text: string;
  slug: string;
}> {
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  const headers: Array<{ level: number; text: string; slug: string }> = [];

  let match;
  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    headers.push({ level, text, slug });
  }

  return headers;
}

/**
 * Add IDs to headers for navigation
 */
function addHeaderIds(html: string): string {
  return html.replace(
    /<h([1-6])>([^<]+)<\/h([1-6])>/g,
    (match, level, text, closeLevel) => {
      if (level !== closeLevel) return match;

      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      return `<h${level} id="${slug}">${text}</h${level}>`;
    }
  );
}

/**
 * Completely processes a markdown for display
 */
async function processMarkdownFull(markdown: string): Promise<{
  html: string;
  headers: Array<{ level: number; text: string; slug: string }>;
  excerpt: string;
}> {
  const headers = extractHeaders(markdown);

  const html = addHeaderIds(await convertMarkdownToHtml(markdown));
  const excerpt = extractExcerpt(markdown);

  return {
    html,
    headers,
    excerpt,
  };
}

export {
  processMarkdownFull,
  addHeaderIds,
  extractHeaders,
  extractExcerpt,
  stripMarkdown,
  convertMarkdownToHtml,
};
