import axios from "axios";
import { Duration, Report } from "./interface";
import { REPORT_URL } from "./URL";
import { useEffect, useState } from "react";
import { SingleCustomerInfo } from "./SingleCustomerInfo";
import { LoadingBackdrop } from "./LoadingBackDrop";

interface CustomerInfoProps {
  durations: Duration[];
}

export const CustomerInfoBoard: React.FC<CustomerInfoProps> = ({
  durations,
}) => {
  const [report, setReport] = useState<Report[]>([]);

  useEffect(() => {
    axios
      .post(REPORT_URL, {
        durations: durations,
      })
      .then((response) => {
        setReport(response.data.report);
      });
  }, [durations]);

  return (
    <>
      {report.map((customer, idx) => {
        return <SingleCustomerInfo key={idx} customer={customer} />;
      })}
    </>
  );
};
