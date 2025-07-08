import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useDeleteNotificationChannel } from "../../../hooks/use-notification-channels";
import { NotificationChannelTypes, type NotificationChannel } from "../../../interfaces/notification-channels";
import { useQueryClient } from "@tanstack/react-query";

interface DangerZoneCardProps {
  smsChannel: NotificationChannel[] | undefined;
}

export default function DangerZoneCard({ smsChannel }: DangerZoneCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteNotificationChannelMutation, isPending: isDeletingNotificationChannel } = useDeleteNotificationChannel();

  const handleDeleteChannel = () => {
    if (smsChannel && smsChannel[0]) {
      deleteNotificationChannelMutation(smsChannel[0].id.toString(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.sms] });
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
          <CardDescription>Remove SMS notification channel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">This will permanently remove your SMS notification channel. You will no longer receive notifications through SMS.</p>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeletingNotificationChannel}>
            {isDeletingNotificationChannel ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <IconTrash className="h-4 w-4 mr-2" />
                Remove SMS Channel
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} title="Remove SMS Channel" desc="Are you sure you want to remove your SMS notification channel? This action cannot be undone and you will no longer receive notifications through SMS." confirmText="Remove Channel" destructive isLoading={isDeletingNotificationChannel} handleConfirm={handleDeleteChannel} />
    </>
  );
}
