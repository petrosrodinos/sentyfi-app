import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteNotificationChannel } from "../../../../../features/notifications/hooks/use-notification-channels";
import { NotificationChannelTypes, type NotificationChannel } from "../../../../../features/notifications/interfaces/notification-channels";
import { useQueryClient } from "@tanstack/react-query";

interface DangerZoneCardProps {
  telegramChannel: NotificationChannel[] | undefined;
}

export default function DangerZoneCard({ telegramChannel }: DangerZoneCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteNotificationChannelMutation, isPending: isDeletingNotificationChannel } = useDeleteNotificationChannel();

  const handleDeleteChannel = () => {
    if (telegramChannel && telegramChannel[0]) {
      deleteNotificationChannelMutation(telegramChannel[0].id.toString(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.telegram] });
          setShowDeleteDialog(false);
        },
      });
    }
  };

  return (
    <>
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">Danger Zone</CardTitle>
          <CardDescription>Remove Telegram notification channel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">This will permanently remove your Telegram notification channel. You will no longer receive notifications through Telegram.</p>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeletingNotificationChannel}>
            {isDeletingNotificationChannel ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <IconTrash className="h-4 w-4 mr-2" />
                Remove Telegram Channel
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} title="Remove Telegram Channel" desc="Are you sure you want to remove your Telegram notification channel? This action cannot be undone and you will no longer receive notifications through Telegram." confirmText="Remove Channel" destructive isLoading={isDeletingNotificationChannel} handleConfirm={handleDeleteChannel} />
    </>
  );
}
