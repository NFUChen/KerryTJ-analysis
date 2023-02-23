import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DetailInfo } from "./interface";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "year",
    headerName: "年",
    type: "string",
    width: 110,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "month",
    headerName: "月",
    type: "string",
    width: 110,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "day",
    headerName: "日",
    type: "string",
    width: 110,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "shipment_id",
    headerName: "托運編號",
    type: "string",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "quantity",
    headerName: "件數",
    type: "number",
    width: 110,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "collection_on_delivery",
    headerName: "代收貨款",
    type: "number",
    width: 110,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
];

interface DataFrameProps {
  rows: DetailInfo[];
}

export const DataFrame: React.FC<DataFrameProps> = ({ rows }) => {

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={30}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
