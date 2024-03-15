import { Link } from '@chakra-ui/next-js';
import { Box, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react';

export type ProjectType = {
  id: string;
  image: string | null;
  title: string | null;
  description: string | null;
  created_at: string | null;
};

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const { id, image, title, description } = project;
  return (
    <Box as={Link} border="1px solid" borderColor='gray.300' href={`/projects/${id}`} cursor='pointer' position='relative' role='group' borderRadius='lg' w='full' h="15rem" overflow='hidden'>
      {image && <Image position='absolute' src={image} alt={title || ''} w='full' h='full' objectFit='cover' objectPosition='center' transition="0.2s ease" _groupHover={{
        transform: 'scale(1.15)'
      }} />}
      <VStack w='full' boxShadow="inset 0px -50px 50px 1px rgba(0,0,0,0.5)" position='absolute' maxH='full' top='0' h='full' alignItems='flex-start'>
        <Spacer />
        <Heading w='full' px='4' textShadow='0px 0px 7px rgba(0,0,0,8)' noOfLines={1} wordBreak='break-word' color='white'>{title}</Heading>
        <Text px='4' mb='4' textShadow='0px 0px 7px rgba(0,0,0,0.25)' noOfLines={1} overflow="hidden" color='white' wordBreak='break-word'>{description}</Text>
      </VStack>
    </Box>
  );
};

export default ProjectCard;