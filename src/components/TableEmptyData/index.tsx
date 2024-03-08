import EmptyUpload from "../EmptyUpload";
import { TableEmptyContainer, TableLoadingContainer } from "./style";

type TableEmptyDataProps = {
  message: string;
  buttonText?: string;
  onClick?: (e: any) => void;
  showEmpty?: boolean;
};

const TableEmptyData = ({
  message,
  onClick,
  buttonText,
  showEmpty = true,
}: TableEmptyDataProps) => {
  return (
    <>
      {showEmpty ? (
        <TableEmptyContainer>
          <EmptyUpload
            buttonText={buttonText}
            message={message}
            onClick={onClick}
          />
        </TableEmptyContainer>
      ) : (
        <TableLoadingContainer />
      )}
    </>
  );
};

export default TableEmptyData;
