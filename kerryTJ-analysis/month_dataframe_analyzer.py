import pandas as pd
from customer_info import CustomerInfo

class MonthDataFrameAnalyzer:
    def __init__(self, month_df: pd.core.frame.DataFrame) -> None:
        self.month_df = month_df
        
        self.info_groupby_customer: list[dict[str, str | int]] = [
            CustomerInfo(df).info_to_dict() for _ , df in self.month_df.groupby("consignee")
        ]