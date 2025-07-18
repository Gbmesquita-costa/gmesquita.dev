---
title: "TypeScript: Do Básico ao Avançado em 2025"
excerpt: "Guia completo de TypeScript moderno: desde fundamentos até técnicas avançadas. Aprenda tipos utilitários, generics, decorators e as novidades do TS 5.0+ com exemplos práticos."
date: "2025-01-11"
category: "TypeScript"
tags: ["typescript", "javascript", "desenvolvimento", "tutorial", "programação"]
featured: true
image: "/static/posts/typescript-do-basico-ao-avancado-em-2025.jpg"
author: "Gabriel Mesquita"
readTime: 15
seo:
  metaTitle: "TypeScript: Guia Completo do Básico ao Avançado em 2025"
  metaDescription: "Aprenda TypeScript do zero ao avançado: tipos, interfaces, generics, decorators e as novidades do TS 5.0+. Guia completo com exemplos práticos."
  keywords:
    [
      "TypeScript",
      "JavaScript",
      "tipos",
      "interfaces",
      "generics",
      "decorators",
      "TS 5.0",
      "programação",
    ]
---

# TypeScript: Do Básico ao Avançado em 2025

O TypeScript continua sendo uma das linguagens mais populares entre desenvolvedores, e 2025 trouxe ainda mais recursos poderosos. Este guia completo levará você desde os fundamentos até as técnicas mais avançadas.

## 🎯 Por que TypeScript em 2025?

### Benefícios Principais

- **Detecção precoce de erros** durante o desenvolvimento
- **IntelliSense aprimorado** em IDEs modernas
- **Refatoração segura** de código em larga escala
- **Documentação viva** através de tipos
- **Melhor performance em runtime** com otimizações

```typescript
// Exemplo: Bug que TypeScript previne
// JavaScript (erro só aparece em runtime)
function calculateDiscount(price, discount) {
  return price - price * discount;
}

calculateDiscount("100", "0.1"); // ❌ Retorna "1000.1" (string)

// TypeScript (erro detectado durante desenvolvimento)
function calculateDiscount(price: number, discount: number): number {
  return price - price * discount;
}

calculateDiscount("100", "0.1"); // ❌ Erro de compilação
calculateDiscount(100, 0.1); // ✅ Correto
```

## 🏗️ Fundamentos Essenciais

### 1. Tipos Primitivos e Básicos

```typescript
// Tipos básicos
let name: string = "Gabriel";
let age: number = 28;
let isActive: boolean = true;
let data: null = null;
let value: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Ana", "João"];

// Tuplas
let person: [string, number] = ["Gabriel", 28];
let coordinate: [number, number, string?] = [10, 20]; // Terceiro elemento opcional

// Enums
enum Status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

let userStatus: Status = Status.PENDING;

// Union Types
let id: string | number = "user123";
id = 456; // ✅ Válido

// Literal Types
let theme: "light" | "dark" = "light";
let httpMethod: "GET" | "POST" | "PUT" | "DELETE" = "GET";
```

### 2. Interfaces e Types

```typescript
// Interface básica
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Propriedade opcional
  readonly createdAt: Date; // Propriedade somente leitura
}

// Type Alias
type UserRole = "admin" | "user" | "moderator";

// Interface estendida
interface AdminUser extends User {
  role: UserRole;
  permissions: string[];
}

// Interface com métodos
interface UserService {
  findById(id: number): User | null;
  create(userData: Omit<User, "id" | "createdAt">): User;
  update(id: number, data: Partial<User>): User;
  delete(id: number): boolean;
}

// Type vs Interface - quando usar cada um
type Theme = {
  primary: string;
  secondary: string;
}; // Use type para unions, primitivos e computed properties

interface APIResponse {
  data: any;
  status: number;
  message: string;
} // Use interface para objetos que podem ser estendidos
```

### 3. Funções Tipadas

```typescript
// Função básica
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Função com parâmetros opcionais
function createUser(name: string, email: string, age?: number): User {
  return {
    id: Math.random(),
    name,
    email,
    age: age || 0,
    createdAt: new Date(),
  };
}

// Função com rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Overloads de função
function processData(data: string): string;
function processData(data: number): number;
function processData(data: boolean): boolean;
function processData(
  data: string | number | boolean
): string | number | boolean {
  return data;
}

// Funções como tipos
type EventHandler = (event: Event) => void;
type APICallback<T> = (error: Error | null, data: T | null) => void;

const handleClick: EventHandler = (event) => {
  console.log("Clicked!", event.target);
};
```

## 🚀 Conceitos Intermediários

### 1. Generics

```typescript
// Generic básico
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello"); // tipo: string
const numberResult = identity<number>(42); // tipo: number
const autoInferred = identity("auto"); // tipo inferido: string

// Generic com constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // ✅ string tem length
logLength([1, 2, 3]); // ✅ array tem length
logLength({ length: 10, value: "test" }); // ✅ objeto com length
// logLength(3); // ❌ number não tem length

// Generic classes
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }
}

const stringStore = new DataStore<string>();
stringStore.add("hello");
stringStore.add("world");

const userStore = new DataStore<User>();
userStore.add({ id: 1, name: "João", email: "joao@email.com" });

// Generic interfaces
interface Repository<T, K = number> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, "id">): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T>;
  delete(id: K): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User | null> {
    // implementação
    return null;
  }

  // ... outras implementações
}
```

### 2. Tipos Utilitários (Utility Types)

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
}

// Partial - torna todas as propriedades opcionais
type UserUpdate = Partial<User>;
// Equivale a: { id?: number; name?: string; email?: string; ... }

// Pick - seleciona propriedades específicas
type UserProfile = Pick<User, "id" | "name" | "email">;
// Equivale a: { id: number; name: string; email: string; }

// Omit - exclui propriedades específicas
type CreateUserRequest = Omit<User, "id" | "createdAt">;
// Equivale a: { name: string; email: string; password: string; isActive: boolean; }

// Required - torna todas as propriedades obrigatórias
interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}

type CompleteUser = Required<PartialUser>;
// Equivale a: { id: number; name: string; email: string; }

// Record - cria um tipo com chaves específicas
type UserRoles = Record<"admin" | "user" | "moderator", string[]>;
// Equivale a: { admin: string[]; user: string[]; moderator: string[]; }

// Exclude e Extract
type Theme = "light" | "dark" | "auto";
type ManualTheme = Exclude<Theme, "auto">; // 'light' | 'dark'
type AutoTheme = Extract<Theme, "auto">; // 'auto'

// ReturnType e Parameters
function createUser(name: string, email: string): User {
  return {
    id: 1,
    name,
    email,
    password: "",
    isActive: true,
    createdAt: new Date(),
  };
}

type CreateUserReturn = ReturnType<typeof createUser>; // User
type CreateUserParams = Parameters<typeof createUser>; // [string, string]

// Awaited (para tipos de Promise)
type UserPromise = Promise<User>;
type ResolvedUser = Awaited<UserPromise>; // User
```

### 3. Conditional Types e Mapped Types

```typescript
// Conditional Types
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// Exemplo prático: API Response
type APIResponse<T> = T extends string
  ? { message: T }
  : T extends number
  ? { code: T }
  : { data: T };

type StringResponse = APIResponse<string>; // { message: string }
type NumberResponse = APIResponse<number>; // { code: number }
type UserResponse = APIResponse<User>; // { data: User }

// Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Aplicando
type ReadonlyUser = Readonly<User>;
type OptionalUser = Optional<User>;
type NullableUser = Nullable<User>;

// Template Literal Types (TS 4.1+)
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "users" | "posts" | "comments";

type APIEndpoint = `/${Endpoint}`;
// Resulta em: "/users" | "/posts" | "/comments"

type APIRoute = `${HTTPMethod} ${APIEndpoint}`;
// Resulta em: "GET /users" | "POST /users" | "PUT /users" | ...
```

## 🎓 Técnicas Avançadas

### 1. Decorators (Experimental)

```typescript
// tsconfig.json precisa ter: "experimentalDecorators": true

// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class User {
  constructor(public name: string, public email: string) {}
}

// Method decorator
function log(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with arguments:`, args);
    const result = method.apply(this, args);
    console.log(`Method ${propertyName} returned:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Property decorator
function validate(target: any, propertyName: string) {
  let value: any;

  const getter = () => value;
  const setter = (newVal: any) => {
    if (typeof newVal !== "string" || newVal.length < 2) {
      throw new Error(
        `${propertyName} deve ser uma string com pelo menos 2 caracteres`
      );
    }
    value = newVal;
  };

  Object.defineProperty(target, propertyName, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @validate
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

### 2. Module Augmentation

```typescript
// Estendendo tipos de bibliotecas externas
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      email: string;
    };
  }
}

// Agora Request tem a propriedade user tipada
import { Request, Response } from "express";

function authMiddleware(req: Request, res: Response, next: Function) {
  // req.user agora está tipado
  req.user = { id: 1, email: "user@email.com" };
  next();
}

// Global Augmentation
declare global {
  interface Window {
    gtag: (command: string, trackingId: string, config?: any) => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

// Agora window.gtag e process.env estão tipados
window.gtag("config", "GA_TRACKING_ID");
console.log(process.env.DATABASE_URL); // tipado como string
```

### 3. Advanced Type Manipulation

```typescript
// Deep Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Flatten object types
type Flatten<T> = T extends any[] ? T[0] : T;

type NestedArray = string[][];
type FlatString = Flatten<NestedArray>; // string[]

// Get function parameters by index
type Head<T extends any[]> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends readonly [any, ...infer T] ? T : [];

type FirstParam = Head<[string, number, boolean]>; // string
type RestParams = Tail<[string, number, boolean]>; // [number, boolean]

// Type-safe event emitter
interface EventMap {
  "user-created": { user: User };
  "user-updated": { user: User; changes: string[] };
  "user-deleted": { userId: number };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

const emitter = new TypedEventEmitter<EventMap>();

// Tipagem automática dos eventos
emitter.on("user-created", (data) => {
  console.log(data.user.name); // data é tipado como { user: User }
});

emitter.emit("user-created", { user: { id: 1, name: "João" } });
```

## 🛠️ Configuração e Boas Práticas

### 1. tsconfig.json Otimizado

```json
{
  "compilerOptions": {
    // Target e Module
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "sourceMap": true,

    // Type Checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,

    // Modules
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,

    // Advanced
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "incremental": true,

    // Path Mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    },

    // Experimental
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*", "types/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 2. Organização de Tipos

```typescript
// types/api.ts
export interface APIResponse<T = any> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    current: number;
    total: number;
    perPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "admin" | "user" | "moderator";

export interface UserProfile {
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export type CreateUserDTO = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserDTO = Partial<CreateUserDTO>;

// types/index.ts
export * from "./api";
export * from "./user";
export * from "./auth";
export * from "./product";
```

### 3. Error Handling Tipado

```typescript
// Classe de erro customizada
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Result pattern
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: number): Promise<Result<User, AppError>> {
  try {
    const user = await userService.findById(id);
    if (!user) {
      return {
        success: false,
        error: new AppError("User not found", "USER_NOT_FOUND", 404),
      };
    }
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: new AppError("Failed to fetch user", "FETCH_ERROR", 500),
    };
  }
}

// Uso
const result = await fetchUser(123);
if (result.success) {
  console.log(result.data.name); // TypeScript sabe que data é User
} else {
  console.error(result.error.message); // TypeScript sabe que error é AppError
}
```

## 🚀 Novidades do TypeScript 5.0+

### 1. Decorators Estáveis

```typescript
// Agora estável (não experimental)
function logged<T extends new (...args: any[]) => any>(target: T) {
  return class extends target {
    constructor(...args: any[]) {
      console.log(`Creating instance of ${target.name}`);
      super(...args);
    }
  };
}

@logged
class MyService {
  constructor(private name: string) {}
}
```

### 2. const Type Parameters

```typescript
function asConst<const T>(value: T): T {
  return value;
}

const colors = asConst(["red", "green", "blue"]);
// Tipo inferido: readonly ["red", "green", "blue"] ao invés de string[]

type Color = (typeof colors)[number]; // "red" | "green" | "blue"
```

### 3. satisfies Operator

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  retries?: number;
}

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  // TypeScript preserva o tipo literal
  environment: "development",
} satisfies Config;

// config.environment é tipado como "development", não string
// Mas ainda satisfaz a interface Config
```

## 🎯 Conclusão e Próximos Passos

O TypeScript em 2025 oferece um ecossistema maduro e poderoso para desenvolvimento JavaScript seguro e escalável. Os pontos principais incluem:

### Principais Benefícios

- **Type Safety** robusto em tempo de compilação
- **IntelliSense** avançado para produtividade
- **Refatoração segura** em projetos grandes
- **Documentação automática** através de tipos

### Recomendações para 2025

1. **Use strict mode** sempre
2. **Aproveite utility types** para reduzir código boilerplate
3. **Implemente error handling tipado** para robustez
4. **Configure path mapping** para imports limpos
5. **Use generics** para código reutilizável

### Continue Aprendendo

- Explore **Template Literal Types** para APIs type-safe
- Pratique **Conditional Types** para lógica avançada
- Implemente **Branded Types** para validação
- Experimente **Effect Systems** com bibliotecas como Effect-TS

O TypeScript continua evoluindo rapidamente - mantenha-se atualizado com as releases e experimente novos recursos em projetos pessoais antes de aplicar em produção!

---

**Quer ir mais fundo?** Confira a documentação oficial e comece a aplicar esses conceitos em seus projetos hoje mesmo! 🚀
