import pandas as pd

class CustomerInfo:
    def __init__(self, customer_df: pd.core.frame.DataFrame) -> None:
        self.customer_df = customer_df
    
    @property
    def total_collection_on_delivery(self) -> int:
        return int(self.customer_df["collection_on_delivery"].sum())
    
    @property
    def number_of_orders(self) -> int:
        return len(self.customer_df)
    
    @property
    def order_quantity(self) -> int:
        return int(self.customer_df["quantity"].sum())
        
    @property
    def customer_name(self) -> str:
        return list(self.customer_df["consignee"].unique()).pop()
    
    
    def info_to_dict(self) -> dict[str, str | int]:
        return {
            "customer_name": self.customer_name,
            "total_collection_on_delivery": self.total_collection_on_delivery,
            "number_of_orders": self.number_of_orders,
            "order_quantity": self.order_quantity,
            "detailed_info": list(self.customer_df.sort_values(["year", "month", "day"])
                                                  .to_dict("index")
                                                  .values()) # key is index
        }