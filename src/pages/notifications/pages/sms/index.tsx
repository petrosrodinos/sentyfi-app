import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../interfaces/notification-channels";
import { useNotificationChannels } from "../../hooks/use-notification-channels";
import Loader from "@/components/ui/loader";
import PhoneSetupCard from "./components/phone-setup-card";
import AlertTypesCard from "./components/alert-types-card";
import AlertFrequencyCard from "./components/alert-frequency-card";
import DangerZoneCard from "./components/danger-zone-card";

export default function SmsNotifications() {
  const { user_uuid } = useAuthStore();
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const {
    data: smsChannel,
    error,
    isLoading: isLoadingSmsChannel,
  } = useNotificationChannels({
    user_uuid: user_uuid!,
    channel: NotificationChannelTypes.sms,
  });

  useEffect(() => {
    if (smsChannel) {
      setSmsEnabled(smsChannel[0]?.enabled || false);
      setPhoneVerified(smsChannel[0]?.verified || false);
    }
  }, [smsChannel]);

  useEffect(() => {
    if (error) {
      setSmsEnabled(false);
      setPhoneVerified(false);
    }
  }, [error]);

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
