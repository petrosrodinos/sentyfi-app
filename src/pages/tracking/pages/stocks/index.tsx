import { TrackedItemTypes } from "../../interfaces/tracked-items";
import Tickers from "../../components/tickers";

export default function Stocks() {
  return <Tickers market={TrackedItemTypes.stock} />;
}
