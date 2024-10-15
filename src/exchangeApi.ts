import axios from "axios";

export async function exchange(currencyType1: string, currencyType2: string, amount: string, exchangeDate: string) {
    try {
        // 构建获取汇率的 URL
        const url = `https://openexchangerates.org/api/historical/${exchangeDate}.json`;

        // 第一次请求：获取 currencyType1 到 USD 的汇率
        const responseToUSD1 = await axios.get(url, {
            params: {
                app_id: 'USE YOUR OWN APPID',
                symbols: currencyType1,
            }
        });

        const rateToUSD1 = responseToUSD1.data.rates[currencyType1];

        // 第二次请求：获取 currencyType2 到 USD 的汇率
        const responseToUSD2 = await axios.get(url, {
            params: {
                app_id: 'USE YOUR OWN APPID',
                symbols: currencyType2,
            }
        });

        const rateToUSD2 = responseToUSD2.data.rates[currencyType2];

        // 计算 currencyType1 到 currencyType2 的汇率
        const exchangeRate = rateToUSD2 / rateToUSD1;

        // 计算转换后的金额
        const convertedAmount = (parseFloat(amount) * exchangeRate).toFixed(2);

        // 返回汇率数据和转换后的金额
        return convertedAmount;

    } catch (error) {
        console.error('获取汇率失败:', error);
        return null;
    }
}