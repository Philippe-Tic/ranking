"use client"

import { useUserContext } from "@/components/AppContent";
import { Content } from "@/components/Content";
import { FieldInput } from "@/components/FieldInput";
import { FieldTextarea } from "@/components/FieldTextarea";
import { FieldUploader } from "@/components/FieldUploader";
import { Header } from "@/components/Header";
import { InlineMessage } from "@/components/InlineMessage";
import { Page } from "@/components/Page";
import { buildUrl } from "@/utils/buildUrl";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { Box, Button, Flex, GridItem, HStack, Heading, Icon, IconButton, SimpleGrid, Text, VStack, useToast } from "@chakra-ui/react";
import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { useUpload } from '@supabase-cache-helpers/storage-react-query';
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldValues, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

export default function Index() {
  const supabase = useSupabaseBrowser();
  const toast = useToast();
  const router = useRouter();
  const { user } = useUserContext();

  const { mutateAsync: createProject, isPending: isPendingCreation } = useInsertMutation(
    supabase.from('projects'),
    ["id"],
    "",
    {
      onSuccess() {
        toast({
          title: 'Projet créé',
          status: 'success',
          duration: 3000,
        });
        router.push('/projects')
      }
    }
  );

  const dirName = user?.user_metadata?.full_name || 'noname';

  const { mutateAsync: upload, isPending: isPendingImage } = useUpload(
    supabase.storage.from('images'),
    {
      buildFileName: ({ fileName }) => [dirName, dayjs().format('DDMMhhmmss') ,fileName].filter(Boolean).join("/")
    }
  );

  const isPending = isPendingCreation || isPendingImage;

  const methods = useForm({
    defaultValues: {
      votes: [{name: ''}, {name: ''}]
    }
  })
  const { handleSubmit, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "votes"
  });

  const onSubmit = async (data: FieldValues) => {
    const { image, title, description, votes } = data;
    const fileUploaded = await upload({
      files: image
    });

    // TODO: improve error handling
    if (fileUploaded[0].error) {
      return toast({
        title: 'Erreur lors de l\'upload de l\'image',
        status: 'error',
        duration: 3000,
      });
    }

    await createProject([{
      title,
      description,
      votes_raw: votes?.map((vote: any) => vote.name),
      image: buildUrl(fileUploaded[0]?.data?.path)
    }]);
  }

  return (
    <Page>
      <Header>
        <HStack>
          <IconButton onClick={() => {router.push('/projects')}} variant='tertiary' aria-label='retour' icon={<Icon as={FaArrowLeft} />} />
          <Heading>Nouveau Projet</Heading>
        </HStack>
      </Header>
      <Content>
        <SimpleGrid
          display={{
            base: "initial",
            md: "grid",
          }}
          columns={{md: 3}}
          spacing={{md: 6}}
        >
          <GridItem
            colSpan={{
              md: 1,
            }}
          >
            <Box>
              <Text mt={1}>
                Créer votre projet, ajoutez ce que vous voulez ranker et inviter
              </Text>
            </Box>
          </GridItem>
          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 2,
            }}
          >
            <FormProvider {...methods}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack alignItems="flex-start" spacing="4" position='relative'>
                  <FieldUploader
                    isRequired
                    name="image"
                    label="Image"
                  />
                  <FieldInput isRequired name="title" label="Nom du projet" />
                  <FieldTextarea name="description" label="Description" />
                  {fields.map((item, index) => (
                    <HStack alignItems="flex-end" w="full" key={index}>
                      <FieldInput label={`Votes ${index + 1}`} isRequired name={`votes.${index}.name`}>
                        {
                          fields?.length > 2 && (
                            <IconButton variant='alert' size="sm" aria-label="delete" icon={<Icon as={FaTrash} />} type="button" onClick={() => remove(index)} />
                          )
                        }
                      </FieldInput>
                    </HStack>
                  ))}
                  <Button variant="secondary" onClick={() => append({name: ''})}>Ajouter un vote</Button>
                  <InlineMessage title="Attention" message="Vous ne pourrez pas modifier vos élements de vote." />

                  <Flex w="full" justifyContent="flex-end">
                    <Button isLoading={isPending} type="submit">
                      Créer
                    </Button>
                  </Flex>
                </VStack>
              </form>
            </FormProvider>
          </GridItem>
        </SimpleGrid>
      </Content>
    </Page>
  );
}
