import { Separator } from "@/components/ui/separator";
import Loader from "@/components/ui/loader";
import EmailHeader from "./components/email-header";
import EmailSetupCard from "./components/email-setup-card";
import EmailPreferencesCard from "./components/email-preferences-card";
import EmailFrequencyCard from "./components/email-frequency-card";
import EmailDangerZoneCard from "./components/email-danger-zone-card";
import { useEmailNotifications } from "./hooks/use-email-notifications";

export default function EmailNotifications() {
  const { emailChannel, emailEnabled, emailVerified, isLoadingEmailChannel } = useEmailNotifications();

  if (isLoadingEmailChannel) {
    return <Loader length={4} />;
  }

  return (
    <div className="space-y-6">
      <EmailHeader />
      <EmailSetupCard emailEnabled={emailEnabled} emailVerified={emailVerified} emailChannel={emailChannel?.[0]!} />
      <Separator />
      {emailVerified && <EmailPreferencesCard emailEnabled={emailEnabled} />}
      {emailVerified && <Separator />}
      {emailVerified && <EmailFrequencyCard emailEnabled={emailEnabled} />}
      {emailVerified && <Separator />}
      {emailVerified && <EmailDangerZoneCard emailChannel={emailChannel} />}
    </div>
  );
}
