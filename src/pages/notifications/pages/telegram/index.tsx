import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../interfaces/notification-channels";
import { useNotificationChannels } from "../../hooks/use-notification-channels";
import { BotSetupCard, AlertTypesCard, BotCommandsCard, MessageFrequencyCard, BenefitsCard, DangerZoneCard } from "./components";
import Loader from "@/components/ui/loader";

export default function TelegramNotifications() {
  const { user_uuid } = useAuthStore();
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);

  const { data: telegramChannel, isLoading: isLoadingTelegramChannel } = useNotificationChannels({
    user_uuid: user_uuid!,
    channel: NotificationChannelTypes.telegram,
  });

  useEffect(() => {
    if (telegramChannel) {
      setTelegramConnected(telegramChannel[0].verified);
      setTelegramEnabled(telegramChannel[0].enabled);
    }
  }, [telegramChannel]);

  const handleChannelDeleted = () => {
    setTelegramConnected(false);
    setTelegramEnabled(false);
  };

  if (isLoadingTelegramChannel) {
    return <Loader length={4} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Telegram Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications through our Telegram bot for market updates and portfolio alerts.</p>
      </div>

      <BotSetupCard user_uuid={user_uuid!} telegramChannel={telegramChannel} botConnected={telegramConnected} telegramEnabled={telegramEnabled} onBotConnectedChange={setTelegramConnected} onTelegramEnabledChange={setTelegramEnabled} />

      <Separator />

      {telegramConnected && (
        <>
          <AlertTypesCard telegramEnabled={telegramEnabled} />
          <BotCommandsCard />
          <MessageFrequencyCard telegramEnabled={telegramEnabled} />
        </>
      )}

      <BenefitsCard />

      {telegramConnected && <DangerZoneCard telegramChannel={telegramChannel} onChannelDeleted={handleChannelDeleted} />}
    </div>
  );
}
