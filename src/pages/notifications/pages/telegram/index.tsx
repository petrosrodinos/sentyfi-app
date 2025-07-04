import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth";
import { NotificationChannelTypes } from "../../interfaces/notification-channels";
import { useNotificationChannels } from "../../hooks/use-notification-channels";
import SkeletonLoader from "../../components/skeleton-loader";
import { BotSetupCard, AlertTypesCard, BotCommandsCard, MessageFrequencyCard, BenefitsCard, DangerZoneCard } from "./components";

export default function TelegramNotifications() {
  const { user_uuid } = useAuthStore();
  const [botConnected, setBotConnected] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);

  const { data: telegramChannel, isLoading: isLoadingTelegramChannel } = useNotificationChannels({
    user_uuid: user_uuid!,
    channel: NotificationChannelTypes.telegram,
  });

  useEffect(() => {
    if (telegramChannel) {
      setBotConnected(telegramChannel[0].verified);
      setTelegramEnabled(telegramChannel[0].enabled);
    }
  }, [telegramChannel]);

  const handleChannelDeleted = () => {
    setBotConnected(false);
    setTelegramEnabled(false);
  };

  if (isLoadingTelegramChannel) {
    return <SkeletonLoader className="h-full" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Telegram Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications through our Telegram bot for market updates and portfolio alerts.</p>
      </div>

      <BotSetupCard user_uuid={user_uuid!} telegramChannel={telegramChannel} botConnected={botConnected} telegramEnabled={telegramEnabled} onBotConnectedChange={setBotConnected} onTelegramEnabledChange={setTelegramEnabled} />

      <Separator />

      {botConnected && (
        <>
          <AlertTypesCard telegramEnabled={telegramEnabled} />
          <BotCommandsCard />
          <MessageFrequencyCard telegramEnabled={telegramEnabled} />
        </>
      )}

      <BenefitsCard />

      {botConnected && <DangerZoneCard telegramChannel={telegramChannel} onChannelDeleted={handleChannelDeleted} />}
    </div>
  );
}
