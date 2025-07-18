const fs = require("node:fs");
const path = require("node:path");

// ===================================================================
// 🧪 STREAMING SYSTEM PERFORMANCE TESTING
// ===================================================================

/**
 * ✅ Simulates streaming system and measures performance
 */
async function testStreamingPerformance() {
  console.log("🧪 PERFORMANCE TEST - STREAMING SYSTEM\n");

  const postsDir = path.join(process.cwd(), "/src/posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts folder not found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
  console.log(`📁 Found ${files.length} markdown files\n`);

  // ✅ TEST 1: Sequential vs parallel reading
  await testSequentialVsParallel(files);
  console.log("");

  // ✅ TEST 2: Filter performance
  await testFilterPerformance(files);
  console.log("");

  // ✅ TEST 3: Memory usage
  await testMemoryUsage(files);
  console.log("");

  // ✅ TEST 4: Cache performance
  await testCachePerformance();
  console.log("");

  // ✅ TEST 5: Pagination
  await testPaginationPerformance(files);
}

/**
 * ✅ Sequential vs parallel reading test
 */
async function testSequentialVsParallel(files) {
  console.log("📖 TEST: Sequential vs Parallel Reading");

  const testFiles = files.slice(0, 10); // Test with 10 files
  const postsDir = path.join(process.cwd(), "/src/posts");

  // ✅ SEQUENTIAL READING
  const startSequential = performance.now();
  for (const file of testFiles) {
    const filePath = path.join(postsDir, file);
    fs.readFileSync(filePath, "utf8");
  }
  const endSequential = performance.now();
  const sequentialTime = endSequential - startSequential;

  // ✅ PARALLEL READING
  const startParallel = performance.now();
  await Promise.all(
    testFiles.map(async (file) => {
      const filePath = path.join(postsDir, file);
      return fs.promises.readFile(filePath, "utf8");
    })
  );
  const endParallel = performance.now();
  const parallelTime = endParallel - startParallel;

  // ✅ RESULTS
  console.log(`   📊 Sequential: ${sequentialTime.toFixed(2)}ms`);
  console.log(`   📊 Parallel: ${parallelTime.toFixed(2)}ms`);
  console.log(
    `   🚀 Improvement: ${(
      ((sequentialTime - parallelTime) / sequentialTime) *
      100
    ).toFixed(1)}%`
  );

  const winner = parallelTime < sequentialTime ? "Parallel" : "Sequential";
  console.log(`   🏆 Winner: ${winner}`);
}

/**
 * ✅ Filter performance test
 */
async function testFilterPerformance(files) {
  console.log("🔍 TEST: Filter Performance");

  const matter = require("gray-matter");
  const postsDir = path.join(process.cwd(), "/src/posts");

  // ✅ LOAD ALL POSTS
  const posts = [];
  for (const file of files) {
    try {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      if (data.title && data.category) {
        posts.push({
          title: data.title,
          category: data.category,
          tags: data.tags || [],
          featured: data.featured || false,
        });
      }
    } catch (error) {
      // Ignore files with errors
    }
  }

  console.log(`   📝 Posts loaded: ${posts.length}`);

  // ✅ CATEGORY FILTER TEST
  const startCategoryFilter = performance.now();
  const categoryFiltered = posts.filter((post) =>
    post.category.toLowerCase().includes("development")
  );
  const endCategoryFilter = performance.now();
  const categoryFilterTime = endCategoryFilter - startCategoryFilter;

  // ✅ TAG FILTER TEST
  const startTagFilter = performance.now();
  const tagFiltered = posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().includes("javascript"))
  );
  const endTagFilter = performance.now();
  const tagFilterTime = endTagFilter - startTagFilter;

  // ✅ COMBINED FILTER TEST
  const startCombinedFilter = performance.now();
  const combinedFiltered = posts.filter(
    (post) =>
      post.category.toLowerCase().includes("development") &&
      post.tags.some((tag) => tag.toLowerCase().includes("javascript")) &&
      post.featured === true
  );
  const endCombinedFilter = performance.now();
  const combinedFilterTime = endCombinedFilter - startCombinedFilter;

  // ✅ RESULTS
  console.log(
    `   📊 Category filter: ${categoryFilterTime.toFixed(2)}ms (${
      categoryFiltered.length
    } results)`
  );
  console.log(
    `   📊 Tag filter: ${tagFilterTime.toFixed(2)}ms (${
      tagFiltered.length
    } results)`
  );
  console.log(
    `   📊 Combined filter: ${combinedFilterTime.toFixed(2)}ms (${
      combinedFiltered.length
    } results)`
  );

  const avgFilterTime =
    (categoryFilterTime + tagFilterTime + combinedFilterTime) / 3;
  console.log(`   ⚡ Average filter time: ${avgFilterTime.toFixed(2)}ms`);
}

/**
 * ✅ Memory usage test
 */
async function testMemoryUsage(files) {
  console.log("💾 TEST: Memory Usage");

  const initialMemory = process.memoryUsage();
  console.log(
    `   📊 Initial memory: ${(initialMemory.heapUsed / 1024 / 1024).toFixed(
      2
    )}MB`
  );

  // ✅ SIMULATE LOADING MANY POSTS
  const matter = require("gray-matter");
  const postsDir = path.join(process.cwd(), "/src/posts");
  const posts = [];

  // Load all posts 5 times to simulate load
  for (let i = 0; i < 5; i++) {
    for (const file of files) {
      try {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);
        posts.push({ ...data, content });
      } catch (error) {
        // Ignore errors
      }
    }
  }

  const peakMemory = process.memoryUsage();
  console.log(
    `   📊 Peak memory: ${(peakMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`
  );
  console.log(`   📊 Posts in memory: ${posts.length}`);

  // ✅ FORCE GARBAGE COLLECTION
  if (global.gc) {
    global.gc();
  }

  const finalMemory = process.memoryUsage();
  console.log(
    `   📊 Memory after GC: ${(finalMemory.heapUsed / 1024 / 1024).toFixed(
      2
    )}MB`
  );

  const memoryIncrease =
    (finalMemory.heapUsed - initialMemory.heapUsed) / 1024 / 1024;
  console.log(`   📈 Memory increase: ${memoryIncrease.toFixed(2)}MB`);
}

/**
 * ✅ Cache performance test
 */
async function testCachePerformance() {
  console.log("🗄️  TEST: Cache Performance");

  // ✅ SIMULATE SIMPLE CACHE SYSTEM
  const cache = new Map();
  const CACHE_SIZE = 1000;
  const TEST_ITERATIONS = 10000;

  // ✅ TEST WITHOUT CACHE
  const startNoCache = performance.now();
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    const key = `key_${i % 100}`; // 100 different keys
    // Simulate expensive operation
    const value = `computed_value_${Math.random()}`;
  }
  const endNoCache = performance.now();
  const noCacheTime = endNoCache - startNoCache;

  // ✅ TEST WITH CACHE
  const startWithCache = performance.now();
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    const key = `key_${i % 100}`; // 100 different keys

    if (cache.has(key)) {
      // Cache hit
      cache.get(key);
    } else {
      // Cache miss - simulate expensive operation
      const value = `computed_value_${Math.random()}`;
      if (cache.size < CACHE_SIZE) {
        cache.set(key, value);
      }
    }
  }
  const endWithCache = performance.now();
  const withCacheTime = endWithCache - startWithCache;

  // ✅ CACHE STATISTICS
  const cacheHits = TEST_ITERATIONS - 100; // First 100 are cache misses
  const hitRate = (cacheHits / TEST_ITERATIONS) * 100;

  // ✅ RESULTS
  console.log(`   📊 Without cache: ${noCacheTime.toFixed(2)}ms`);
  console.log(`   📊 With cache: ${withCacheTime.toFixed(2)}ms`);
  console.log(`   📊 Cache hits: ${hitRate.toFixed(1)}%`);
  console.log(
    `   🚀 Improvement: ${(
      ((noCacheTime - withCacheTime) / noCacheTime) *
      100
    ).toFixed(1)}%`
  );
  console.log(`   💾 Cache size: ${cache.size} entries`);
}

/**
 * ✅ Pagination performance test
 */
async function testPaginationPerformance(files) {
  console.log("📄 TEST: Pagination Performance");

  const matter = require("gray-matter");
  const postsDir = path.join(process.cwd(), "/src/posts");

  // ✅ LOAD ALL POSTS
  const posts = [];
  for (const file of files) {
    try {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      if (data.title && data.date) {
        posts.push({
          title: data.title,
          date: data.date,
          category: data.category || "No category",
        });
      }
    } catch (error) {
      // Ignore files with errors
    }
  }

  // ✅ SORT POSTS BY DATE
  const startSort = performance.now();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const endSort = performance.now();
  const sortTime = endSort - startSort;

  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // ✅ PAGINATION TEST
  const startPagination = performance.now();
  const paginatedResults = [];

  for (let page = 1; page <= Math.min(totalPages, 10); page++) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pageData = posts.slice(start, end);
    paginatedResults.push({
      page,
      posts: pageData,
      total: posts.length,
      totalPages,
      hasMore: page < totalPages,
    });
  }

  const endPagination = performance.now();
  const paginationTime = endPagination - startPagination;

  // ✅ RESULTS
  console.log(`   📊 Total posts: ${posts.length}`);
  console.log(`   📊 Posts per page: ${postsPerPage}`);
  console.log(`   📊 Total pages: ${totalPages}`);
  console.log(`   📊 Sort time: ${sortTime.toFixed(2)}ms`);
  console.log(`   📊 Pagination time: ${paginationTime.toFixed(2)}ms`);
  console.log(`   📊 Pages tested: ${Math.min(totalPages, 10)}`);

  const avgTimePerPage = paginationTime / Math.min(totalPages, 10);
  console.log(`   ⚡ Average time per page: ${avgTimePerPage.toFixed(2)}ms`);
}

/**
 * ✅ General system benchmark
 */
async function runBenchmark() {
  console.log("🏁 GENERAL SYSTEM BENCHMARK\n");

  const results = {
    fileRead: await benchmarkFileRead(),
    jsonParsing: await benchmarkJsonParsing(),
    stringOperations: await benchmarkStringOperations(),
    arrayOperations: await benchmarkArrayOperations(),
  };

  console.log("\n📊 BENCHMARK SUMMARY:");
  Object.entries(results).forEach(([test, time]) => {
    console.log(`   ${test}: ${time.toFixed(2)}ms`);
  });

  const totalTime = Object.values(results).reduce((sum, time) => sum + time, 0);
  console.log(`   🏆 Total time: ${totalTime.toFixed(2)}ms`);

  // ✅ PERFORMANCE CLASSIFICATION
  if (totalTime < 50) {
    console.log("   🚀 Performance: EXCELLENT");
  } else if (totalTime < 100) {
    console.log("   ⚡ Performance: GOOD");
  } else if (totalTime < 200) {
    console.log("   ⚠️  Performance: AVERAGE");
  } else {
    console.log("   🐌 Performance: NEEDS OPTIMIZATION");
  }
}

async function benchmarkFileRead() {
  const testData = "test data ".repeat(1000);
  const tempFile = path.join(process.cwd(), "temp-test.txt");

  fs.writeFileSync(tempFile, testData);

  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    fs.readFileSync(tempFile, "utf8");
  }
  const end = performance.now();

  fs.unlinkSync(tempFile);
  return end - start;
}

async function benchmarkJsonParsing() {
  const testObj = {
    title: "Test Post",
    content: "Content ".repeat(100),
    tags: ["tag1", "tag2", "tag3"],
    metadata: { author: "Test Author", date: new Date() },
  };
  const testJson = JSON.stringify(testObj);

  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    JSON.parse(testJson);
  }
  const end = performance.now();

  return end - start;
}

async function benchmarkStringOperations() {
  const testString = "Lorem ipsum dolor sit amet ".repeat(100);

  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    testString.toLowerCase().includes("lorem");
    testString.split(" ").length;
    testString.replace(/lorem/gi, "LOREM");
  }
  const end = performance.now();

  return end - start;
}

async function benchmarkArrayOperations() {
  const testArray = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Post ${i}`,
    category: `Category ${i % 10}`,
    tags: [`tag${i % 5}`, `tag${i % 3}`],
  }));

  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    testArray.filter((item) => item.category.includes("5"));
    testArray.map((item) => item.title);
    testArray.sort((a, b) => a.id - b.id);
  }
  const end = performance.now();

  return end - start;
}

/**
 * ✅ Main menu
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log("🔬 PERFORMANCE TESTING SYSTEM\n");

  switch (command) {
    case "streaming":
      await testStreamingPerformance();
      break;

    case "benchmark":
      await runBenchmark();
      break;

    case "all":
      await testStreamingPerformance();
      console.log("\n" + "=".repeat(60) + "\n");
      await runBenchmark();
      break;

    default:
      console.log("Available commands:");
      console.log("  streaming  - Test streaming system performance");
      console.log("  benchmark  - Run general benchmark");
      console.log("  all        - Run all tests");
      console.log("\nExample: node scripts/performance-test.js streaming");
      break;
  }

  console.log("\n✅ Tests completed!");
}

// ✅ EXECUTION
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testStreamingPerformance,
  runBenchmark,
};
