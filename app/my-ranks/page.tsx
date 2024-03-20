"use client"
import { useUserContext } from "@/app/layout";
import { SortableItem } from "@/app/my-ranks/SortableItem";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProtectedPage() {
  const { user, setUser } = useUserContext();
  const supabase = createClient();
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user: fetchedUsed },
        } = await supabase.auth.getUser();
        setUser(fetchedUsed);
      } catch (error) {
        return;
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [supabase.auth, setUser]);

  if (!user && !isLoading) {
    return redirect("/login");
  }

  if (isLoading) return (<div>Loading...</div>);

  return (
    <div>
      <div>
        <div>
            This is a protected page that you can only see as an authenticated
            user
        </div>
        <nav>
          <div>
            <AuthButton />
          </div>
        </nav>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(id => <SortableItem key={id} id={id}>{id}</SortableItem>)}
        </SortableContext>
      </DndContext>
    </div>
  );
}
