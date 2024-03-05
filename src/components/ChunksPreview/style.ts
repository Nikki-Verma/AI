import { Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;
export const ChunkPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  border: 1px solid #ccd3de;
  padding: 20px 10px;
  max-height: 400px;
  height: 400px;
  overflow: auto;
`;

export const ChunkPreview = styled.div`
  border-radius: 8px;
  border: 0.5px solid #e5ebf5;
  background: #f6f9fe;
  padding: 12px;
`;

export const ChunkCount = styled(Text)`
  font-size: 12px !important;
  opacity: 0.9;
`;
