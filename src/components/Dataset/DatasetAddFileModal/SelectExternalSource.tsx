import ChannelOptions from "@/components/ChannelOptions";
import { UploadDatasetFileContainer } from "./style";

const SelectExternalSource = ({
  ConnectorAvailableChannel,
  setUploadType,
}: any) => {
  return (
    <UploadDatasetFileContainer>
      <ChannelOptions
        availableOptions={ConnectorAvailableChannel}
        setSelectedChannel={setUploadType}
      />
    </UploadDatasetFileContainer>
  );
};

export default SelectExternalSource;
