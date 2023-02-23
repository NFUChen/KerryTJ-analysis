import { useState } from "react";

import { MultipleSelectChip } from "./MultipleSelectChip";
import { Duration } from "./interface";
import { CustomerInfoBoard } from "./CustomerInfoBoard";
import Box from "@mui/material/Box";
import { LoadingBackdrop } from "./LoadingBackDrop";

export const DashBoard = () => {
  const [currentDurations, setCurrentDurations] = useState<Duration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      <LoadingBackdrop isOpen={isLoading} />
      <Box sx={{ minHeight: "10vh" }}>
        <MultipleSelectChip
          valueSetter={setCurrentDurations}
          isLoadingSetter={setIsLoading}
        />
      </Box>
      <Box sx={{ minHeight: "90vh" }}>
        <CustomerInfoBoard durations={currentDurations} />
      </Box>
    </>
  );
};
