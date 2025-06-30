import { TrackedItemTypes } from "../../interfaces/tracked-items";
import Tracking from "../../index";

export default function Crypto() {
  return <Tracking market={TrackedItemTypes.crypto} />;
}
