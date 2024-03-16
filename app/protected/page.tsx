"use client";
import { SortableItem } from "@/app/protected/SortableItem";
import AuthButton from "@/components/AuthButton";
import DeployButton from "@/components/DeployButton";
import Header from "@/components/Header";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { createClient } from "@/utils/supabase/client";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProtectedPage() {
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


  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user: fetchedUsed },
      } = await supabase.auth.getUser();
      console.log({ fetchedUsed })
      setUser(fetchedUsed);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (!user && !isLoading) {
    return redirect("/login");
  }

  if (isLoading) return (<div>Loading...</div>);

  return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full">
          <div className="py-6 font-bold bg-purple-950 text-center">
            This is a protected page that you can only see as an authenticated
            user
          </div>
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <DeployButton />
              <AuthButton />
            </div>
          </nav>
        </div>

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <Header />
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Next steps</h2>
            <FetchDataSteps />
          </main>
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
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </footer>
      </div>
  );
}
