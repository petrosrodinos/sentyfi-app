import { Separator } from "@/components/ui/separator";
import { BotSetupCard, AlertTypesCard, MessageFrequencyCard, DangerZoneCard } from "./components";
import Loader from "@/components/ui/loader";
import { useTelegramNotifications } from "./hooks/use-telegram-notifications";

export default function TelegramNotifications() {
  const { telegramChannel, telegramConnected, telegramEnabled, isLoadingTelegramChannel, user_uuid } = useTelegramNotifications();

  if (isLoadingTelegramChannel) {
    return <Loader length={4} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Telegram Notifications</h2>
        <p className="text-muted-foreground">Receive instant notifications through our Telegram bot for market updates and portfolio alerts.</p>
      </div>

      <BotSetupCard user_uuid={user_uuid!} telegramChannel={telegramChannel} botConnected={telegramConnected} telegramEnabled={telegramEnabled} />

      <Separator />

      {telegramConnected && (
        <>
          <AlertTypesCard telegramEnabled={telegramEnabled} />
          <MessageFrequencyCard telegramEnabled={telegramEnabled} />
        </>
      )}

      {telegramConnected && <DangerZoneCard telegramChannel={telegramChannel} />}
    </div>
  );
}
