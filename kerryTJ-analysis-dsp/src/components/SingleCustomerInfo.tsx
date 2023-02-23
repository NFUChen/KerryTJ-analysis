import { Box, Typography } from "@mui/material";
import { Report } from "./interface";
import Stack from "@mui/material/Stack";
import { DataFrame } from "./DataFrame";

interface SingleCustomerInfoProps {
  customer: Report;
}

export const SingleCustomerInfo: React.FC<SingleCustomerInfoProps> = ({
  customer,
}) => {
  let {
    customer_name: customerName,
    order_quantity: orderQuantity,
    number_of_orders: numberOfOrders,
    total_collection_on_delivery: totalCollectionOnDelivery,
    detailed_info: detailedInfo,
  } = customer;
  detailedInfo = detailedInfo.map((row, idx) => {
    return {
      ...row,
      id: idx,
    };
  });
  return (
    <Box margin={"1rem"}>
      <Typography fontSize={"3rem"}>{customerName}</Typography>
      <DataFrame rows={detailedInfo} />
      <Stack
        margin={"1rem"}
        direction="row"
        justifyContent="space-between"
        textAlign={"center"}
      >
        <Typography variant="h5">訂貨量: {orderQuantity}</Typography>
        <Typography variant="h5">期間訂貨次數: {numberOfOrders}</Typography>
        <Typography variant="h5">
          代收貨款: {totalCollectionOnDelivery}
        </Typography>
      </Stack>
    </Box>
  );
};
