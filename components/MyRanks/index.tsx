"use client"
import { useUserContext } from "@/components/AppContent";
import { InlineMessage } from "@/components/InlineMessage";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { Button, HStack, SimpleGrid, Spinner, VStack, useToast } from "@chakra-ui/react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useUpdateMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { useState } from "react";
import { SortableItem } from "./SortableItem";

export type VoteProps = {
  id: string;
  rank: number;
}

export type StatusType = "todo" | "doing" | "done";

export const MyRanks = ({ status, vote, voteId }: {
  status?: StatusType;
  vote: VoteProps[],
  voteId: string
}) => {
  const { isLoading: isLoadingUser } = useUserContext();
  const supabase = useSupabaseBrowser();
  const [items, setItems] = useState(vote);
  const toast = useToast();
  const [statusPending, setStatusPending] = useState<"doing" | "done">();

  const { mutateAsync: updateVote, isPending } = useUpdateMutation(
    supabase.from('votes'),
    ["id"],
    "",
    {
      onSuccess() {
        toast({
          title: 'Vote mis à jour',
          status: 'success',
          duration: 3000,
        });
      }
    }
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        const formatedRankItems = newItems.map((item: VoteProps, index: number) => ({ id: item.id, rank: index + 1 }));
        return formatedRankItems;
      });
    }
  }

  const handleUpdate = (status: "doing" | "done") => async () => {
    setStatusPending(status);
    await updateVote({
      id: voteId,
      vote: items,
      status
    })
  }

  if (isLoadingUser) return (<Spinner />);

  const isPendingDoing = statusPending === "doing" && isPending;
  const isPendingDone = statusPending === "done" && isPending;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <SimpleGrid w="full" columns={{base: 1, md: 2}} gap="4">
          <InlineMessage title="Information sur le vote" message="Ordonnez en glissant et déposant les éléments à trier. Vous pouvez sauvegarder et envoyer votre vote. Une fois votre vote envoyé, vous ne pourrez plus le modifier." />
          <VStack>
            {items.map(({ id, rank }) => <SortableItem isDisabled={status === "done"}  rank={rank} key={id} id={id}>{id}</SortableItem>)}
            {status === "done" && <InlineMessage size="sm" status="success" title="Vote envoyé" message="Votre vote a bien été envoyé." />}
            {status !== "done" &&
              (
                <HStack w="full">
                  <Button variant="secondary" w="full" isDisabled={isPending} isLoading={isPendingDoing} onClick={handleUpdate("doing")}>Sauvegarder</Button>
                  <Button w="full" isDisabled={isPending} isLoading={isPendingDone} onClick={handleUpdate("done")}>Voter</Button>
                </HStack>
              )}
          </VStack>
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  );
}
