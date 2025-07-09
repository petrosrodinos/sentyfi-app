interface EmailHeaderProps {
  title?: string;
  description?: string;
}

export default function EmailHeader({ title = "Email Notifications", description = "Receive detailed notifications and market insights directly to your email inbox." }: EmailHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
