declare module '*.png' {
  const src: string;
  export default src;
}

// Vite 环境变量类型声明
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


