// import gfm from "remark-gfm";

import { marked } from "marked";
// import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

const renderer = new marked.Renderer();

// can use renderer to define how specific tags will be defined. We will have access to class names text etc based on which we can provide respective styles
renderer.code = function (code, lang, escaped) {
  // can additions based on classes
  // if (lang === "mermaid") {
  // Return a <pre> tag with a class of mermaid
  return (
    '<pre style="color: currentColor;background-color: #f9fafb;overflow-x: auto;font-weight: 400;font-size: .875em;line-height: 1.7142857;margin-top: 1.7142857em;margin-bottom: 1.7142857em;border-radius: .375rem;padding: .8571429em 1.1428571em">' +
    code +
    "</pre>"
  );
  // } else {
  //   // Use the default renderer
  //   return marked.Renderer.prototype.code.call(this, code, lang, escaped);
  // }
};
// TODO: figure out for images to use nextjs Image tag

// renderer.image = function (href, title, text) {
//   return `<img src={href} alt={text} width='200px' layout="fill" objectFit="contain" />`;
// };

// Define a functional component that takes markdown as a prop and returns a React node
const MarkdownComponent: React.FC<{ markdown: string }> = ({ markdown }) => {
  const html: any = marked
    .use({ renderer })
    .use({ gfm: true, async: false })
    .parse(markdown);

  const content = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default MarkdownComponent;
