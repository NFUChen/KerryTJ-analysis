import pandas as pd
import threading
import glob
import time
from month_dataframe_analyzer import MonthDataFrameAnalyzer


class DurationInvalidError(Exception):
    pass

class CustomerInfoLocator:
    def __init__(self, file_pattern: str) -> None:
        self.file_pattern = file_pattern
        self.files = glob.glob(self.file_pattern)
        
        self.raw_df = (
            pd.concat([pd.read_csv(file) for file in self.files], axis = 0, ignore_index= True)
              .dropna(axis = 1, how="all")
        )
        self._process()
        
        self.info_groupby_year_and_month:dict[tuple[int, int], list[dict[str, str | int]]] = {
            name: _df for name, _df in self.raw_df.groupby(["year", "month"])
        }
    
    def get_valid_durations(self) -> list[dict[str, str]]:
        return [{ "year": int(year), "month": int(month) }
                for year, month in self.info_groupby_year_and_month.keys()]

    def locate_based_on_year_month(self, year_month_list: list[tuple[int, int]]) -> pd.core.frame.DataFrame:
        
        for year, month in year_month_list:
            current_key = (year, month)
            if current_key not in self.info_groupby_year_and_month:
                raise DurationInvalidError(f"Duration {current_key} invalid, please enter one of the following {list(self.info_groupby_year_and_month.keys())}")

        result_df = pd.concat([ self.info_groupby_year_and_month[(year, month)] 
                for year, month in year_month_list], axis = 0, ignore_index= True)
    
        
        return MonthDataFrameAnalyzer(result_df).info_groupby_customer
        
    
        
        
    
    def _process(self) -> None:
        self.raw_df["託運日期"] = pd.to_datetime(self.raw_df["託運日期"],format="%Y%m%d")
        self.raw_df["年"] = self.raw_df["託運日期"].dt.year
        self.raw_df["月"] = self.raw_df["託運日期"].dt.month
        self.raw_df["日"] = self.raw_df["託運日期"].dt.day
        
        rename_col_dict = {
            "收貨人": "consignee",
            "代收貨款": "collection_on_delivery",
            "件數": "quantity",
            "年": "year",
            "月": "month",
            "日": "day",
            "託運單號": "shipment_id"
        }

        self.raw_df.rename(columns = rename_col_dict, inplace= True)
        
        dropped_cols = ["託運人編號", "託運人名稱"]
        self.raw_df.drop(columns = dropped_cols, inplace = True)

    def _update(self) -> None:
        while (True):
            self = self.__init__(self.file_pattern)
            time.sleep(3600)
    def keep_update(self) -> None:
        threading.Thread(target= self._update).start()
        
    