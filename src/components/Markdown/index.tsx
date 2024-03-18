import "github-markdown-css/github-markdown-dark.css";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css"; // Import a highlight.js style

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { MarkdownBody } from "./style";

const rehypePlugins = [rehypeSlug, rehypeRaw, rehypeHighlight];
const remarkPlugins = [remarkToc, remarkGfm];

const MarkdownComponent: React.FC<{ markdown: string }> = ({ markdown }) => {
  markdown = markdown?.replace(/\\n/g, "  \n");
  return (
    <MarkdownBody className="markdown-body light">
      <Markdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          pre: ({ children, ...rest }) => {
            return (
              <pre
                style={{
                  color: "grey",
                  backgroundColor: "#f9fafb",
                  overflowX: "auto",
                  fontWeight: 400,
                  fontSize: ".875em",
                  lineHeight: "1.7142857",
                  borderRadius: ".375rem",
                  padding: ".2em .2em",
                }}
              >
                {children}
              </pre>
            );
          },
          a: ({ children, ...rest }) => {
            console.log("🚀 ~ rest:", rest);
            console.log("link appeared", children);
            return (
              <a {...rest} target="_blank">
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </MarkdownBody>
  );
};

export default MarkdownComponent;
