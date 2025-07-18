const fs = require("node:fs");
const path = require("node:path");

const readline = require("node:readline");

// Dynamic import of sharp
let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  console.log(
    "⚠️  Sharp not found. For image optimization, install with: npm install sharp"
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove double hyphens
    .replace(/^-|-$/g, ""); // Remove hyphens from start and end
}

// ✅ OPTIMIZED PREDEFINED CATEGORIES
const predefinedCategories = [
  {
    name: "Development",
    color: "#10b981",
    description: "Programming and software development",
  },
  {
    name: "JavaScript",
    color: "#f7df1e",
    description: "JavaScript, ES6+, JS frameworks",
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    description: "TypeScript, types, configuration",
  },
  {
    name: "React",
    color: "#61dafb",
    description: "React.js, hooks, components",
  },
  {
    name: "Next.js",
    color: "#6366f1",
    description: "Next.js, SSR, SSG, App Router",
  },
  {
    name: "Node.js",
    color: "#68a063",
    description: "Backend with Node.js, APIs",
  },
  {
    name: "CSS",
    color: "#1572b6",
    description: "CSS, styles, layouts",
  },
  {
    name: "Tutorial",
    color: "#14b8a6",
    description: "Step-by-step tutorials",
  },
  {
    name: "Career",
    color: "#ef4444",
    description: "Career in technology",
  },
  {
    name: "DevOps",
    color: "#ff6b35",
    description: "DevOps, CI/CD, infrastructure",
  },
  {
    name: "Tips",
    color: "#f59e0b",
    description: "Quick tips and productivity",
  },
];

// ✅ OPTIMIZED PREDEFINED TAGS
const predefinedTags = [
  { name: "javascript", color: "#f7df1e" },
  { name: "typescript", color: "#3178c6" },
  { name: "react", color: "#61dafb" },
  { name: "nextjs", color: "#6366f1" },
  { name: "nodejs", color: "#68a063" },
  { name: "css", color: "#1572b6" },
  { name: "html", color: "#e34f26" },
  { name: "tutorial", color: "#14b8a6" },
  { name: "development", color: "#10b981" },
  { name: "career", color: "#ef4444" },
  { name: "tips", color: "#f59e0b" },
  { name: "productivity", color: "#ff9800" },
  { name: "api", color: "#ff6b35" },
  { name: "performance", color: "#4caf50" },
  { name: "seo", color: "#673ab7" },
  { name: "design", color: "#ff6b6b" },
];

const DEFAULT_COLOR = "#6366f1";

// ✅ CORRECTION: Optimized image management
async function handleImageUpload(slug) {
  console.log("\n🖼️  Image configuration:");
  console.log("1. Upload a local image (will be optimized)");
  console.log("2. Use existing image path");
  console.log("3. Use external URL");
  console.log("4. Add later (no image for now)");

  const option = await question("\nChoose an option (1-4): ");

  switch (option) {
    case "1":
      return await uploadLocalImage(slug);
    case "2":
      return await useExistingImage();
    case "3":
      return await useExternalUrl();
    case "4":
    default:
      // ✅ CORRECTION: Don't return path when there's no image
      console.log(
        "✅ Post will be created without image. You can add it later."
      );
      return null; // Return null instead of a specific path
  }
}

async function uploadLocalImage(slug) {
  const imagePath = await question("📁 Local image path: ");

  if (!isValidImageFile(imagePath)) {
    console.log("❌ File not found or invalid format.");
    console.log("💡 Accepted formats: .jpg, .jpeg, .png, .webp, .gif");

    const retry = await question("Try again? (y/N): ");
    if (retry.toLowerCase() === "y" || retry.toLowerCase() === "yes") {
      return await uploadLocalImage(slug);
    }
    return null;
  }

  try {
    const optimizedPath = await optimizeAndSaveImage(imagePath, slug);
    return optimizedPath;
  } catch (error) {
    console.log(`❌ ${error.message}`);
    return null;
  }
}

async function useExistingImage() {
  const imagePath = await question("📷 Existing image path: ");

  if (imagePath.startsWith("/")) {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found at: public${imagePath}`);
      console.log(
        "💡 The image will be referenced, but make sure to add it later."
      );
    }
  }

  return imagePath;
}

async function useExternalUrl() {
  const url = await question("🌐 Image URL: ");

  try {
    new URL(url);
    return url;
  } catch {
    console.log("❌ Invalid URL.");
    const retry = await question("Try again? (y/N): ");
    if (retry.toLowerCase() === "y" || retry.toLowerCase() === "yes") {
      return await useExternalUrl();
    }
    return null;
  }
}

function isValidImageFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = path.extname(filePath).toLowerCase();
  return validExtensions.includes(ext);
}

async function optimizeAndSaveImage(sourcePath, targetFileName) {
  if (!sharp) {
    throw new Error("Sharp is not installed. Run: npm install sharp");
  }

  try {
    const targetDir = path.join(process.cwd(), "public", "static", "posts");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const fileNameWithoutExt = path.parse(targetFileName).name;
    const targetPath = path.join(targetDir, `${fileNameWithoutExt}.jpg`);

    console.log("🔄 Optimizing image...");

    await sharp(sourcePath)
      .resize(1200, 630, {
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(targetPath);

    const originalStats = fs.statSync(sourcePath);
    const optimizedStats = fs.statSync(targetPath);
    const reduction = (
      ((originalStats.size - optimizedStats.size) / originalStats.size) *
      100
    ).toFixed(1);

    console.log(`✅ Image optimized successfully!`);
    console.log(`📏 Resized to: 1200x630px`);
    console.log(
      `💾 Original size: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB`
    );
    console.log(
      `💾 Optimized size: ${(optimizedStats.size / 1024 / 1024).toFixed(2)}MB`
    );
    console.log(`📉 Reduction: ${reduction}%`);

    return `/static/posts/${fileNameWithoutExt}.jpg`;
  } catch (error) {
    throw new Error(`Error optimizing image: ${error.message}`);
  }
}

async function selectCategory() {
  console.log("\n📂 Select a category:");
  console.log("0. 🆕 Create new category");

  predefinedCategories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.name} - ${cat.description}`);
  });

  let selectedCategory = null;

  while (!selectedCategory) {
    const input = await question("\n🏷️  Category number (required): ");
    const categoryIndex = parseInt(input);

    if (categoryIndex === 0) {
      const newCategoryName = await question("📝 New category name: ");
      if (newCategoryName.trim()) {
        selectedCategory = {
          name: newCategoryName.trim(),
          color: DEFAULT_COLOR,
          isNew: true,
        };
        console.log(`✅ New category created: "${selectedCategory.name}"`);
      } else {
        console.log("❌ Category name cannot be empty.");
      }
    } else if (
      categoryIndex >= 1 &&
      categoryIndex <= predefinedCategories.length
    ) {
      selectedCategory = predefinedCategories[categoryIndex - 1];
      console.log(`✅ Category selected: "${selectedCategory.name}"`);
    } else {
      console.log("❌ Choose a valid category.");
    }
  }

  return selectedCategory;
}

async function selectTags() {
  console.log("\n🏷️  Tags configuration:");
  console.log("📋 Available tags:");

  const tagsPerRow = 3;
  for (let i = 0; i < predefinedTags.length; i += tagsPerRow) {
    const row = predefinedTags.slice(i, i + tagsPerRow);
    const formattedRow = row
      .map((tag, index) => `${i + index + 1}. ${tag.name}`.padEnd(20))
      .join("");
    console.log(formattedRow);
  }

  console.log("\n💡 Instructions:");
  console.log("- Enter tag numbers separated by comma (e.g. 1,3,5)");
  console.log("- Or enter custom tag names separated by comma");
  console.log("- Or combine both (e.g. 1,3,my-tag,another-tag)");

  const tagsInput = await question("\n🔖 Tags (required): ");

  if (!tagsInput.trim()) {
    console.log("❌ At least one tag is required.");
    return await selectTags();
  }

  const selectedTags = [];
  const inputs = tagsInput.split(",").map((input) => input.trim());

  inputs.forEach((input) => {
    const numericInput = parseInt(input);

    if (
      !isNaN(numericInput) &&
      numericInput >= 1 &&
      numericInput <= predefinedTags.length
    ) {
      const tag = predefinedTags[numericInput - 1];
      selectedTags.push({
        name: tag.name,
        color: tag.color,
        isPredefined: true,
      });
    } else if (input.length > 0) {
      selectedTags.push({
        name: input.toLowerCase(),
        color: DEFAULT_COLOR,
        isNew: true,
      });
    }
  });

  if (selectedTags.length === 0) {
    console.log("❌ No valid tags selected.");
    return await selectTags();
  }

  console.log("\n✅ Selected tags:");
  selectedTags.forEach((tag) => {
    const status = tag.isPredefined ? "(predefined)" : "(new)";
    console.log(`  - ${tag.name} ${status}`);
  });

  return selectedTags.map((tag) => tag.name);
}

async function getReadingTime(content) {
  console.log("\n⏱️  Reading Time:");
  console.log("1. Calculate automatically based on content");
  console.log("2. Set manually");

  const option = await question("Choose an option (1-2): ");

  if (option === "2") {
    let manualTime;
    while (!manualTime || isNaN(manualTime) || manualTime < 1) {
      const input = await question("📖 Reading time in minutes (number): ");
      manualTime = parseInt(input);

      if (!manualTime || isNaN(manualTime) || manualTime < 1) {
        console.log("❌ Enter a valid number greater than 0.");
      }
    }
    console.log(
      `✅ Reading time set: ${manualTime} minute${manualTime > 1 ? "s" : ""}`
    );
    return manualTime;
  } else {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const calculatedTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    console.log(
      `✅ Reading time calculated: ${calculatedTime} minute${
        calculatedTime > 1 ? "s" : ""
      } (based on ${wordCount} words)`
    );
    return calculatedTime;
  }
}

// ✅ OPTIMIZED AND CLEAN TEMPLATE
function generateOptimizedFrontmatter(data) {
  const {
    title,
    excerpt,
    category,
    tags,
    featured,
    author,
    image,
    metaTitle,
    metaDescription,
    keywords,
    readTime,
  } = data;

  const currentDate = new Date().toISOString().split("T")[0];

  // ✅ MUCH CLEANER TEMPLATE
  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${currentDate}"
category: "${category}"
tags: [${tags
    .split(",")
    .map((tag) => `"${tag.trim()}"`)
    .join(", ")}]
featured: ${featured}${image ? `\nimage: "${image}"` : ""}
author: "${author}"
readTime: ${readTime}
seo:
  metaTitle: "${metaTitle || title}"
  metaDescription: "${metaDescription || excerpt}"
  keywords: [${keywords
    .split(",")
    .map((kw) => `"${kw.trim()}"`)
    .join(", ")}]
---

# ${title}

${excerpt}

## Introduction

Write your introduction here...

## Content

### Section 1

Content of the first section...

### Section 2

Content of the second section...

## Code

\`\`\`javascript
// Code example
function example() {
  console.log("Hello, World!");
}
\`\`\`

## Conclusion

Write your conclusion here...

---

*Liked the post? Share it!* 🚀
`;

  return frontmatter;
}

async function getRequiredInput(prompt, validator = null, minLength = 1) {
  let input = "";
  while (!input || input.length < minLength) {
    input = (await question(prompt)).trim();

    if (!input || input.length < minLength) {
      console.log(
        `❌ This field is required${
          minLength > 1 ? ` (min. ${minLength} characters)` : ""
        }.`
      );
      continue;
    }

    if (validator && !validator(input)) {
      input = "";
      continue;
    }
  }
  return input;
}

async function createPost() {
  console.log("🚀 Optimized Post Generator - Markdown Blog\n");

  try {
    const title = await getRequiredInput("📝 Post title (required): ");

    const excerpt = await getRequiredInput(
      "📋 Summary/excerpt (min. 50 characters): ",
      null,
      50
    );

    const selectedCategory = await selectCategory();
    const selectedTags = await selectTags();

    let featuredInput;
    let featured;
    while (featured === undefined) {
      featuredInput = await question("⭐ Featured post? (y/n): ");
      if (
        featuredInput.toLowerCase() === "y" ||
        featuredInput.toLowerCase() === "yes"
      ) {
        featured = true;
      } else if (
        featuredInput.toLowerCase() === "n" ||
        featuredInput.toLowerCase() === "no"
      ) {
        featured = false;
      } else {
        console.log('❌ Type only "y" for yes or "n" for no.');
      }
    }

    const author =
      (await question('👤 Author (Enter for "Gabriel Mesquita"): ')) ||
      "Gabriel Mesquita";

    const slug = slugify(title);

    // ✅ CORRECTION: Optimized image management
    const image = await handleImageUpload(slug);

    const tempContent = `${title} ${excerpt}`.repeat(5); // Smaller content for calculation
    const readTime = await getReadingTime(tempContent);

    console.log("\n🔍 SEO Settings:");
    const metaTitle = await question(
      "📰 Meta title (Enter to use post title): "
    );
    const metaDescription = await question(
      "📝 Meta description (Enter to use excerpt): "
    );
    const keywords = await getRequiredInput("🔑 Keywords (comma separated): ");

    const postData = {
      title,
      excerpt,
      category: selectedCategory.name,
      tags: selectedTags.join(", "),
      featured,
      author,
      image,
      readTime,
      metaTitle,
      metaDescription,
      keywords,
    };

    console.log("\n📋 Post summary:");
    console.log(`📝 Title: ${title}`);
    console.log(`📄 Excerpt: ${excerpt.substring(0, 50)}...`);
    console.log(
      `📂 Category: ${selectedCategory.name} ${
        selectedCategory.isNew ? "(new)" : "(existing)"
      }`
    );
    console.log(`🔖 Tags: ${selectedTags.join(", ")}`);
    console.log(`⭐ Featured: ${featured ? "Yes" : "No"}`);
    console.log(`👤 Author: ${author}`);
    console.log(`🖼️  Image: ${image || "None (add later)"}`);
    console.log(
      `⏱️  Reading time: ${readTime} minute${readTime > 1 ? "s" : ""}`
    );

    const confirm = await question("\n✅ Confirm post creation? (y/N): ");
    if (confirm.toLowerCase() !== "y" && confirm.toLowerCase() !== "yes") {
      console.log("❌ Creation cancelled.");
      return;
    }

    // ✅ GENERATE OPTIMIZED FRONTMATTER
    const frontmatter = generateOptimizedFrontmatter(postData);
    const postsDir = path.join(process.cwd(), "/src/posts");

    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const filename = `${slug}.md`;
    const filepath = path.join(postsDir, filename);

    if (fs.existsSync(filepath)) {
      const overwrite = await question(
        `\n⚠️  File ${filename} already exists. Overwrite? (y/N): `
      );
      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        console.log("❌ Operation cancelled.");
        return;
      }
    }

    fs.writeFileSync(filepath, frontmatter, "utf8");

    console.log(`\n✅ Post created successfully!`);
    console.log(`📁 File: src/posts/${filename}`);
    console.log(`🌐 URL: /blog/${slug}`);

    if (image && image.startsWith("/static/posts/")) {
      console.log(`\n🖼️  Image saved at: public${image}`);
    } else if (image && image.startsWith("/") && !image.startsWith("http")) {
      console.log(`\n📷 Check if the image exists at: public${image}`);
    } else if (!image) {
      console.log(`\n📷 No image configured. Add later if necessary.`);
    }

    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit content in src/posts/${filename}`);
    console.log(`2. Run 'npm run dev' to view`);
    console.log(`3. Commit your changes to git`);

    if (selectedCategory.isNew) {
      console.log(
        `\n🎨 New category "${selectedCategory.name}" created with default color (purple)`
      );
    }

    const newTags = selectedTags.filter(
      (tag) => !predefinedTags.some((predefined) => predefined.name === tag)
    );

    if (newTags.length > 0) {
      console.log(
        `\n🏷️  New tags created with default color (purple): ${newTags.join(
          ", "
        )}`
      );
    }
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  createPost();
}

module.exports = { createPost, slugify, generateOptimizedFrontmatter };
