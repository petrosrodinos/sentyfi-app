import { useUsers, useDeleteUser } from "@/features/user/hooks/use-user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@/features/user/interfaces/user";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { IconDotsVertical, IconBrandTelegram, IconMail, IconMessageCircle, IconTrash } from "@tabler/icons-react";
import { NotificationChannelTypes } from "@/features/notifications/interfaces/notification-channels";

const Users = () => {
  const { data, isLoading, error } = useUsers({
    // page: 1,
    // limit: 50,
  });
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async (uuid: string) => {
    await deleteUserMutation.mutateAsync(uuid);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getChannelIcon = (channelType: string) => {
    switch (channelType) {
      case NotificationChannelTypes.telegram:
        return <IconBrandTelegram size={16} />;
      case NotificationChannelTypes.email:
        return <IconMail size={16} />;
      case NotificationChannelTypes.sms:
        return <IconMessageCircle size={16} />;
      default:
        return null;
    }
  };

  const getChannelLabel = (channelType: string) => {
    switch (channelType) {
      case NotificationChannelTypes.telegram:
        return "Telegram";
      case NotificationChannelTypes.email:
        return "Email";
      case NotificationChannelTypes.sms:
        return "SMS";
      default:
        return channelType;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6" />
                  <Skeleton className="h-4 w-1/6" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p>Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const users = data?.data || data || [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Ref Code</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: User) => (
                  <TableRow key={user.uuid}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.ref_code || "N/A"}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      {user.notification_channels && user.notification_channels.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.notification_channels.map((channel) => (
                            <Badge key={channel.uuid} variant="outline" className="text-xs">
                              {getChannelLabel(channel.channel)}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <IconDotsVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.notification_channels && user.notification_channels.length > 0 ? (
                              user.notification_channels.map((channel) => (
                                <DropdownMenuItem key={channel.uuid} className="flex items-center gap-2">
                                  {getChannelIcon(channel.channel)}
                                  <span>{getChannelLabel(channel.channel)}</span>
                                  <Badge variant={channel.enabled ? "default" : "secondary"} className="ml-auto text-xs">
                                    {channel.enabled ? "Enabled" : "Disabled"}
                                  </Badge>
                                </DropdownMenuItem>
                              ))
                            ) : (
                              <DropdownMenuItem disabled>
                                <span className="text-muted-foreground">No channels</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" disabled={deleteUserMutation.isPending}>
                              <IconTrash size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete user <strong>{user.email}</strong>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUser(user.uuid)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteUserMutation.isPending}>
                                {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
