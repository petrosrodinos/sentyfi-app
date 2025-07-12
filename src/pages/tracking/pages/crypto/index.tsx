import { TrackedItemTypes } from "../../../../features/tracking/interfaces/tracked-items";
import Tickers from "../../components/tickers";

export default function Crypto() {
  return <Tickers market={TrackedItemTypes.crypto} />;
}
