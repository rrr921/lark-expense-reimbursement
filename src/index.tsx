import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as lark from "@lark-base-open/js-sdk";
import { Alert, AlertProps } from "antd";
import {exchange} from "./exchangeApi" 
function LoadApp() {
  const [info, setInfo] = useState("正在结汇中，请稍等....");
  const [alertType, setAlertType] = useState<AlertProps["type"]>("info");
  const [dateInfo, setDateInfo] = useState("");
  useEffect(() => {
    const fn = async () => {
      const table = await lark.bitable.base.getActiveTable();
      const tableName = await table.getName();
      const resultField = await table.getFieldByName<lark.IAttachmentField>("港币金额");
      const amountField = await table.getFieldByName<lark.IAttachmentField>("报销金额");
      const currencyField = await table.getFieldByName<lark.IAttachmentField>("币种");
      const dateField = await table.getFieldByName<lark.IAttachmentField>("消费日期");
      const recordIds = await table.getRecordIdList();

      for (const recordId of recordIds) {
        const amount = await amountField.getCell(recordId);
        const amountValue = await amount.getValue();
        const currency = await currencyField.getCell(recordId);
        const currencyValue = await currency.getValue();
        const exchangeTimeStamp = await dateField.getCell(recordId);
        const exchangeTimeStampValue = await exchangeTimeStamp.getValue();
        const exchangeDate = parseInt(JSON.stringify(exchangeTimeStampValue));
        const exchangeDateValue = new Date(exchangeDate);

        // 格式化日期
        const year = exchangeDateValue.getFullYear();
        const month = String(exchangeDateValue.getMonth() + 1).padStart(2, "0");
        const day = String(exchangeDateValue.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`; // yyyyMMdd
        setDateInfo(`The date is ${formattedDate}`);

        const a = JSON.stringify(amountValue);
        const currencyType = JSON.stringify(currencyValue);
        const match = currencyType.match(/"text":"(\w+)"/);
        if (match && amount && exchangeDate) {
          const mmm = exchange(match[1],'HKD',a,formattedDate);
          await table.setCellValue(resultField.id, recordId, await mmm);
        }
      }

      setInfo('结汇已完成');
      setAlertType("success");
    };

    fn();
  }, []);

  return (
    <div>
      <Alert message={info} type={alertType} />
      <Alert message={dateInfo} type={alertType} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoadApp />
  </React.StrictMode>
);
