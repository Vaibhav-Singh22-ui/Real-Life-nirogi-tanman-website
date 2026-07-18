import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell, Trash2, CheckCheck, Info, Leaf, Video, ShieldAlert, Inbox } from "lucide-react";

type NotificationItem = {
  id: string;
  type: "care" | "diet" | "consultation" | "security";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "care",
    title: "Lab Report Reviewed & Verified",
    body: "Dr. Kavya Menon has reviewed and signed off on your Comprehensive Blood Panel report. Cortisol balances are updated.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: "notif-2",
    type: "diet",
    title: "Dietary Protocol Updated",
    body: "Anjali Rao updated your PCOS Balance plan. Tap to view the new recommended dinner list favoring higher fibers.",
    time: "5 hours ago",
    unread: true
  },
  {
    id: "notif-3",
    type: "consultation",
    title: "Upcoming Video Consultation Today",
    body: "Your follow-up video consultation with Dr. Kavya Menon is scheduled for today at 5:30 PM. Join link is active.",
    time: "1 day ago",
    unread: false
  },
  {
    id: "notif-4",
    type: "security",
    title: "System Login Alert",
    body: "A new session was successfully authenticated from a Chrome browser on Windows 11 in Bengaluru, India.",
    time: "3 days ago",
    unread: false
  }
];

const SharedNotificationsView = () => {
  const [list, setList] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllRead = () => {
    setList(prev => prev.map(item => ({ ...item, unread: false })));
    toast.success("All notifications marked as read.");
  };

  const clearAll = () => {
    setList([]);
    toast.info("Notifications archive cleared.");
  };

  const toggleRead = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, unread: !item.unread } : item));
  };

  const deleteItem = (id: string) => {
    setList(prev => prev.filter(item => item.id !== id));
    toast.success("Notification removed.");
  };

  const filtered = list.filter(item => filter === "all" ? true : item.unread);

  const getIcon = (type: string) => {
    switch (type) {
      case "care":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "diet":
        return <Leaf className="h-4 w-4 text-emerald-600" />;
      case "consultation":
        return <Video className="h-4 w-4 text-amber-600" />;
      case "security":
        default:
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "care":
        return "bg-blue-100 dark:bg-blue-950/20";
      case "diet":
        return "bg-emerald-100 dark:bg-emerald-950/20";
      case "consultation":
        return "bg-amber-100 dark:bg-amber-950/20";
      case "security":
      default:
        return "bg-red-100 dark:bg-red-950/20";
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header bar */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg border border-border bg-hero-gradient">
        <div className="space-y-1">
          <p className="uppercase-label text-primary">Inbox Messages</p>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Inbox & Alerts
          </h1>
          <p className="text-sm text-muted-foreground">Stay informed on care plans revisions, lab details, and billing.</p>
        </div>
        {list.length > 0 && (
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs h-9">
              <CheckCheck className="h-3.5 w-3.5 mr-1" /> Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground hover:text-red-500 h-9">
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear all
            </Button>
          </div>
        )}
      </section>

      {/* Filter tab buttons */}
      {list.length > 0 && (
        <div className="flex gap-2 border-b border-border/40 pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              filter === "all"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Notifications ({list.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              filter === "unread"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Unread ({list.filter(item => item.unread).length})
          </button>
        </div>
      )}

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <Card className="surface-panel py-12 flex flex-col items-center justify-center text-center">
          <CardContent className="space-y-3 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground">
              <Inbox className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {filter === "unread" ? "You have no unread notifications." : "Your inbox is empty."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <Card 
              key={item.id} 
              className={`surface-panel border transition-all duration-200 hover:border-primary/30 ${
                item.unread ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-4 flex gap-4 items-start justify-between">
                <div className="flex gap-3 items-start">
                  {/* Badge Icon */}
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${getBadgeColor(item.type)}`}>
                    {getIcon(item.type)}
                  </div>
                  
                  {/* Text details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold leading-tight ${item.unread ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.title}
                      </p>
                      {item.unread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal max-w-xl">
                      {item.body}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 font-medium">
                      {item.time}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => toggleRead(item.id)}
                    title={item.unread ? "Mark as Read" : "Mark as Unread"}
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                    onClick={() => deleteItem(item.id)}
                    title="Delete Notification"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedNotificationsView;
