const BASE_URL = "https://api.coinpaprika.com/v1";
const API_URL = "https://ohlcv-api.nomadcoders.workers.dev/";

export const fetchCoins = () =>
  fetch(`${BASE_URL}/coins`).then((res) => res.json());

export const fetchCoinInfo = (coinId: string) =>
  fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
export const fetchCoinPrice = (coinId: string) =>
  fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());

export const fetchCoinHistory = (coinId: string) =>
  fetch(`${API_URL}?coinId=${coinId}`).then((res) => res.json());
