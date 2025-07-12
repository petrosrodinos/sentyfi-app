import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteNotificationChannel } from "../../../../../features/notifications/hooks/use-notification-channels";
import { NotificationChannelTypes, type NotificationChannel } from "../../../../../features/notifications/interfaces/notification-channels";
import { useQueryClient } from "@tanstack/react-query";

interface EmailDangerZoneCardProps {
  emailChannel: NotificationChannel[] | undefined;
}

export default function EmailDangerZoneCard({ emailChannel }: EmailDangerZoneCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteNotificationChannelMutation, isPending: isDeletingNotificationChannel } = useDeleteNotificationChannel();

  const handleDeleteChannel = () => {
    if (emailChannel && emailChannel[0]) {
      deleteNotificationChannelMutation(emailChannel[0].id.toString(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notification-channels", NotificationChannelTypes.email] });
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
          <CardDescription>Remove email notification channel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">This will permanently remove your email notification channel. You will no longer receive notifications through email.</p>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeletingNotificationChannel}>
            {isDeletingNotificationChannel ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <IconTrash className="h-4 w-4 mr-2" />
                Remove Email Channel
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} title="Remove Email Channel" desc="Are you sure you want to remove your email notification channel? This action cannot be undone and you will no longer receive notifications through email." confirmText="Remove Channel" destructive isLoading={isDeletingNotificationChannel} handleConfirm={handleDeleteChannel} />
    </>
  );
}
