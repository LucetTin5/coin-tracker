import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../fetchers";
import { CoinImg, Container, Header, Title } from "./Coins";

interface RouteParams {
  coinId: string;
}
interface RouteState {
  state: {
    name: string;
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

// rank, symbol
// description

const Overview = styled.div``;
const InfoBox = styled.div`
  padding: 20px 50px;
  border-radius: 15px;
  background-color: black;
  display: flex;
  justify-content: space-between;
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: 12px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
`;
const Description = styled.p`
  margin: 10px;
  padding: 10px;
`;
const Tabs = styled.div`
  display: grid;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  background-color: black;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-transform: uppercase;
  }
  ${(props) => {
    if (props.isActive) {
      return `color: ${
        props.isActive ? props.theme.accentColor : props.theme.textColor
      }; font-weight: bold;`;
    }
  }}
`;

const Coin = () => {
  const { coinId } = useParams() as unknown as RouteParams;
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(
    ["coinInfo", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceInfo } = useQuery<PriceData>(
    ["priceInfo", coinId],
    () => fetchCoinPrice(coinId)
  );
  const loading = infoLoading || priceLoading;

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);

  //     setLoading(false);
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <Overview>
          <InfoBox>
            <InfoItem>
              <CoinImg
                src={`https://coinicons-api.vercel.app/api/icon/${info?.symbol.toLowerCase()}`}
                alt={info?.name + "image"}
              />
            </InfoItem>
            <InfoItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </InfoItem>
            <InfoItem>
              <span>Symbol</span>
              <span>${info?.symbol}</span>
            </InfoItem>
          </InfoBox>
          <Description>{info?.description}</Description>
          <InfoBox>
            <InfoItem>
              <span>total supply</span>
              <span>{priceInfo?.total_supply}</span>
            </InfoItem>
            <InfoItem>
              <span>max supply</span>
              <span>{priceInfo?.max_supply}</span>
            </InfoItem>
          </InfoBox>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={coinId} />
        </Overview>
      )}
    </Container>
  );
};

export default Coin;
