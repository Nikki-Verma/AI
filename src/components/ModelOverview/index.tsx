import { Col, Row, Tag } from 'antd'
import React from 'react'
import { Container, Heading, Para } from './style'

const ModelOverView = (props: any) => {
  return (
    <Container>
   <Row gutter={[12,12]}>
        <Col span={16} style={{padding : '20px'}} >
            <Para>
              The Mixtral-8x7B Large Language Model (LLM) is a pretrained generative Sparse Mixture of Experts. The Mixtral-8x7B outperforms Llama 2 70B on most benchmarks we tested.
              For full details of this model please read our release blog post.
            </Para>
            <Heading>
            Warning
            </Heading>
            <Para>
            This repo contains weights that are compatible with vLLM serving of the model as well as Hugging Face transformers library. It is based on the original Mixtral torrent release, but the file format and parameter names are different. Please note that model cannot (yet) be instantiated with HF.
            </Para>
            <Heading>
            Instruction format
            </Heading>
            <Para>
            {`Note that <s> and </s> are special tokens for beginning of string (BOS) and end of string (EOS) while [INST] and [/INST] are regular strings.
              As reference, here is the pseudo-code used to tokenize instructions during fine-tuning:`}
            </Para>
            <Para>
            {`Note that <s> and </s> are special tokens for beginning of string (BOS) and end of string (EOS) while [INST] and [/INST] are regular strings.
              As reference, here is the pseudo-code used to tokenize instructions during fine-tuning:`}
            </Para>
            <Para>
            {`Note that <s> and </s> are special tokens for beginning of string (BOS) and end of string (EOS) while [INST] and [/INST] are regular strings.
              As reference, here is the pseudo-code used to tokenize instructions during fine-tuning:`}
            </Para>
            <Para>
            {`Note that <s> and </s> are special tokens for beginning of string (BOS) and end of string (EOS) while [INST] and [/INST] are regular strings.
              As reference, here is the pseudo-code used to tokenize instructions during fine-tuning:`}
            </Para>

        </Col>
        <Col span={8} style={{borderLeft: '1px solid var(--Text-Color-150, #D5D5D5)',background: '#FFF',boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.10)',padding : '20px'}}>
            <Heading>
            Model requirements
            </Heading>
            <ul>
              <li>
              CPU
              </li>
              <li>
              GPU
              </li>
              <li>
              RAM
              </li>
              <li>
              Storage
              </li>

            </ul>
            <Heading>
            Usages cost
            </Heading>
            <ul>
              <li>
              $0.01 per job
              </li>
            </ul>
            <Heading>
            Language Support
            </Heading>
            <ul>
              <li>
              Single Language Support: English, French, German etc
              </li>
              <li>
              Multilingual: (English, French), (English, Hinglish, Hindi), etc
              </li>
            </ul>
            <Heading>
            Tags
            </Heading>
            <Row gutter={[0,10]}>
            <Tag>
                Sample tag 1
            </Tag>
            <Tag>
            Sample tag 2
            </Tag>
            <Tag>
            Sample tag 3
            </Tag>
            <Tag>
            Sample tag 4
            </Tag>
            <Tag>
            Sample tag 5
            </Tag>
            </Row>
        </Col>
   </Row>
   </Container>
  )
}

export default ModelOverView
