import { Card, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaMedal } from 'react-icons/fa6';
import { MdDragIndicator } from 'react-icons/md';

type SortableItemType = {
  isDisabled: boolean;
  rank: number;
  id: string;
  children: React.ReactNode;
}

export const SortableItem = ({isDisabled, rank, id, children}: SortableItemType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const medalColor: { [key: number]: string } = {
    1: '#FFBF00',
    2: '#C0C0C0',
    3: '#b87333',
  };

  const props = isDisabled ? {

  } : {
    ref: setNodeRef,
    ...style,
    ...attributes,
    ...listeners,
  }

  return (
    <Card {...props} w="full" bg={'white'} sx={{
      '&': {
        touchAction: 'none',
      }
    }}>
      <HStack w="full" p="4" role="group" maxW="full">
        {rank < 4 && (<Icon boxSize='1.2rem' as={FaMedal} color={medalColor[rank]} />)}
        <Text noOfLines={1} maxW="full" flex="1" fontWeight="bold">{`${rank >= 4 ? `${rank} - ` : ''}`}{children}</Text>
        <IconButton isDisabled={isDisabled} size="sm" variant="solid" colorScheme="gray" aria-label='deplacer' icon={<Icon as={MdDragIndicator} />} _groupHover={{bg: 'gray.200' }} />
      </HStack>
    </Card>
  );
}
