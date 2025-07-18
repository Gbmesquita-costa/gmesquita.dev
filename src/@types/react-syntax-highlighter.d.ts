declare module "react-syntax-highlighter" {
  import * as React from "react";

  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    lineProps?: (lineNumber: number) => React.HTMLProps<HTMLElement>;
    children: string;
    [key: string]: any;
  }

  export class Prism extends React.Component<SyntaxHighlighterProps> {}
  export default class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const vscDarkPlus: any;
  export { vscDarkPlus };
}
