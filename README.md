# Lark Expense Reimbursement Plugin

## English Version

This is a Lark plugin for automatic currency conversion of expense reimbursements. It allows employees to submit claims in various currencies and view totals seamlessly in HKD.

### Features
- Automatic currency conversion based on specified column names.
- Reads the following columns:
  - Currency
  - Expense Amount
  - Expense Date
- Default target currency for conversion is HKD.
- The converted amount will be displayed in the column named "HKD Amount".

### Setup Instructions
1. Clone the project to your local machine.
2. Navigate to the project directory.
3. Run the following commands:
   ```bash
   npm install
   npm run start
4. After obtaining the corresponding URL, copy it into the custom plugin URL field in the multi-dimensional table to enable automatic currency conversion.

## 中文版本

这是一个Lark插件，用于自动进行报销的货币转换。它允许员工以各种货币提交报销申请，并无缝地以港币查看总额。

### 功能
- 基于指定列名的自动货币转换。
- 读取以下列：
  - 币种
  - 报销金额
  - 消费日期
- 默认目标货币为港币。
- 转换后的金额将在名为“港币金额”的列中显示。

### 安装说明
1. 将项目克隆到本地计算机。
2. 进入项目目录。
3. 运行以下命令：
   ```bash
   npm install
   npm run start
4. 获得对应的URL后，将其复制到多维表格的自定义插件URL字段中，以启用自动结汇功能。
