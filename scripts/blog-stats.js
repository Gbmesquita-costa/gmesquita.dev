const fs = require("node:fs");
const path = require("node:path");

const matter = require("gray-matter");

function getBlogStats() {
  const postsDir = path.join(process.cwd(), "/src/posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts folder not found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  if (files.length === 0) {
    console.log("📝 No posts found in posts/ folder");
    return;
  }

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      filename: file,
      slug: file.replace(".md", ""),
      ...data,
      content,
      wordCount: content.split(/\s+/).length,
      charCount: content.length,
    };
  });

  // General statistics
  console.log("📊 BLOG STATISTICS\n");
  console.log(`📝 Total posts: ${posts.length}`);
  console.log(`⭐ Featured posts: ${posts.filter((p) => p.featured).length}`);
  console.log(
    `📅 Last post date: ${
      posts.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date ||
      "N/A"
    }`
  );

  // Statistics by category
  console.log("\n📂 POSTS BY CATEGORY:");
  const categoryStats = {};
  posts.forEach((post) => {
    const category = post.category || "No category";
    categoryStats[category] = (categoryStats[category] || 0) + 1;
  });

  Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} post${count > 1 ? "s" : ""}`);
    });

  // Tag statistics
  console.log("\n🏷️  MOST USED TAGS:");
  const tagStats = {};
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagStats[tag] = (tagStats[tag] || 0) + 1;
      });
    }
  });

  Object.entries(tagStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([tag, count]) => {
      console.log(`  #${tag}: ${count} use${count > 1 ? "s" : ""}`);
    });

  // Content statistics
  console.log("\n📏 CONTENT STATISTICS:");
  const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0);
  const avgWords = Math.round(totalWords / posts.length);
  const longestPost = posts.reduce(
    (max, post) => (post.wordCount > max.wordCount ? post : max),
    posts[0]
  );
  const shortestPost = posts.reduce(
    (min, post) => (post.wordCount < min.wordCount ? post : min),
    posts[0]
  );

  console.log(`  Total words: ${totalWords.toLocaleString()}`);
  console.log(`  Average per post: ${avgWords} words`);
  console.log(
    `  Longest post: "${longestPost.title}" (${longestPost.wordCount} words)`
  );
  console.log(
    `  Shortest post: "${shortestPost.title}" (${shortestPost.wordCount} words)`
  );

  // Posts by author
  console.log("\n👤 POSTS BY AUTHOR:");
  const authorStats = {};
  posts.forEach((post) => {
    const author = post.author || "Author not informed";
    authorStats[author] = (authorStats[author] || 0) + 1;
  });

  Object.entries(authorStats)
    .sort(([, a], [, b]) => b - a)
    .forEach(([author, count]) => {
      console.log(`  ${author}: ${count} post${count > 1 ? "s" : ""}`);
    });

  // Posts by month
  console.log("\n📅 POSTS BY MONTH:");
  const monthStats = {};
  posts.forEach((post) => {
    if (post.date) {
      const date = new Date(post.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      monthStats[month] = (monthStats[month] || 0) + 1;
    }
  });

  Object.entries(monthStats)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .forEach(([month, count]) => {
      console.log(`  ${month}: ${count} post${count > 1 ? "s" : ""}`);
    });

  // Quality check
  console.log("\n✅ QUALITY CHECK:");
  const issues = [];

  posts.forEach((post) => {
    // Check required fields
    if (!post.title) issues.push(`❌ ${post.filename}: Missing title`);
    if (!post.excerpt) issues.push(`❌ ${post.filename}: Missing excerpt`);
    if (!post.date) issues.push(`❌ ${post.filename}: Missing date`);
    if (!post.category) issues.push(`❌ ${post.filename}: Missing category`);

    // Check content quality
    if (post.wordCount < 100)
      issues.push(`⚠️  ${post.filename}: Too short (${post.wordCount} words)`);
    if (!post.tags || post.tags.length === 0)
      issues.push(`⚠️  ${post.filename}: No tags`);
    if (post.excerpt && post.excerpt.length > 200)
      issues.push(`⚠️  ${post.filename}: Excerpt too long`);
  });

  if (issues.length === 0) {
    console.log("  🎉 All posts are in order!");
  } else {
    issues.forEach((issue) => console.log(`  ${issue}`));
  }

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  if (posts.filter((p) => p.featured).length === 0) {
    console.log('  📌 Consider marking some posts as "featured"');
  }
  if (Object.keys(categoryStats).length < 3) {
    console.log("  📂 Consider diversifying categories");
  }
  if (avgWords < 300) {
    console.log("  📝 Posts could be more detailed (low word count average)");
  }
  if (Object.keys(tagStats).length < posts.length) {
    console.log("  🏷️  Add more tags for better organization");
  }

  console.log("\n🚀 CONTENT SUGGESTIONS:");
  const categories = Object.keys(categoryStats);
  const suggestions = [
    "Step-by-step tutorial about technology you master",
    "Retrospective of a project you worked on",
    "Productivity tips for developers",
    "Analysis of a tool you use daily",
    "Reflection on technology trends",
  ];

  suggestions.slice(0, 3).forEach((suggestion, i) => {
    console.log(`  ${i + 1}. ${suggestion}`);
  });

  console.log("\n📈 TO IMPROVE SEO:");
  const postsWithoutSEO = posts.filter((p) => !p.seo || !p.seo.metaDescription);
  if (postsWithoutSEO.length > 0) {
    console.log(
      `  📝 ${postsWithoutSEO.length} post${
        postsWithoutSEO.length > 1 ? "s" : ""
      } without SEO configured`
    );
  }

  const postsWithoutImages = posts.filter((p) => !p.image);
  if (postsWithoutImages.length > 0) {
    console.log(
      `  🖼️  ${postsWithoutImages.length} post${
        postsWithoutImages.length > 1 ? "s" : ""
      } without featured image`
    );
  }

  console.log("\n📊 Use this information to plan your next content!");
}

// Execute if called directly
if (require.main === module) {
  getBlogStats();
}

module.exports = { getBlogStats };
