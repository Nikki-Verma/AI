import styled from "styled-components";

export const DatasetUploadTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100% !important;
`;

export const UploadDatasetFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100% !important;

  .ant-upload-list {
    max-height: 400px;
    overflow: auto;
  }
`;

export const UploadPrivacyContainer = styled.div`
  height: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  border-radius: 8px;
  background: #f6f4fe;
  padding: 0 20px;
`;

export const PrivacyTitle = styled.div`
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
`;

export const PrivacyDescription = styled.div`
  color: var(--Text-Color-700, #444);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const UploadTypeHeading = styled.div`
  color: var(--headings, #000b34);
  font-family: var(--font-dm-sans);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const UploadTypeDescription = styled.div`
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FileListItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 0.5px solid var(--Stroke, #a6bcda);
  background: var(--Text-Color-50, #fff);
  padding: 12px 24px;
  margin-top: 12px;
`;

export const FileItemDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
`;

export const FileName = styled.div`
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FileSize = styled.div`
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
