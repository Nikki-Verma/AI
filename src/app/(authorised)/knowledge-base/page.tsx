// const KnowledgeBase = () => {
//   const { userConfig, updatePageConfig } = useAppStore();

//   return (
//     <ModelContainer>
//         <Row
//         gutter={[0,20]}
//         style={{ display: "flex", justifyContent: "space-between", marginBottom : '24px'}}
//         >
//         <Col
//             span={14}
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//         >
//             <Title>Knowledge base</Title>
//             <SubHeading>
//             The knowledge base serves as a repository of structured or unstructured information that an AI system can access to enhance its understanding and generate informed responses.
//             </SubHeading>
//         </Col>
//         <Col span={24}>
//           <Progress percent={30} />
//           <div style={{display : 'flex',width : '100%',justifyContent : 'space-between',alignItems : 'center'}}>
//             <span style={{color : '#727272',fontSize : '14px',fontWeight: '500',lineHeight : '24px'}}>
//             File upload limit
//             </span>
//             <div style={{display : 'flex',gap : '11px'}}>
//               <span style={{color : '#727272',fontSize : '14px',fontWeight: '500',lineHeight : '24px'}}>
//               10 kb / 50 GB
//               </span>
//               <a style={{textDecoration : 'underline',color : '#602EDF',fontSize : '14px',fontWeight : '700',lineHeight : '24px',cursor : 'pointer'}}>
//               Upgrade space
//               </a>
//             </div>
//           </div>
//         </Col>
//         </Row>
//         <EmptyUpload
//         buttonText = 'Import from Dataset'
//         message = 'It seems like you have not created a knowledge base yet.'
//         onClick = {()=>{console.log(`button Clicked`)}}

//         />
//     </ModelContainer>
//   )
// }

"use client";

import KnowledgeBaseList from "@/components/KnowledgeBase/KnowledgeBaseList";
import { useAppStore } from "@/store";
import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { ModelContainer, SubHeading } from "./style";

const { Title } = Typography;

const KnowledgeBase = () => {
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Knowledge base",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, [updatePageConfig]);

  return (
    <ModelContainer>
      <Row
        gutter={[0, 20]}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Knowledge base</Title>
          <SubHeading>
            The knowledge base serves as a repository of structured or
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses.
          </SubHeading>
        </Col>
      </Row>
      <KnowledgeBaseList />
    </ModelContainer>
  );
};

export default KnowledgeBase;
