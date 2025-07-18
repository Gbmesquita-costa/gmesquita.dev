export interface TagColorConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface ColorInfo {
  color: string;
  isPredefined: boolean;
  category?: string;
  description?: string;
}

export interface TagWithColor {
  name: string;
  color: string;
  isPredefined: boolean;
  count?: number;
}

export interface ColorTheme {
  light: string;
  dark: string;
  name: string;
}

// ===================================================================
// 🎨 FULL COLOR MAPPING
// ===================================================================

/**
 * 🎯 MAIN TAGS MAPPING
 * Optimized colors to work perfectly in dark and light themes
 */
const TAG_COLORS: Record<string, string> = {
  // === 🚀 FRONTEND TECHNOLOGIES ===
  javascript: "#f7df1e", // Official JavaScript yellow
  typescript: "#3178c6", // Official TypeScript blue
  react: "#61dafb", // Official React cyan
  nextjs: "#6366f1", // Vibrant purple (changed from black)
  "next.js": "#6366f1", // Alias with dot
  vue: "#4fc08d", // Official Vue green
  vuejs: "#4fc08d", // Alias
  angular: "#dd1b16", // Official Angular red
  svelte: "#ff3e00", // Official Svelte orange
  solid: "#2c4f7c", // SolidJS blue
  astro: "#ff5d01", // Astro orange
  remix: "#000000", // Remix black
  gatsby: "#663399", // Gatsby purple
  nuxt: "#00dc82", // Nuxt green
  vite: "#646cff", // Vite blue
  webpack: "#8dd6f9", // Webpack light blue
  rollup: "#ec4a3f", // Rollup red
  parcel: "#e7a93f", // Parcel yellow
  esbuild: "#ffcf00", // ESBuild yellow

  // === 🔧 BACKEND TECHNOLOGIES ===
  nodejs: "#68a063", // Node.js green (darker)
  "node.js": "#68a063", // Alias with dot
  python: "#3776ab", // Official Python blue
  java: "#ed8b00", // Java orange
  kotlin: "#7f52ff", // Kotlin purple
  scala: "#dc322f", // Scala red
  csharp: "#239120", // Official C# green
  "c#": "#239120", // Alias
  cpp: "#00599c", // C++ blue
  "c++": "#00599c", // Alias
  c: "#a8b9cc", // C gray
  php: "#777bb4", // Official PHP purple
  golang: "#00add8", // Official Go cyan
  go: "#00add8", // Alias
  rust: "#ce422b", // Official Rust red
  ruby: "#cc342d", // Ruby red
  elixir: "#6e4a7e", // Elixir purple
  erlang: "#a90533", // Erlang red
  haskell: "#5d4f85", // Haskell purple
  clojure: "#5881d8", // Clojure blue
  lua: "#2c2d72", // Lua dark blue
  perl: "#39457e", // Perl blue
  r: "#276dc3", // R blue
  matlab: "#e16737", // MATLAB orange
  swift: "#fa7343", // Swift orange
  dart: "#0175c2", // Dart blue

  // === 🎨 WEB TECHNOLOGIES ===
  html: "#e34f26", // Official HTML orange
  html5: "#e34f26", // Alias
  css: "#1572b6", // Official CSS blue
  css3: "#1572b6", // Alias
  sass: "#cc6699", // Official Sass pink
  scss: "#cc6699", // Alias
  less: "#1d365d", // Less dark blue
  stylus: "#ff6347", // Stylus tomato
  tailwind: "#06b6d4", // Official Tailwind cyan
  tailwindcss: "#06b6d4", // Alias
  bootstrap: "#7952b3", // Official Bootstrap purple
  bulma: "#00d1b2", // Bulma teal
  foundation: "#1779ba", // Foundation blue
  materialize: "#ee6e73", // Materialize pink
  semantic: "#35bdb2", // Semantic UI teal
  antd: "#1890ff", // Ant Design blue
  "ant-design": "#1890ff", // Alias
  chakra: "#319795", // Chakra UI teal
  "chakra-ui": "#319795", // Alias
  mui: "#007fff", // Material-UI blue
  "material-ui": "#007fff", // Alias

  // === 🗃️ DATABASES ===
  mysql: "#4479a1", // Official MySQL blue
  postgresql: "#336791", // Official PostgreSQL blue
  postgres: "#336791", // Alias
  mongodb: "#47a248", // Official MongoDB green
  mongo: "#47a248", // Alias
  redis: "#dc382d", // Official Redis red
  sqlite: "#003b57", // SQLite dark blue
  cassandra: "#1287b1", // Cassandra blue
  elasticsearch: "#005571", // Elasticsearch dark blue
  oracle: "#f80000", // Oracle red
  sqlserver: "#cc2927", // SQL Server red
  mariadb: "#003545", // MariaDB dark blue
  firebase: "#ff9800", // Firebase orange (changed from yellow)
  supabase: "#3ecf8e", // Supabase green
  planetscale: "#000000", // PlanetScale black
  fauna: "#3a1ab1", // Fauna purple
  database: "#4479a1", // Generic blue

  // === ☁️ CLOUD & DEVOPS ===
  aws: "#ff9900", // Official AWS orange
  azure: "#0078d4", // Official Azure blue
  gcp: "#4285f4", // Google Cloud blue
  "google-cloud": "#4285f4", // Alias
  docker: "#2496ed", // Official Docker blue
  kubernetes: "#326ce5", // Official Kubernetes blue
  k8s: "#326ce5", // Alias
  openshift: "#ee0000", // OpenShift red
  helm: "#0f1689", // Helm blue
  terraform: "#623ce4", // Terraform purple
  ansible: "#ee0000", // Ansible red
  puppet: "#ffae1a", // Puppet orange
  chef: "#f09820", // Chef orange
  vagrant: "#1563ff", // Vagrant blue
  vercel: "#6366f1", // Purple (changed from black)
  netlify: "#00c7b7", // Official Netlify teal
  heroku: "#430098", // Heroku purple
  railway: "#0b0d0e", // Railway black
  fly: "#8b5cf6", // Fly.io purple
  cloudflare: "#f38020", // Cloudflare orange
  digitalocean: "#0080ff", // DigitalOcean blue
  linode: "#00a95c", // Linode green
  vultr: "#007bfc", // Vultr blue
  devops: "#ff6b35", // Vibrant DevOps orange

  // === 📂 CONTENT CATEGORIES ===
  tecnologia: "#6366f1", // Vibrant purple
  tutorial: "#14b8a6", // Emerald green/Teal
  desenvolvimento: "#10b981", // Emerald green
  carreira: "#ef4444", // Red
  dicas: "#f59e0b", // Yellow/orange
  reflexões: "#8b5cf6", // Light purple
  reflexoes: "#8b5cf6", // Without accent
  noticias: "#ef4444", // Red
  notícias: "#ef4444", // With accent
  review: "#14b8a6", // Teal
  analise: "#6366f1", // Purple
  análise: "#6366f1", // With accent
  opinion: "#8b5cf6", // Light purple
  opinião: "#8b5cf6", // With accent
  guide: "#10b981", // Green
  guia: "#10b981", // Green
  howto: "#14b8a6", // Teal
  "how-to": "#14b8a6", // With hyphen
  tips: "#f59e0b", // Yellow
  tricks: "#f97316", // Orange
  hacks: "#ef4444", // Red
  best: "#10b981", // Green
  "best-practices": "#10b981", // Green

  // === 🎯 SPECIFIC TOPICS ===
  design: "#ff6b6b", // Coral
  ux: "#9c27b0", // UX purple
  ui: "#e91e63", // UI pink
  "user-experience": "#9c27b0", // Alias
  "user-interface": "#e91e63", // Alias
  frontend: "#61dafb", // Cyan
  backend: "#68a063", // Green
  fullstack: "#6366f1", // Purple
  "full-stack": "#6366f1", // With hyphen
  performance: "#4caf50", // Performance green
  optimization: "#4caf50", // Green
  otimização: "#4caf50", // With accent
  otimizacao: "#4caf50", // Without accent
  security: "#f44336", // Security red
  segurança: "#f44336", // With accent
  seguranca: "#f44336", // Without accent
  seo: "#673ab7", // SEO purple
  accessibility: "#ff9800", // Accessibility orange
  acessibilidade: "#ff9800", // With accent
  mobile: "#795548", // Mobile brown
  desktop: "#607d8b", // Grayish blue
  web: "#009688", // Web teal
  responsive: "#2196f3", // Responsive blue
  pwa: "#5a0fc8", // PWA purple
  spa: "#42a5f5", // SPA blue
  ssr: "#1565c0", // SSR dark blue
  ssg: "#1976d2", // SSG blue
  jamstack: "#f0047f", // JAMstack pink
  microservices: "#6366f1", // Purple
  monolith: "#795548", // Brown
  api: "#ff6b35", // API orange
  rest: "#25d366", // REST green
  graphql: "#e10098", // Official GraphQL pink
  grpc: "#244c5a", // gRPC dark blue
  soap: "#1976d2", // SOAP blue
  websocket: "#010101", // WebSocket black
  sse: "#ff5722", // SSE orange

  // === 🧠 SOFT SKILLS ===
  produtividade: "#ff9800", // Orange
  productivity: "#ff9800", // English
  comunicacao: "#2196f3", // Blue
  communication: "#2196f3", // English
  lideranca: "#9c27b0", // Purple
  leadership: "#9c27b0", // English
  gestao: "#795548", // Brown
  management: "#795548", // English
  teamwork: "#4caf50", // Green
  collaboration: "#00bcd4", // Cyan
  mentorship: "#673ab7", // Purple
  mentoria: "#673ab7", // Portuguese
  networking: "#ff5722", // Orange
  presentation: "#e91e63", // Pink
  apresentação: "#e91e63", // With accent
  apresentacao: "#e91e63", // Without accent

  // === 🛠️ TOOLS ===
  vscode: "#007acc", // Official VS Code blue
  "visual-studio": "#5c2d91", // Visual Studio purple
  atom: "#66595c", // Atom gray
  sublime: "#ff9800", // Sublime orange
  vim: "#019733", // Vim green
  neovim: "#57a143", // Neovim green
  emacs: "#7f5ab6", // Emacs purple
  intellij: "#000000", // IntelliJ black
  webstorm: "#000000", // WebStorm black
  pycharm: "#000000", // PyCharm black
  eclipse: "#2c2255", // Eclipse purple
  xcode: "#1575f9", // Xcode blue
  androidstudio: "#3ddc84", // Android Studio green
  git: "#f05032", // Official Git red
  github: "#6366f1", // Purple (changed from black)
  gitlab: "#fc6d26", // Official GitLab orange
  bitbucket: "#0052cc", // Bitbucket blue
  svn: "#809cc9", // SVN blue
  mercurial: "#999999", // Mercurial gray
  figma: "#f24e1e", // Official Figma orange
  sketch: "#f7b500", // Sketch yellow
  adobe: "#ff0000", // Adobe red
  photoshop: "#31a8ff", // Photoshop blue
  illustrator: "#ff9a00", // Illustrator orange
  xd: "#ff61f6", // Adobe XD pink
  invision: "#ff3366", // InVision pink
  zeplin: "#fdbd39", // Zeplin yellow
  principle: "#000000", // Principle black
  framer: "#0055ff", // Framer blue
  protopie: "#77d9f7", // ProtoPie light blue

  // === 🧪 FRAMEWORKS & LIBRARIES ===
  express: "#68a063", // Green (changed from black)
  expressjs: "#68a063", // Alias
  fastify: "#000000", // Fastify black
  koa: "#33333d", // Koa dark gray
  nestjs: "#e0234e", // Official NestJS red
  fastapi: "#009688", // FastAPI teal
  django: "#0c4b33", // Django dark green
  flask: "#6366f1", // Purple (changed from black)
  laravel: "#ff2d20", // Official Laravel red
  symfony: "#000000", // Symfony black
  rails: "#cc0000", // Rails red
  sinatra: "#000000", // Sinatra black
  spring: "#6db33f", // Spring green
  hibernate: "#59666c", // Hibernate gray
  struts: "#b8860b", // Struts gold
  gin: "#00add8", // Gin cyan (Go)
  fiber: "#00add8", // Fiber cyan (Go)
  echo: "#00add8", // Echo cyan (Go)
  actix: "#ce422b", // Actix red (Rust)
  rocket: "#ce422b", // Rocket red (Rust)
  phoenix: "#fd4f00", // Phoenix orange (Elixir)
  ecto: "#6e4a7e", // Ecto purple (Elixir)

  // === 🧪 TESTING ===
  jest: "#c21325", // Official Jest red
  mocha: "#8d6748", // Mocha brown
  chai: "#a30701", // Chai red
  jasmine: "#8a4182", // Jasmine purple
  karma: "#56c5a8", // Karma green
  protractor: "#e23237", // Protractor red
  selenium: "#43b02a", // Selenium green
  cypress: "#69d3a7", // Cypress light green
  playwright: "#2ecc40", // Playwright green
  puppeteer: "#40b5a4", // Puppeteer teal
  webdriver: "#4f8a10", // WebDriver green
  testing: "#4caf50", // Testing green
  unittest: "#4caf50", // Green
  integration: "#2196f3", // Blue
  e2e: "#ff9800", // Orange
  tdd: "#f44336", // Red
  bdd: "#9c27b0", // Purple
  mock: "#607d8b", // Gray
  stub: "#795548", // Brown
  spy: "#ff5722", // Orange

  // === 📦 PACKAGE MANAGERS ===
  npm: "#cb3837", // Official npm red
  yarn: "#2c8ebb", // Official Yarn blue
  pnpm: "#f69220", // pnpm orange
  bun: "#fbf0df", // Bun cream
  pip: "#3776ab", // pip blue (Python)
  conda: "#44a833", // Conda green
  composer: "#885630", // Composer brown (PHP)
  bundler: "#cc342d", // Bundler red (Ruby)
  gradle: "#02303a", // Gradle dark blue
  maven: "#c71a36", // Maven red
  sbt: "#cc0000", // SBT red (Scala)
  cargo: "#ce422b", // Cargo red (Rust)
  nuget: "#004880", // NuGet blue (.NET)
  cocoapods: "#ee3322", // CocoaPods red
  carthage: "#3498db", // Carthage blue

  // === 🔧 BUILD TOOLS ===
  babel: "#f9dc3e", // Babel yellow
  eslint: "#4b32c3", // ESLint purple
  prettier: "#f7b93e", // Prettier yellow
  tslint: "#3178c6", // TSLint blue
  stylelint: "#263238", // Stylelint gray
  commitlint: "#000000", // Commitlint black
  husky: "#dd0063", // Husky pink
  "lint-staged": "#4b32c3", // Purple
  editorconfig: "#fefefe", // EditorConfig white
  browserslist: "#ffd439", // Browserslist yellow
  autoprefixer: "#dd3735", // Autoprefixer red
  postcss: "#dd3a0a", // PostCSS red
  cssnano: "#faae40", // CSSnano yellow
  purgecss: "#1a202c", // PurgeCSS gray
  grunt: "#fba919", // Grunt orange
  gulp: "#cf4647", // Gulp red
  brunch: "#f7c33a", // Brunch yellow

  // === 📊 ANALYTICS & MONITORING ===
  googleanalytics: "#e37400", // Google Analytics orange
  "google-analytics": "#e37400", // Alias
  mixpanel: "#a086ec", // Mixpanel purple
  amplitude: "#2f5eb3", // Amplitude blue
  segment: "#52bd94", // Segment green
  hotjar: "#fd3a5c", // Hotjar pink
  fullstory: "#1e1e1e", // FullStory gray
  logrocket: "#764abc", // LogRocket purple
  sentry: "#362d59", // Sentry dark purple
  rollbar: "#ff6600", // Rollbar orange
  bugsnag: "#4949e7", // Bugsnag blue
  datadog: "#632ca6", // Datadog purple
  newrelic: "#008c99", // New Relic teal
  splunk: "#000000", // Splunk black
  elastic: "#005571", // Elastic blue
  grafana: "#f46800", // Grafana orange
  prometheus: "#e6522c", // Prometheus orange
  jaeger: "#60a5fa", // Jaeger blue
  zipkin: "#6db33f", // Zipkin green

  // === 🔒 SECURITY ===
  oauth: "#000000", // OAuth black
  jwt: "#000000", // JWT black
  passport: "#34e27a", // Passport green
  auth0: "#eb5424", // Auth0 orange
  okta: "#007dc1", // Okta blue
  keycloak: "#4d4d4d", // Keycloak gray
  ldap: "#1f497d", // LDAP blue
  saml: "#005a9c", // SAML blue
  openid: "#f78c40", // OpenID orange
  https: "#4caf50", // HTTPS green
  ssl: "#4caf50", // SSL green
  tls: "#4caf50", // TLS green
  csrf: "#f44336", // CSRF red
  xss: "#f44336", // XSS red
  sql: "#4479a1", // SQL blue (for injection)
  encryption: "#9c27b0", // Purple
  hashing: "#673ab7", // Purple
  bcrypt: "#000000", // bcrypt black
  argon2: "#6366f1", // Argon2 purple
  scrypt: "#795548", // scrypt brown

  // === 🌐 PROTOCOLS & STANDARDS ===
  http: "#005a9c", // HTTP blue
  http2: "#005a9c", // HTTP/2 blue
  http3: "#005a9c", // HTTP/3 blue
  tcp: "#1976d2", // TCP blue
  udp: "#1976d2", // UDP blue
  websockets: "#010101", // WebSockets black
  mqtt: "#660066", // MQTT purple
  amqp: "#ff6600", // AMQP orange
  kafka: "#231f20", // Kafka black
  rabbitmq: "#ff6600", // RabbitMQ orange

  protobuf: "#1976d2", // Protocol Buffers blue
  avro: "#1976d2", // Apache Avro blue
  thrift: "#1976d2", // Apache Thrift blue
  json: "#000000", // JSON black
  xml: "#e34c26", // XML orange
  yaml: "#cb171e", // YAML red
  toml: "#9c4221", // TOML brown
  csv: "#217346", // CSV green

  // === 🎮 OTHERS ===
  opensource: "#2e8b57", // Open Source sea green
  "open-source": "#2e8b57", // Alias
  mit: "#2e8b57", // MIT License green
  apache: "#d22128", // Apache License red
  gpl: "#663399", // GPL purple
  bsd: "#af1e2d", // BSD red
  creative: "#ef5734", // Creative Commons orange
  public: "#2e8b57", // Public Domain green
  proprietary: "#666666", // Proprietary gray
  hooks: "#61dafb", // Cyan (React hooks)
  context: "#61dafb", // Cyan (React context)
  redux: "#764abc", // Official Redux purple
  mobx: "#ff9955", // MobX orange
  zustand: "#4c1d95", // Zustand dark purple
  recoil: "#3578e5", // Recoil blue
  jotai: "#212529", // Jotai gray
  valtio: "#6366f1", // Valtio purple
  rxjs: "#b7178c", // RxJS pink
  lodash: "#3492ff", // Lodash blue
  underscore: "#0f4a73", // Underscore blue
  ramda: "#79a842", // Ramda green
  immutable: "#3f51b5", // Immutable.js blue
  moment: "#484848", // Moment.js gray
  dayjs: "#ff9800", // Day.js orange
  datejs: "#008000", // Date-fns green

  // ✅ IMPROVEMENT: More vibrant default color
  default: "#6366f1", // Default purple instead of gray
};

/**
 * 🎯 SPECIFIC CATEGORY MAPPING
 * Ensures consistent colors for blog categories
 */
const CATEGORY_COLORS: Record<string, string> = {
  // === MAIN CATEGORIES ===
  desenvolvimento: "#10b981", // Emerald green
  javascript: "#f7df1e", // JavaScript yellow
  typescript: "#3178c6", // TypeScript blue
  react: "#61dafb", // React cyan
  "next.js": "#6366f1", // Next.js purple
  nextjs: "#6366f1", // Alias without dot
  "node.js": "#68a063", // Node.js green
  nodejs: "#68a063", // Alias without dot
  css: "#1572b6", // CSS blue
  html: "#e34f26", // HTML orange
  tutorial: "#14b8a6", // Tutorial teal
  carreira: "#ef4444", // Career red
  tecnologia: "#6366f1", // Technology purple
  dicas: "#f59e0b", // Tips yellow/orange
  devops: "#ff6b35", // ✅ ORANGE DevOps
  reflexões: "#8b5cf6", // Reflections light purple
  reflexoes: "#8b5cf6", // Without accent
  noticias: "#ef4444", // News red
  notícias: "#ef4444", // With accent
  review: "#14b8a6", // Review teal
  análise: "#6366f1", // Analysis purple
  analise: "#6366f1", // Without accent
  opinion: "#8b5cf6", // Opinion purple
  opinião: "#8b5cf6", // With accent
  guide: "#10b981", // Guide green
  guia: "#10b981", // Green
  // Add categories as needed
};

// ===================================================================
// 🔧 MAIN FUNCTIONS
// ===================================================================

/**
 * ✅ Gets color for a tag
 */
export function getTagColor(tag: string): string {
  const normalizedTag = tag.toLowerCase().trim();
  return TAG_COLORS[normalizedTag] || TAG_COLORS.default;
}

/**
 * ✅ Gets color for a category
 */
export function getCategoryColor(category: string): string {
  const normalizedCategory = category.toLowerCase().trim();
  return (
    CATEGORY_COLORS[normalizedCategory] ||
    getTagColor(category) ||
    TAG_COLORS.default
  );
}

/**
 * ✅ Gets complete color configuration for a tag
 */
export function getTagColorConfig(tag: string): TagColorConfig {
  const baseColor = getTagColor(tag);
  return {
    backgroundColor: `${baseColor}15`, // 15% opacity
    textColor: baseColor,
    borderColor: `${baseColor}30`, // 30% opacity
  };
}

/**
 * ✅ Gets complete color configuration for a category
 */
export function getCategoryColorConfig(category: string): TagColorConfig {
  const baseColor = getCategoryColor(category);
  return {
    backgroundColor: `${baseColor}15`, // 15% opacity
    textColor: baseColor,
    borderColor: `${baseColor}30`, // 30% opacity
  };
}

/**
 * ✅ Generates inline style for a tag
 */
export function getTagStyle(tag: string): React.CSSProperties {
  const config = getTagColorConfig(tag);
  return {
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    border: `1px solid ${config.borderColor}`,
  };
}

/**
 * ✅ Generates inline style for a category
 */
export function getCategoryStyle(category: string): React.CSSProperties {
  const config = getCategoryColorConfig(category);
  return {
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    border: `1px solid ${config.borderColor}`,
  };
}

/**
 * ✅ Gets only the main color of the tag
 */
export function getTagMainColor(tag: string): string {
  return getTagColor(tag);
}

/**
 * ✅ Gets only the main color of the category
 */
export function getCategoryMainColor(category: string): string {
  return getCategoryColor(category);
}

// ===================================================================
// 🔍 VALIDATION AND VERIFICATION FUNCTIONS
// ===================================================================

/**
 * ✅ Checks if a tag has custom color
 */
export function hasCustomTagColor(tag: string): boolean {
  const normalizedTag = tag.toLowerCase().trim();
  const color = getTagColor(normalizedTag);
  return color !== TAG_COLORS.default;
}

/**
 * ✅ Checks if a category has custom color
 */
export function hasCustomCategoryColor(category: string): boolean {
  const normalizedCategory = category.toLowerCase().trim();
  return normalizedCategory in CATEGORY_COLORS;
}

/**
 * ✅ Gets complete information about a tag
 */
export function getTagInfo(tag: string): ColorInfo {
  const normalizedTag = tag.toLowerCase().trim();
  const isPredefined = normalizedTag in TAG_COLORS;
  const color = getTagColor(tag);

  return {
    color,
    isPredefined,
    category: getTagCategory(tag),
    description: getTagDescription(tag),
  };
}

/**
 * ✅ Gets complete information about a category
 */
export function getCategoryInfo(category: string): ColorInfo {
  const normalizedCategory = category.toLowerCase().trim();
  const isPredefined = normalizedCategory in CATEGORY_COLORS;
  const color = getCategoryColor(category);

  return {
    color,
    isPredefined,
    category: "categoria",
    description: getCategoryDescription(category),
  };
}

// ===================================================================
// 🎨 GENERATION AND UTILITY FUNCTIONS
// ===================================================================

/**
 * ✅ Gets a random vibrant color
 */
export function getRandomVibrantColor(): string {
  const vibrantColors = [
    "#10b981",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#ef4444",
    "#14b8a6",
    "#f97316",
    "#84cc16",
    "#06b6d4",
    "#a855f7",
    "#f472b6",
    "#fbbf24",
    "#34d399",
  ];
  return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
}

/**
 * ✅ Generates gradient based on tags
 */
export function generateTagGradient(tags: string[]): string {
  if (tags.length === 0) return "linear-gradient(45deg, #6366f1, #8b5cf6)";
  if (tags.length === 1) {
    const color = getTagColor(tags[0]);
    return `linear-gradient(45deg, ${color}, ${color}99)`;
  }

  const colors = tags.slice(0, 3).map((tag) => getTagColor(tag));
  return `linear-gradient(45deg, ${colors.join(", ")})`;
}

/**
 * ✅ Generates gradient based on categories
 */
export function generateCategoryGradient(categories: string[]): string {
  if (categories.length === 0)
    return "linear-gradient(45deg, #6366f1, #8b5cf6)";
  if (categories.length === 1) {
    const color = getCategoryColor(categories[0]);
    return `linear-gradient(45deg, ${color}, ${color}99)`;
  }

  const colors = categories.slice(0, 3).map((cat) => getCategoryColor(cat));
  return `linear-gradient(45deg, ${colors.join(", ")})`;
}

/**
 * ✅ Gets contrasting color (light/dark) based on the color
 */
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return contrasting color
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

/**
 * ✅ Adjusts opacity of a hex color
 */
export function adjustColorOpacity(hexColor: string, opacity: number): string {
  const hex = hexColor.replace("#", "");
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${hex}${alpha}`;
}

/**
 * ✅ Converts hex to RGB
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * ✅ Converts RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ===================================================================
// 🗂️ CATEGORIZATION AND DESCRIPTION FUNCTIONS
// ===================================================================

/**
 * ✅ Gets category of a tag
 */
export function getTagCategory(tag: string): string {
  const normalizedTag = tag.toLowerCase().trim();

  const categoryMapping: Record<string, string> = {
    // Frontend
    javascript: "Frontend",
    typescript: "Frontend",
    react: "Frontend",
    nextjs: "Frontend",
    vue: "Frontend",
    angular: "Frontend",

    // Backend
    nodejs: "Backend",
    python: "Backend",
    java: "Backend",
    php: "Backend",

    // Database
    mysql: "Database",
    postgresql: "Database",
    mongodb: "Database",

    // DevOps
    docker: "DevOps",
    kubernetes: "DevOps",
    aws: "Cloud",

    // Tools
    git: "Tools",
    vscode: "Tools",
    figma: "Design",

    // Testing
    jest: "Testing",
    cypress: "Testing",
    mocha: "Testing",
  };

  return categoryMapping[normalizedTag] || "Others";
}

/**
 * ✅ Gets description of a tag
 */
export function getTagDescription(tag: string): string {
  const normalizedTag = tag.toLowerCase().trim();

  const descriptions: Record<string, string> = {
    javascript: "Versatile programming language for web",
    typescript: "JavaScript with static typing",
    react: "Library for building interfaces",
    nextjs: "React framework for production",
    nodejs: "JavaScript runtime for backend",
    python: "High-level programming language",
    docker: "Containerization platform",
    git: "Version control system",
    // Add more as needed
  };

  return descriptions[normalizedTag] || "Technology or tool";
}

/**
 * ✅ Gets description of a category
 */
export function getCategoryDescription(category: string): string {
  const normalizedCategory = category.toLowerCase().trim();

  const descriptions: Record<string, string> = {
    desenvolvimento: "Articles about programming and development",
    tutorial: "Step-by-step guides and tutorials",
    carreira: "Tips and insights about tech career",
    dicas: "Practical tips and productivity",
    devops: "DevOps, infrastructure and deployment",
    reflexões: "Reflections and opinions about technology",
    // Add more as needed
  };

  return descriptions[normalizedCategory] || "Content category";
}

// ===================================================================
// 🎯 LISTING AND ENUMERATION FUNCTIONS
// ===================================================================

/**
 * ✅ Gets list of all tags with colors
 */
export function getAvailableTagColors(): TagWithColor[] {
  return Object.entries(TAG_COLORS).map(([tag, color]) => ({
    name: tag,
    color,
    isPredefined: true,
  }));
}

/**
 * ✅ Gets list of all categories with colors
 */
export function getAvailableCategoryColors(): TagWithColor[] {
  return Object.entries(CATEGORY_COLORS).map(([category, color]) => ({
    name: category,
    color,
    isPredefined: true,
  }));
}

/**
 * ✅ Gets all colors grouped by category
 */
export function getColorsByCategory(): Record<string, TagWithColor[]> {
  const result: Record<string, TagWithColor[]> = {};

  Object.entries(TAG_COLORS).forEach(([tag, color]) => {
    const category = getTagCategory(tag);
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push({
      name: tag,
      color,
      isPredefined: true,
    });
  });

  return result;
}

/**
 * ✅ Gets most popular colors
 */
export function getPopularColors(limit: number = 10): TagWithColor[] {
  const popularTags = [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "css",
    "html",
    "python",
    "docker",
    "git",
  ];

  return popularTags.slice(0, limit).map((tag) => ({
    name: tag,
    color: getTagColor(tag),
    isPredefined: true,
  }));
}

// ===================================================================
// ⚛️ REACT COMPONENTS
// ===================================================================

/**
 * ✅ React component to render a tag with colors
 */
export function TagComponent({
  tag,
  className = "",
  showCount,
  count,
  size = "sm",
  variant = "default",
  onClick,
}: {
  tag: string;
  className?: string;
  showCount?: boolean;
  count?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "outline" | "solid";
  onClick?: () => void;
}) {
  const style = getTagStyle(tag);

  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantStyles = {
    default: style,
    outline: {
      ...style,
      backgroundColor: "transparent",
      border: `2px solid ${getTagColor(tag)}`,
    },
    solid: {
      backgroundColor: getTagColor(tag),
      color: getContrastColor(getTagColor(tag)),
      border: "none",
    },
  };

  return (
    <span
      className={`${sizeClasses[size]} rounded-md font-medium 
      inline-flex items-center gap-1 transition-all 
      hover:scale-105 cursor-pointer ${className}`}
      style={variantStyles[variant]}
      onClick={onClick}
    >
      {tag}
      {showCount && count !== undefined && (
        <span className="opacity-70">({count})</span>
      )}
    </span>
  );
}

/**
 * ✅ React component to render a category with colors
 */
export function CategoryComponent({
  category,
  className = "",
  showCount,
  count,
  size = "sm",
  variant = "default",
  onClick,
}: {
  category: string;
  className?: string;
  showCount?: boolean;
  count?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "outline" | "solid";
  onClick?: () => void;
}) {
  const style = getCategoryStyle(category);

  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantStyles = {
    default: style,
    outline: {
      ...style,
      backgroundColor: "transparent",
      border: `2px solid ${getCategoryColor(category)}`,
    },
    solid: {
      backgroundColor: getCategoryColor(category),
      color: getContrastColor(getCategoryColor(category)),
      border: "none",
    },
  };

  return (
    <span
      className={`${sizeClasses[size]} rounded-md font-medium 
      inline-flex items-center gap-1 transition-all 
      hover:scale-105 cursor-pointer ${className}`}
      style={variantStyles[variant]}
      onClick={onClick}
    >
      {category}
      {showCount && count !== undefined && (
        <span className="opacity-70">({count})</span>
      )}
    </span>
  );
}

// ===================================================================
// 🪝 REACT HOOKS
// ===================================================================

/**
 * ✅ Hook to use tag colors in React components
 */
export function useTagColors(tags: string[]) {
  return {
    getColor: (tag: string) => getTagColor(tag),
    getStyle: (tag: string) => getTagStyle(tag),
    getConfig: (tag: string) => getTagColorConfig(tag),
    getInfo: (tag: string) => getTagInfo(tag),
    generateGradient: () => generateTagGradient(tags),
    hasCustomColor: (tag: string) => hasCustomTagColor(tag),
    getCategory: (tag: string) => getTagCategory(tag),
    getDescription: (tag: string) => getTagDescription(tag),
  };
}

/**
 * ✅ Hook to use category colors in React components
 */
export function useCategoryColors(categories: string[]) {
  return {
    getColor: (category: string) => getCategoryColor(category),
    getStyle: (category: string) => getCategoryStyle(category),
    getConfig: (category: string) => getCategoryColorConfig(category),
    getInfo: (category: string) => getCategoryInfo(category),
    generateGradient: () => generateCategoryGradient(categories),
    hasCustomColor: (category: string) => hasCustomCategoryColor(category),
    getDescription: (category: string) => getCategoryDescription(category),
  };
}

/**
 * ✅ Hook to use complete color system
 */
export function useColorSystem() {
  return {
    // Tags
    getTagColor,
    getTagStyle,
    getTagInfo,
    hasCustomTagColor,

    // Categories
    getCategoryColor,
    getCategoryStyle,
    getCategoryInfo,
    hasCustomCategoryColor,

    // Utilities
    generateTagGradient,
    generateCategoryGradient,
    getRandomVibrantColor,
    getContrastColor,
    adjustColorOpacity,

    // Listing
    getAvailableTagColors,
    getAvailableCategoryColors,
    getColorsByCategory,
    getPopularColors,

    // Conversion
    hexToRgb,
    rgbToHex,
  };
}

// ===================================================================
// 📊 STATISTICS AND ANALYSIS
// ===================================================================

/**
 * ✅ Gets color system statistics
 */
export function getColorSystemStats() {
  const totalTags = Object.keys(TAG_COLORS).length;
  const totalCategories = Object.keys(CATEGORY_COLORS).length;
  const categorizedTags = getColorsByCategory();

  return {
    totalTags,
    totalCategories,
    totalColors: totalTags + totalCategories,
    categoriesWithTags: Object.keys(categorizedTags).length,
    tagsPerCategory: Object.entries(categorizedTags).reduce(
      (acc, [cat, tags]) => {
        acc[cat] = tags.length;
        return acc;
      },
      {} as Record<string, number>
    ),
    mostPopularCategory: Object.entries(categorizedTags).sort(
      ([, a], [, b]) => b.length - a.length
    )[0]?.[0],
  };
}

/**
 * ✅ Search tags by similar color
 */
export function findSimilarColorTags(
  targetColor: string,
  tolerance: number = 30
): TagWithColor[] {
  const targetRgb = hexToRgb(targetColor);
  if (!targetRgb) return [];

  return getAvailableTagColors().filter(({ color }) => {
    const rgb = hexToRgb(color);
    if (!rgb) return false;

    const distance = Math.sqrt(
      Math.pow(rgb.r - targetRgb.r, 2) +
        Math.pow(rgb.g - targetRgb.g, 2) +
        Math.pow(rgb.b - targetRgb.b, 2)
    );

    return distance <= tolerance;
  });
}

/**
 * ✅ Gets color palette based on a tag
 */
export function getColorPalette(
  baseTags: string[],
  size: number = 5
): string[] {
  const baseColors = baseTags.map((tag) => getTagColor(tag));
  const palette = [...baseColors];

  // Add complementary colors if needed
  while (palette.length < size) {
    palette.push(getRandomVibrantColor());
  }

  return palette.slice(0, size);
}

// ===================================================================
// 📋 VALIDATION AND DEBUGGING
// ===================================================================

/**
 * ✅ Validates if a color is valid
 */
export function isValidColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * ✅ Gets debug information about the system
 */
export function getColorSystemDebugInfo() {
  const stats = getColorSystemStats();
  const duplicates = findDuplicateColors();
  const invalid = findInvalidColors();

  return {
    stats,
    duplicates,
    invalid,
    performance: {
      tagLookupTime: measureTagLookupTime(),
      categoryLookupTime: measureCategoryLookupTime(),
    },
  };
}

/**
 * ✅ Finds duplicate colors
 */
function findDuplicateColors(): Array<{ color: string; tags: string[] }> {
  const colorMap: Record<string, string[]> = {};

  Object.entries(TAG_COLORS).forEach(([tag, color]) => {
    if (!colorMap[color]) colorMap[color] = [];
    colorMap[color].push(tag);
  });

  return Object.entries(colorMap)
    .filter(([, tags]) => tags.length > 1)
    .map(([color, tags]) => ({ color, tags }));
}

/**
 * ✅ Finds invalid colors
 */
function findInvalidColors(): Array<{ tag: string; color: string }> {
  return Object.entries(TAG_COLORS)
    .filter(([, color]) => !isValidColor(color))
    .map(([tag, color]) => ({ tag, color }));
}

/**
 * ✅ Measures tag lookup time
 */
function measureTagLookupTime(): number {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    getTagColor("javascript");
  }
  return performance.now() - start;
}

/**
 * ✅ Measures category lookup time
 */
function measureCategoryLookupTime(): number {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    getCategoryColor("desenvolvimento");
  }
  return performance.now() - start;
}

// ===================================================================
// 🎨 FINAL EXPORTS
// ===================================================================

// Export main constants
export { TAG_COLORS, CATEGORY_COLORS };

// Aliases for compatibility
export const getColor = getTagColor;
export const getStyle = getTagStyle;
export const getConfig = getTagColorConfig;

// Export everything as default too
export default {
  // Main functions
  getTagColor,
  getCategoryColor,
  getTagStyle,
  getCategoryStyle,
  getTagColorConfig,
  getCategoryColorConfig,

  // Components
  TagComponent,
  CategoryComponent,

  // Hooks
  useTagColors,
  useCategoryColors,
  useColorSystem,

  // Utilities
  generateTagGradient,
  generateCategoryGradient,
  getRandomVibrantColor,
  getContrastColor,

  // Constants
  TAG_COLORS,
  CATEGORY_COLORS,
};
