import { useState } from "react"
import { Plus, Search, Bell } from "lucide-react"
import { Button }  from "./ui/Button";
import { Input } from "./ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Badge } from "./ui/Badge"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import { ProjectList } from "./ProjectList";
import { ProjectCard } from "./ProjectCard";
import { AddListDialog } from "./AddListDialog";
const initialLists = [
  {
    id: "1",
    title: "To Do",
    cards: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups for the new product landing page",
        labels: ["Design", "High Priority"],
        assignees: ["JD", "SM"],
        dueDate: "2024-01-15",
        comments: 3,
        attachments: 2,
      },
      {
        id: "2",
        title: "Set up project repository",
        labels: ["Development"],
        assignees: ["JD"],
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    cards: [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add login, signup, and password reset functionality",
        labels: ["Development", "Backend"],
        assignees: ["SM", "AL"],
        dueDate: "2024-01-20",
        comments: 5,
        attachments: 1,
      },
    ],
  },
  {
    id: "3",
    title: "Review",
    cards: [
      {
        id: "4",
        title: "Code review for API endpoints",
        labels: ["Review", "Backend"],
        assignees: ["AL"],
        comments: 2,
        attachments: 0,
      },
    ],
  },
  {
    id: "4",
    title: "Done",
    cards: [
      {
        id: "5",
        title: "Project setup and initial configuration",
        labels: ["Setup"],
        assignees: ["JD"],
        comments: 0,
        attachments: 1,
      },
    ],
  },
]

export default function ProjectBoard() {
  const [lists, setLists] = useState(initialLists)
  const [showAddList, setShowAddList] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  )

  const addList = (title) => {
    const newList = {
      id: Date.now().toString(),
      title,
      cards: [],
    }
    setLists([...lists, newList])
  }

  const handleDragStart = (event) => {
    const { active } = event
    const card = lists.flatMap((list) => list.cards).find((card) => card.id === active.id)
    setActiveCard(card || null)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    setLists((prev) => {
      const activeItems = prev.find((list) => list.id === activeContainer)?.cards || []
      const overItems = prev.find((list) => list.id === overContainer)?.cards || []

      const activeIndex = activeItems.findIndex((item) => item.id === activeId)
      const overIndex = overItems.findIndex((item) => item.id === overId)

      let newIndex
      if (overId in prev.reduce((acc, list) => ({ ...acc, [list.id]: list }), {})) {
        newIndex = overItems.length + 1
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1
        const modifier = isBelowOverItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return prev.map((list) => {
        if (list.id === activeContainer) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== activeId),
          }
        } else if (list.id === overContainer) {
          return {
            ...list,
            cards: [...list.cards.slice(0, newIndex), activeItems[activeIndex], ...list.cards.slice(newIndex)],
          }
        }
        return list
      })
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) {
      return
    }

    if (activeContainer === overContainer) {
      const containerIndex = lists.findIndex((list) => list.id === activeContainer)
      const items = lists[containerIndex].cards
      const oldIndex = items.findIndex((item) => item.id === activeId)
      const newIndex = items.findIndex((item) => item.id === overId)

      setLists((prev) => {
        const newLists = [...prev]
        newLists[containerIndex] = {
          ...newLists[containerIndex],
          cards: arrayMove(items, oldIndex, newIndex),
        }
        return newLists
      })
    }
  }

  const findContainer = (id) => {
    if (lists.some((list) => list.id === id)) {
      return id
    }

    return lists.find((list) => list.cards.some((card) => card.id === id))?.id
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Board Content */}
      <div className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 min-w-max">
            <SortableContext items={lists.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
              {lists.map((list) => (
                <ProjectList
                    key={list.id}
                    list={list}
                    onUpdateList={(updatedList) => {
                        setLists(lists.map((l) => (l.id === list.id ? updatedList : l)))
                    }}
                    openDropdownId={openDropdownId}
                    setOpenDropdownId={setOpenDropdownId}
                />
              ))}
            </SortableContext>

            {/* Add List Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                className="w-72 h-12 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary"
                onClick={() => setShowAddList(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add another list
              </Button>
            </div>
          </div>

          {createPortal(
            <DragOverlay>{activeCard ? <ProjectCard card={activeCard} isDragging /> : null}</DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>

      <AddListDialog open={showAddList} onOpenChange={setShowAddList} onAddList={addList} />
    </div>
  )
}