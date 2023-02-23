export interface Duration {
  year: number;
  month: number;
}

export interface DetailInfo {
  id: number;
  collection_on_delivery: number;
  consignee: string;
  year: number;
  month: number;
  day: number;
  quantity: number;
  shipment_id: string;
}

export interface Report {
  customer_name: string;
  number_of_orders: number;
  order_quantity: number;
  total_collection_on_delivery: number;
  detailed_info: DetailInfo[];
}
