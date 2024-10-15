import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as lark from '@lark-base-open/js-sdk';
import { Alert, AlertProps } from 'antd';

function LoadApp() {
  const [info, setInfo] = useState('正在结汇中，请稍等....');
  const [ab, setAb] = useState('正在结汇中，请稍等....');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');
  const [currencyInfo, setCurrencyInfo] = useState('');
  useEffect(() => {
    const fn = async () => {
      const table = await lark.bitable.base.getActiveTable();
      const tableName = await table.getName();
      const resultField = await table.getFieldByName<lark.IAttachmentField>("港币金额");
      const amountField = await table.getFieldByName<lark.IAttachmentField>("报销金额"); // 获取金额字段
      const currencyField = await table.getFieldByName<lark.IAttachmentField>("币种"); // 获取币种字段
      const recordIds = await table.getRecordIdList();
      const fieldMetaList = await table.getFieldMetaListByType<lark.ICurrencyFieldMeta>(lark.FieldType.Currency);
      for (const recordId of recordIds) {
        const amount = await amountField.getCell(recordId);
        const amountValue = await amount.getValue();
        const currency = await currencyField.getCell(recordId);
        const currencyValue = await currency.getValue();
        
        setCurrencyInfo(JSON.stringify(currencyValue));
        //setAb(`${currencyValue}`);
          //const amount = record.fields[amountField.id]; // 获取金额
          //const currency = record.fields[currencyField.id]; // 获取币种

          // 这里可以根据币种进行汇率转换，假设我们有一个函数 convertToHKD
          //const convertedValue = convertToHKD(amount, currency);

          // 更新当前列的值
          await table.setCellValue(resultField.id, recordId, 1);
        
      }

      setInfo(`The table Name is ${tableName} and records updated.`);
      setAlertType('success');
    };

    fn();
  }, []);


  return (
    <div>
      <Alert message={info} type={alertType} />
      <Alert message={ab} type={alertType} />
      <Alert message={currencyInfo} type={alertType} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadApp />
  </React.StrictMode>
);