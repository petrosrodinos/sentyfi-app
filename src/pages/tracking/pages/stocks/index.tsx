import { TrackedItemTypes } from "../../interfaces/tracked-items";
import Tracking from "../../index";

export default function Stocks() {
  return <Tracking market={TrackedItemTypes.stock} />;
}
