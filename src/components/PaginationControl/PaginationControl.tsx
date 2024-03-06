import { Box, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

type PaginationProps = {
  totalPages: number;
  itemsPerPage: number;
  initialPage: number;
  disabled: boolean;
  onPageChange: (page: number, itemsPerPage: number) => void;
};

export const PaginationControl = (pagination: PaginationProps) => {
  const { totalPages, onPageChange, itemsPerPage, initialPage } = pagination;
  const [activePage, setActivePage] = useState(initialPage);
  const onPageChangeHandler = (page: number) => {
    onPageChange(page, itemsPerPage);
    setActivePage(page);
  };

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <Box>
      <HStack>
        {pagesArray.map(pageNumber => (
          <Button
            key={pageNumber}
            data-testid={`pagination-button-${pageNumber}`}
            isDisabled={pagination.disabled}
            colorScheme={activePage === pageNumber ? "blue" : "gray"}
            onClick={() => {
              onPageChangeHandler(pageNumber);
            }}
          >
            {pageNumber}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};
