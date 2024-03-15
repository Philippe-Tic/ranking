import { useUserContext } from "@/components/AppContent";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { Avatar, Card, HStack, Icon, IconButton, Text, useToast } from "@chakra-ui/react";
import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { FaCheck, FaPaperPlane } from "react-icons/fa6";

type UserCardProps = {
  invites: any;
  votes: any;
  id: string | null;
  global_name: string | null;
  picture: string | null;
  full_name: string | null;
  projectId: string;
  projectTitle: string;
}

export const UserCard = ({ invites, votes, id, global_name, picture, full_name, projectId, projectTitle }: UserCardProps) => {
  const { user } = useUserContext();
  const supabase = useSupabaseBrowser();
  const toast = useToast();
  const { mutateAsync: addInvite, isPending } = useInsertMutation(
    supabase.from('invites'),
    ["id"],
    "",
    {
      onSuccess() {
        toast({
          title: 'Invitation envoyée',
          status: 'success',
          duration: 3000,
        });
      }
    }
  );

  const isInvited = invites?.some((invite: any) => invite.target_user_id === id);
  const isVoting = votes?.some((vote: any) => vote.user_id === id);
  const isAlreadyInvited = isInvited || isVoting;

  return (
    <Card key={global_name} w="full" p="4" my="2" alignItems="center">
      <HStack w="full" spacing='4'>
        {picture && <Avatar src={picture} name={full_name || 'avatar'} />}
        <Text flex='1' noOfLines={1}>{full_name}</Text>
        <IconButton isLoading={isPending} aria-label="add" icon={<Icon as={isAlreadyInvited ? FaCheck : FaPaperPlane} />} onClick={() =>
          addInvite([{
            target_user_id: id || '',
            emitter: user?.user_metadata?.full_name,
            project_id: projectId,
            project_name: projectTitle,
          }])
        }
        isDisabled={isAlreadyInvited}
        />
      </HStack>
    </Card>
  )
}
