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
      <Markdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {markdown}
      </Markdown>
    </MarkdownBody>
  );
};

export default MarkdownComponent;
