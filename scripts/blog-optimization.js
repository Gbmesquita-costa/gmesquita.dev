const fs = require("node:fs");
const path = require("node:path");

const matter = require("gray-matter");

// ===================================================================
// 🧹 CLEANING AND OPTIMIZATION FUNCTIONS
// ===================================================================

/**
 * ✅ Optimizes markdown files by removing unnecessary spaces
 */
function optimizeMarkdownFiles() {
  const postsDir = path.join(process.cwd(), "/src/posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts folder not found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
  let optimizedCount = 0;
  let savedBytes = 0;

  console.log("🧹 Optimizing markdown files...\n");

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const originalContent = fs.readFileSync(filePath, "utf8");
    const originalSize = Buffer.byteLength(originalContent, "utf8");

    // ✅ CONTENT OPTIMIZATIONS
    let optimizedContent = originalContent
      // Remove trailing whitespace
      .replace(/[ \t]+$/gm, "")
      // Remove excessive line breaks (more than 2 consecutive)
      .replace(/\n{3,}/g, "\n\n")
      // Remove spaces before line breaks
      .replace(/\s+\n/g, "\n")
      // Normalize line breaks in frontmatter
      .replace(/---\s*\n\s*\n/g, "---\n")
      // Remove unnecessary HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Final trim
      .trim();

    // ✅ FRONTMATTER OPTIMIZATION
    try {
      const { data, content } = matter(optimizedContent);

      // Remove empty fields from frontmatter
      Object.keys(data).forEach((key) => {
        if (
          data[key] === "" ||
          data[key] === null ||
          (Array.isArray(data[key]) && data[key].length === 0)
        ) {
          delete data[key];
        }
      });

      // Rebuild optimized file
      optimizedContent = matter.stringify(content.trim(), data);
    } catch (error) {
      console.warn(
        `⚠️  Error optimizing frontmatter of ${file}: ${error.message}`
      );
    }

    const optimizedSize = Buffer.byteLength(optimizedContent, "utf8");
    const reduction = originalSize - optimizedSize;

    if (reduction > 0) {
      fs.writeFileSync(filePath, optimizedContent, "utf8");
      optimizedCount++;
      savedBytes += reduction;

      console.log(`✅ ${file}: ${(reduction / 1024).toFixed(2)}KB saved`);
    } else {
      console.log(`ℹ️  ${file}: already optimized`);
    }
  });

  console.log(`\n📊 Optimization completed:`);
  console.log(`   📁 Files processed: ${files.length}`);
  console.log(`   ✅ Files optimized: ${optimizedCount}`);
  console.log(`   💾 Total saved: ${(savedBytes / 1024).toFixed(2)}KB`);
}

/**
 * ✅ Removes orphan images (without reference in posts)
 */
function cleanOrphanImages() {
  const postsDir = path.join(process.cwd(), "/src/posts");
  const imagesDir = path.join(process.cwd(), "/public/static/posts");

  if (!fs.existsSync(postsDir) || !fs.existsSync(imagesDir)) {
    console.log("❌ Directories not found");
    return;
  }

  console.log("🖼️  Checking orphan images...\n");

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
  const imageFiles = fs.readdirSync(imagesDir);
  const referencedImages = new Set();

  // ✅ COLLECT REFERENCED IMAGES
  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Search for references in frontmatter and content
    const imageMatches = content.match(
      /\/static\/posts\/[^"\s)]+\.(jpg|jpeg|png|webp|gif)/gi
    );
    if (imageMatches) {
      imageMatches.forEach((match) => {
        const imageName = path.basename(match);
        referencedImages.add(imageName);
      });
    }
  });

  // ✅ IDENTIFY ORPHANS
  const orphanImages = imageFiles.filter(
    (image) => !referencedImages.has(image)
  );

  if (orphanImages.length === 0) {
    console.log("✅ No orphan images found");
    return;
  }

  console.log(`🗑️  Found ${orphanImages.length} orphan images:`);
  orphanImages.forEach((image) => console.log(`   - ${image}`));

  // Here you can choose to delete or just list
  console.log("\n💡 To remove, execute: rm public/static/posts/{image-name}");
}

/**
 * ✅ Validates and fixes post structure
 */
function validateAndFixPosts() {
  const postsDir = path.join(process.cwd(), "/src/posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts folder not found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
  let fixedCount = 0;

  console.log("🔧 Validating and fixing posts...\n");

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const originalContent = fs.readFileSync(filePath, "utf8");
    let wasFixed = false;

    try {
      const { data, content } = matter(originalContent);
      const issues = [];

      // ✅ VALIDATIONS AND FIXES
      if (!data.title) {
        issues.push("Missing title");
      }

      if (!data.excerpt) {
        issues.push("Missing excerpt");
      } else if (data.excerpt.length < 50) {
        issues.push("Excerpt too short");
      }

      if (!data.date) {
        issues.push("Missing date");
      }

      if (!data.category) {
        issues.push("Missing category");
      }

      if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
        issues.push("Missing tags");
      }

      // ✅ AUTOMATIC FIX: ReadTime
      if (!data.readTime || typeof data.readTime !== "number") {
        const wordCount = content.trim().split(/\s+/).length;
        data.readTime = Math.max(1, Math.ceil(wordCount / 200));
        wasFixed = true;
        issues.push("Reading time calculated automatically");
      }

      // ✅ AUTOMATIC FIX: Author
      if (!data.author) {
        data.author = "Gabriel Mesquita";
        wasFixed = true;
        issues.push("Author set to default");
      }

      // ✅ AUTOMATIC FIX: Featured
      if (typeof data.featured !== "boolean") {
        data.featured = false;
        wasFixed = true;
        issues.push("Featured field set to false");
      }

      // ✅ SAVE FIXES
      if (wasFixed) {
        const correctedContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, correctedContent, "utf8");
        fixedCount++;
      }

      // ✅ REPORT
      if (issues.length > 0) {
        console.log(`${wasFixed ? "🔧" : "⚠️"} ${file}:`);
        issues.forEach((issue) => console.log(`   - ${issue}`));
      } else {
        console.log(`✅ ${file}: OK`);
      }
    } catch (error) {
      console.log(`❌ ${file}: Error - ${error.message}`);
    }
  });

  console.log(`\n📊 Validation completed:`);
  console.log(`   📁 Files checked: ${files.length}`);
  console.log(`   🔧 Files fixed: ${fixedCount}`);
}

/**
 * ✅ Generates blog performance report
 */
function generatePerformanceReport() {
  const postsDir = path.join(process.cwd(), "/src/posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts folder not found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  console.log("📊 BLOG PERFORMANCE REPORT\n");

  let totalSize = 0;
  let totalWords = 0;
  let totalReadTime = 0;
  const categories = new Map();
  const tags = new Map();
  const fileSizes = [];

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const fileSize = Buffer.byteLength(fileContent, "utf8");
    const { data, content } = matter(fileContent);

    totalSize += fileSize;
    fileSizes.push({ file, size: fileSize });

    const wordCount = content.trim().split(/\s+/).length;
    totalWords += wordCount;

    if (data.readTime) {
      totalReadTime += data.readTime;
    }

    if (data.category) {
      categories.set(data.category, (categories.get(data.category) || 0) + 1);
    }

    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag) => {
        if (tag && tag.trim()) {
          tags.set(tag.trim(), (tags.get(tag.trim()) || 0) + 1);
        }
      });
    }
  });

  // ✅ GENERAL STATISTICS
  console.log("📈 GENERAL STATISTICS:");
  console.log(`   📁 Total posts: ${files.length}`);
  console.log(`   💾 Total size: ${(totalSize / 1024).toFixed(2)}KB`);
  console.log(`   📝 Total words: ${totalWords.toLocaleString()}`);
  console.log(`   ⏱️  Total reading time: ${totalReadTime} minutes`);
  console.log(
    `   📊 Average size per post: ${(totalSize / files.length / 1024).toFixed(
      2
    )}KB`
  );

  // ✅ LARGEST FILES
  console.log("\n📁 LARGEST FILES:");
  fileSizes
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .forEach(({ file, size }) => {
      console.log(`   ${file}: ${(size / 1024).toFixed(2)}KB`);
    });

  // ✅ MOST POPULAR CATEGORIES
  console.log("\n📂 MOST POPULAR CATEGORIES:");
  Array.from(categories.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} posts`);
    });

  // ✅ MOST USED TAGS
  console.log("\n🏷️  MOST USED TAGS:");
  Array.from(tags.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([tag, count]) => {
      console.log(`   #${tag}: ${count} uses`);
    });

  // ✅ OPTIMIZATION RECOMMENDATIONS
  console.log("\n💡 RECOMMENDATIONS:");

  const averageSize = totalSize / files.length;
  const largeFiles = fileSizes.filter(({ size }) => size > averageSize * 2);

  if (largeFiles.length > 0) {
    console.log(
      `   📁 ${largeFiles.length} files are too large (>${(
        (averageSize * 2) /
        1024
      ).toFixed(2)}KB)`
    );
  }

  if (categories.size < 3) {
    console.log(
      "   📂 Consider diversifying categories (minimum recommended: 3)"
    );
  }

  if (totalWords / files.length < 300) {
    console.log("   📝 Posts could be more detailed (current average too low)");
  }

  console.log("   🧹 Run 'yarn blog:optimize' to optimize files");
}

/**
 * ✅ Main menu
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "optimize":
      optimizeMarkdownFiles();
      break;

    case "clean-images":
      cleanOrphanImages();
      break;

    case "validate":
      validateAndFixPosts();
      break;

    case "report":
      generatePerformanceReport();
      break;

    case "all":
      console.log("🚀 RUNNING COMPLETE OPTIMIZATION\n");
      optimizeMarkdownFiles();
      console.log("\n" + "=".repeat(50) + "\n");
      validateAndFixPosts();
      console.log("\n" + "=".repeat(50) + "\n");
      cleanOrphanImages();
      console.log("\n" + "=".repeat(50) + "\n");
      generatePerformanceReport();
      break;

    default:
      console.log("🛠️  BLOG OPTIMIZATION SCRIPT\n");
      console.log("Available commands:");
      console.log("  optimize      - Optimize markdown files");
      console.log("  clean-images  - Remove orphan images");
      console.log("  validate      - Validate and fix posts");
      console.log("  report        - Generate performance report");
      console.log("  all           - Run all optimizations");
      console.log("\nExample: node scripts/blog-optimization.js optimize");
      break;
  }
}

// ✅ EXECUTION
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  optimizeMarkdownFiles,
  cleanOrphanImages,
  validateAndFixPosts,
  generatePerformanceReport,
};
