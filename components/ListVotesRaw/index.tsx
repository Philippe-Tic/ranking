import { Card, VStack } from '@chakra-ui/react';

const ListVotesRaw = ({ votes }: { votes: string[]}) => {
  return (
    <VStack w='full' alignItems='center'>
      {/* Your component content goes here */}
      {votes.map((vote) => (
        <Card fontWeight="bold" p="3" w="full" key={vote}>
          {vote}
        </Card>
      ))}
    </VStack>
  );
};

export default ListVotesRaw;