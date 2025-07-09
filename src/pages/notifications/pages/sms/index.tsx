import { Separator } from "@/components/ui/separator";
import Loader from "@/components/ui/loader";
import PhoneSetupCard from "./components/phone-setup-card";
import AlertTypesCard from "./components/alert-types-card";
import AlertFrequencyCard from "./components/alert-frequency-card";
import DangerZoneCard from "./components/danger-zone-card";
import { useSmsNotifications } from "./hooks/use-sms-notifications";

export default function SmsNotifications() {
  const { smsChannel, smsEnabled, phoneVerified, isLoadingSmsChannel } = useSmsNotifications();

  if (isLoadingSmsChannel) {
    return <Loader length={4} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SMS Notifications</h2>
        <p className="text-muted-foreground">Receive instant text message alerts for critical market events and portfolio updates.</p>
      </div>

      <PhoneSetupCard smsEnabled={smsEnabled} phoneVerified={phoneVerified} smsChannel={smsChannel?.[0]!} />

      <Separator />

      {phoneVerified && <AlertTypesCard smsEnabled={smsEnabled} />}

      {phoneVerified && <AlertFrequencyCard smsEnabled={smsEnabled} />}

      {phoneVerified && <Separator />}

      {phoneVerified && <DangerZoneCard smsChannel={smsChannel} />}
    </div>
  );
}
