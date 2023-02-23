import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import React, { useState, useEffect } from "react";
import { VALID_DURATIONS_URL } from "./URL";
import axios from "axios";
import { Duration } from "./interface";

interface MultipleSelectChipProps {
  valueSetter: React.Dispatch<React.SetStateAction<Duration[]>>;
  isLoadingSetter: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const createDurationObj = (durations: string[]) => {
  return durations.map((duration) => {
    const [year, month] = duration.split("-");
    return {
      year: year,
      month: month,
    };
  });
};

export const MultipleSelectChip = ({
  valueSetter,
  isLoadingSetter,
}): React.Element<MultipleSelectChipProps> => {
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [allValidDurations, setAllValidDurations] = useState<Duration[]>([]);

  useEffect(() => {
    axios.get(VALID_DURATIONS_URL).then((response) => {
      setAllValidDurations(response.data.durations);
      isLoadingSetter(false);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedDuration>) => {
    const {
      target: { value },
    } = event;
    const duration = typeof value === "string" ? value.split(",") : value;
    setSelectedDuration(
      // On autofill we get a stringified value.
      duration
    );
    valueSetter(createDurationObj(duration));
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>期間</InputLabel>
        <Select
          multiple
          value={selectedDuration}
          onChange={handleChange}
          input={<OutlinedInput label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {allValidDurations.map(({ year, month }) => {
            const duration = `${year}-${month}`;
            return (
              <MenuItem key={duration} value={duration}>
                {duration}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
