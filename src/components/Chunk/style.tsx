import { styled } from "styled-components";

export const ChunkContainer = styled.div`
  border-radius: 8px;
  border: 0.5px solid #e5ebf5;
  background: #f6f9fe;
  cursor: pointer;
`;
export const ChunkData = styled.div`
  padding: 10px 20px;
  width: 100%;
`;

export const ChunkMetadata = styled.div`
  padding: 10px 20px;
  width: 100%;
  border-top: 1px solid var(--blue-purple-50, #efeafc);
`;

export const ChunkMetedataDivider = styled.div`
  height: 24px;
  width: 1px;
  background: var(--blue-purple-50, #efeafc);
`;
