"use client";

import { PAGE_MODE } from "@/utils/constants";
import { PageModeEnum, UnknownObject } from "@/utils/types";
import { Col, Form, FormInstance, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const { Text, Paragraph } = Typography;
interface KbSettingsFormProps {
  updateKbSettingsHandler: (values: { [key: string]: any }) => void;
  form: FormInstance;
  mode?: PageModeEnum;
  kbDetails?: UnknownObject;
}

const fullWidth = { width: "100%" };

const KbSettingsForm = ({
  form,
  updateKbSettingsHandler,
  mode = PAGE_MODE.CREATE,
  kbDetails = {},
}: KbSettingsFormProps) => {
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
      onFinish={updateKbSettingsHandler}
      scrollToFirstError
      initialValues={{ kb_setting: "DEFAULT" }}
    >
      <Row justify="space-between" gutter={[12, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="name"
            label="Knowledge base name"
            rules={[
              {
                required: true,
                message: "Knowledge base name is required",
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
      </Row>
    </Form>
  );
};

export default KbSettingsForm;
