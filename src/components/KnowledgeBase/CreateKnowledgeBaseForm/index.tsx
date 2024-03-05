"use client";

import KbCustomIcon from "@/components/Icons/KbCustomIcon";
import KbDefaultIcon from "@/components/Icons/KbDefaultIcon";
import InfoIconTooltip from "@/components/InfoIconTooltip";
import { PAGE_MODE } from "@/utils/constants";
import { alphanumericWithUnderscore } from "@/utils/regex";
import { PageModeEnum, UnknownObject } from "@/utils/types";
import {
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { embeddingModelsOptions, vectorDbOptions } from "./constant";
import {
  CustomFieldsContainer,
  KbSettingsIconsContainer,
  KbSettingsLabel,
  KbSettingsRadioDescription,
  KbSettingsRadioTitle,
  RadioOptionContainer,
} from "./style";

const { Text, Paragraph } = Typography;
interface CreateKnowledgeBaseFormProps {
  createKnowledgeBaseHandler: (values: { [key: string]: any }) => void;
  form: FormInstance;
  type?: createTypeEnum;
  mode?: PageModeEnum;
  kbDetails?: UnknownObject;
}

export enum createTypeEnum {
  "ADD" = "ADD",
  "ADD_AND_UPDATE" = "ADD_AND_UPDATE",
}

export const KnowledgeBaseCreateType = {
  ADD: createTypeEnum.ADD,
  ADD_AND_UPDATE: createTypeEnum.ADD_AND_UPDATE,
};

const fullWidth = { width: "100%" };

const CreateKnowledgeBaseForm = ({
  form,
  createKnowledgeBaseHandler,
  type = KnowledgeBaseCreateType.ADD_AND_UPDATE,
  mode = PAGE_MODE.CREATE,
  kbDetails = {},
}: CreateKnowledgeBaseFormProps) => {
  const [formUpdated, setFormUpdated] = useState(false);
  const kbSetting = Form.useWatch("kb_setting", form);
  useEffect(() => {
    if (mode === PAGE_MODE.EDIT) {
      console.log("knowledgee base details", kbDetails);

      form.setFields([
        {
          name: "name",
          value: kbDetails?.name,
          errors: [],
        },
        {
          name: "desciption",
          value: kbDetails?.description,
          errors: [],
        },
        {
          name: "kb_setting",
          value: kbDetails?.kb_setting,
          errors: [],
        },
        {
          name: "vector_db",
          value: kbDetails?.vector_db,
          errors: [],
        },
        {
          name: "embed_model_name",
          value: kbDetails?.embed_model_name,
          errors: [],
        },
        {
          name: "index_key",
          value: kbDetails?.index_key,
          errors: [],
        },
        {
          name: "size",
          value: kbDetails?.size,
          errors: [],
        },
        {
          name: "allowed_size",
          value: kbDetails?.allowed_size,
          errors: [],
        },
      ]);
      setFormUpdated((prev: boolean) => !prev);
    }
  }, [mode, kbSetting]);

  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={createKnowledgeBaseHandler}
      scrollToFirstError
      initialValues={{ kb_setting: "DEFAULT" }}
    >
      <Row justify="space-between" gutter={[12, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="name"
            label={
              <Space>
                <Text>Knowledge base name</Text>
                <InfoIconTooltip title="Knowledge base can only contain _(underscore) and no other special characters" />
              </Space>
            }
            rules={[
              {
                required: true,
                message: "Knowledge base name is required",
              },
              {
                pattern: alphanumericWithUnderscore,
                message: "Enter valid knowledge base name",
              },
            ]}
          >
            <Input placeholder="Enter knowledge base name" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item name="description" label="Description">
            <Input placeholder="Enter knowledge base description" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="kb_setting"
            label={<KbSettingsLabel>Knowledge Base Setting</KbSettingsLabel>}
            rules={[
              {
                required: true,
                message: "Knowledge base setting is required",
              },
            ]}
          >
            <Radio.Group
              onChange={() => setFormUpdated(!formUpdated)}
              size="large"
            >
              <Row justify="space-between" gutter={[12, 7]}>
                <Col span={24}>
                  <RadioOptionContainer
                    checked={kbSetting === "DEFAULT"}
                    size="small"
                    onClick={() => {
                      kbSetting === "DEFAULT"
                        ? null
                        : form.setFields([
                            {
                              name: "kb_setting",
                              value: "DEFAULT",
                              errors: [],
                            },
                          ]);
                      setFormUpdated((prev: boolean) => !prev);
                    }}
                  >
                    <Flex gap="24px" align="center" justify="space-between">
                      <Flex align="center" gap="12px">
                        <KbSettingsIconsContainer>
                          <KbDefaultIcon />
                        </KbSettingsIconsContainer>
                        <Flex gap="2px" vertical>
                          <KbSettingsRadioTitle>Default</KbSettingsRadioTitle>
                          <KbSettingsRadioDescription>
                            Default set chunk and preprocessing rules.
                            Unfamiliar users are recommended to select this.
                          </KbSettingsRadioDescription>
                        </Flex>
                      </Flex>
                      <Radio
                        value="DEFAULT"
                        style={{ display: "flex", alignItems: "center" }}
                      ></Radio>
                    </Flex>
                  </RadioOptionContainer>
                </Col>
                <Col span={24}>
                  <RadioOptionContainer
                    checked={kbSetting === "CUSTOM"}
                    size="small"
                    onClick={() => {
                      kbSetting === "CUSTOM"
                        ? null
                        : form.setFields([
                            {
                              name: "kb_setting",
                              value: "CUSTOM",
                              errors: [],
                            },
                          ]);
                      setFormUpdated((prev: boolean) => !prev);
                    }}
                  >
                    <Flex gap="24px" align="center" justify="space-between">
                      <Flex align="center" gap="12px">
                        <KbSettingsIconsContainer>
                          <KbCustomIcon />
                        </KbSettingsIconsContainer>
                        <Flex gap="2px" vertical>
                          <KbSettingsRadioTitle>Custom</KbSettingsRadioTitle>
                          <KbSettingsRadioDescription>
                            Manually set chunk and preprocessing rules.
                            Unfamiliar users are recommended to select.
                          </KbSettingsRadioDescription>
                        </Flex>
                      </Flex>
                      <Radio
                        value="CUSTOM"
                        style={{ display: "flex", alignItems: "center" }}
                      ></Radio>
                    </Flex>
                  </RadioOptionContainer>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <CustomFieldsContainer open={kbSetting === "CUSTOM"}>
            {kbSetting === "CUSTOM" && (
              <Row justify="space-between" gutter={[12, 0]}>
                <Col span={24} md={12}>
                  <Form.Item
                    name="vector_db"
                    label="Vector DB"
                    rules={[
                      {
                        required: true,
                        message: "Vector DB is required",
                      },
                    ]}
                  >
                    <Select
                      options={vectorDbOptions}
                      placeholder="Select vector db"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    name="embed_model_name"
                    label="Deployed embedding model"
                    rules={[
                      {
                        required: true,
                        message: "embedding model is required",
                      },
                    ]}
                  >
                    <Select
                      options={embeddingModelsOptions}
                      placeholder="Select emnedding model"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={24} md={12}>
                  <Form.Item name="index_key" label="Index Key">
                    <Input placeholder="Enter index key" />
                  </Form.Item>
                </Col> */}
                {type === KnowledgeBaseCreateType.ADD_AND_UPDATE && (
                  <>
                    <Col span={24} md={12}>
                      <Form.Item
                        name="size"
                        label="Chunk size (File chunk size)"
                      >
                        <InputNumber
                          min={0}
                          style={{ ...fullWidth }}
                          placeholder="Enter chunk size"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item
                        name="allowed_size"
                        label="Chunk Overlap (File chunk overlap)"
                      >
                        <InputNumber
                          style={{ ...fullWidth }}
                          min={0}
                          placeholder="Enter chunk overlap"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            )}
          </CustomFieldsContainer>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateKnowledgeBaseForm;
