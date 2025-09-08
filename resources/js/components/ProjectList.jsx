import { useState } from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ProjectCard } from "./ProjectCard"
import { AddCardDialog } from "./AddCardDialog"

export function ProjectList({ list, onUpdateList, openDropdownId, setOpenDropdownId })  {
  const [showAddCard, setShowAddCard] = useState(false)

  const { setNodeRef } = useDroppable({
    id: list.id,
  })

  // const newList = { id, title, cards: [] };
  // const cardIndex = list.cards.findIndex((card) => card.id === activeCardId);
  
  const addCard = (title, description) => {
    const newCard = {
      id: Date.now().toString(),
      title,
      description,
      labels: [],
      assignees: [],
      comments: 0,
      attachments: 0,
    }

    onUpdateList({
      ...list,
      cards: [...list.cards, newCard],
    })
  }

  return (
    <div className="flex-shrink-0 w-72">
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">{list.title}</h3>
            <DropdownMenu
              open={openDropdownId === list.id}
              onOpenChange={(open) => {
                setOpenDropdownId(open ? list.id : null);
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Add card</DropdownMenuItem>
                <DropdownMenuItem>Copy list</DropdownMenuItem>
                <DropdownMenuItem>Move list</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete list</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-sm text-muted-foreground">
            {list.cards.length} {list.cards.length === 1 ? "card" : "cards"}
          </div>
        </CardHeader>

        <CardContent className="space-y-3" ref={setNodeRef}>
          <SortableContext
            items={(list.cards || []).filter(card => card && card.id).map(card => card.id)}
            strategy={verticalListSortingStrategy}
          >
            {(list.cards || []).filter(card => card && card.id).map(card => (
              <ProjectCard key={card.id} card={card} />
            ))}
          </SortableContext>

          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50 "
            onClick={() => setShowAddCard(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add a card
          </Button>
        </CardContent>
      </Card>

      <AddCardDialog open={showAddCard} onOpenChange={setShowAddCard} onAddCard={addCard} />
    </div>
  )
}