// import gfm from "remark-gfm";
// import ReactMarkdown from "react-markdown";
import { Typography } from "antd";
import DOMPurify from "dompurify";
import Markdown, { ReactRenderer } from "marked-react";
import { ReactNode } from "react";

const { Paragraph } = Typography;

// const renderer = new marked.Renderer();

// // can use renderer to define how specific tags will be defined. We will have access to class names text etc based on which we can provide respective styles
// renderer.code = function (code, lang, escaped) {
//   // can additions based on classes
//   // if (lang === "mermaid") {
//   // Return a <pre> tag with a class of mermaid
//   return (
//     '<pre style="color: currentColor;background-color: #f9fafb;overflow-x: auto;font-weight: 400;font-size: .875em;line-height: 1.7142857;margin-top: 1.7142857em;margin-bottom: 1.7142857em;border-radius: .375rem;padding: .8571429em 1.1428571em">' +
//     code +
//     "</pre>"
//   );
//   // } else {
//   //   // Use the default renderer
//   //   return marked.Renderer.prototype.code.call(this, code, lang, escaped);
//   // }
// };

// renderer.paragraph = function (text) {
//   return `<div style="margin-bottom:1em; line-height: 1.5714285714285714;font-size:14px;">${text}</div>`;
// };

const renderer: Partial<ReactRenderer> = {
  paragraph(snippet) {
    return <Paragraph>{snippet}</Paragraph>;
  },
  code(code: ReactNode, lang: string | undefined) {
    // can additions based on classes
    // if (lang === "mermaid") {
    // Return a <pre> tag with a class of mermaid
    return (
      <>
        <pre
          style={{
            color: "grey",
            backgroundColor: "#f9fafb",
            overflowX: "auto",
            fontWeight: 400,
            fontSize: ".875em",
            lineHeight: "1.7142857",
            marginTop: "1.7142857em",
            marginBottom: "1.7142857em",
            borderRadius: ".375rem",
            padding: ".8571429em 1.1428571em",
          }}
        >
          {code}
        </pre>
      </>
    );
    // } else {
    //   // Use the default renderer
    //   return marked.Renderer.prototype.code.call(this, code, lang, escaped);
    // }
  },
  // image(href: string, title: string, text: string) {
  //   return <Image src={href} alt={text} fill />;
  // },
  html(html: any) {
    const content = DOMPurify.sanitize(html);
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  },
};

// TODO: figure out for images to use nextjs Image tag

// renderer.image = function (href, title, text) {
//   return `<img src={href} alt={text} width='200px' layout="fill" objectFit="contain" />`;
// };

// Define a functional component that takes markdown as a prop and returns a React node
const MarkdownComponent: React.FC<{ markdown: string }> = ({ markdown }) => {
  // const html: any = marked
  //   .use({ renderer })
  //   .use({ gfm: true, async: false })
  //   .parse(markdown);

  // const content = DOMPurify.sanitize(html);
  return (
    <Markdown
      gfm={true}
      renderer={renderer}
      value={markdown}
      openLinksInNewTab
    />
  );
};

export default MarkdownComponent;
