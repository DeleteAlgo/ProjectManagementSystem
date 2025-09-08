import { Calendar, MessageCircle, Paperclip, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Avatar, AvatarFallback } from "./ui/Avatar"
import { Button } from "./ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const labelColors = {
  Design: "bg-blue-500 text-blue-800 border-blue-200",
  Development: "bg-green-500 text-green-800 border-green-200",
  Backend: "bg-purple-500 text-purple-800 border-purple-200",
  Review: "bg-orange-500 text-orange-800 border-orange-200",
  Setup: "bg-gray-500 text-gray-800 border-gray-200",
  "High Priority": "bg-red-500 text-red-800 border-red-200",
}

export function ProjectCard({ card, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: card.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  }

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date()

  return (
    
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-background border-border hover:shadow-md transition-shadow cursor-pointer group border border-gray-600"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2 ">
          <h4 className="font-medium text-sm text-foreground leading-tight flex-1 text-pretty">{card.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-11 flex-shrink-0 ml-2"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit card</DropdownMenuItem>
              <DropdownMenuItem>Copy card</DropdownMenuItem>
              <DropdownMenuItem>Move card</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete card</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {card.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{card.description}</p>}

        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {card.labels.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className={`text-xs px-2 py-0.5 ${labelColors[label] || "bg-secondary text-secondary-foreground"}`}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.dueDate && (
              <div
                className={`flex items-center gap-1 text-xs ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}
              >
                <Calendar className="h-3 w-3" />
                {new Date(card.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}

            {card.comments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="h-3 w-3" />
                {card.comments}
              </div>
            )}

            {card.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Paperclip className="h-3 w-3" />
                {card.attachments}
              </div>
            )}
          </div>

          {card.assignees.length > 0 && (
            <div className="flex -space-x-1">
              {card.assignees.slice(0, 3).map((assignee, index) => (
                <Avatar key={assignee} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">{assignee}</AvatarFallback>
                </Avatar>
              ))}
              {card.assignees.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{card.assignees.length - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}