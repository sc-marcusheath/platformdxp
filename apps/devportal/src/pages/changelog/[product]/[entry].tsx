import { Hero } from '@/src/components/common';
import { TrackPageView } from '@/src/components/engagetracker/TrackPageView';
import { CenteredContent, VerticalGroup } from '@/src/components/helpers';
import { ButtonLink } from '@/src/components/links';
import { SocialShare } from '@/src/components/social';
import { getChangelogCredentials } from '@/src/lib/changelog/changelog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { Changelog } from '@scdp/changelog';
import { ChangelogEntry, Product } from '@scdp/changelog/types';
import { getChangelogEntryUrl, getSlug, slugify } from '@scdp/changelog/utils';
import ChangelogByMonth from '@src/components/changelog/ChangelogByMonth';
import { ChangelogItemMeta } from '@src/components/changelog/ChangelogItemMeta';
import Layout from '@src/layouts/Layout';
import Link from 'next/link';

type ChangelogProps = {
  currentProduct: Product;
  changelogEntry: ChangelogEntry;
};

export async function getServerSideProps(context: any) {
  const product = context.params.product;
  const entry = context.params.entry;
  const isPreview = context.preview || false;
  const changelog = new Changelog(getChangelogCredentials(), isPreview);

  const products = await changelog.getProducts().then((response: Product[]) => {
    return response;
  });
  let changelogEntry;
  const currentProduct: Product | undefined = products.find((p) => slugify(p.name) == product);

  try {
    changelogEntry = await changelog.getEntryByTitle(entry, currentProduct?.id);
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      currentProduct: currentProduct,
      changelogEntry: changelogEntry,
    },
  };
}

const ChangelogProduct = ({ currentProduct, changelogEntry }: ChangelogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const title = `${currentProduct.name} Changelog`;
  const description = `Learn more about new versions, changes and improvements for ${currentProduct.name}`;

  return (
    <TrackPageView product={currentProduct}>
      <Layout title={title} description={changelogEntry.title}>
        <Hero title={title} description={description}>
          <HStack>
            <Text variant={'sm'}>Powered by</Text>
            <Link href="/content-management/content-hub-one" title="Visit the Content Hub ONE product page to learn more">
              <Image
                src={useColorModeValue('https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-content_hub_one', 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-content_hub_one-dark')}
                alt="Powered by Content Hub ONE"
                width={150}
                height={18}
              />
            </Link>
          </HStack>
        </Hero>
        <VerticalGroup>
          <CenteredContent py={8} gap={8}>
            <Grid templateColumns="repeat(5, 1fr)" gap={14}>
              <GridItem colSpan={{ base: 5, md: 3 }}>
                <Breadcrumb separator={'>'}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/changelog">Changelog</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/changelog/${getSlug(currentProduct.name)}`}>{currentProduct.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>

                {/* The full changelog item */}
                <Card variant={'unstyled'} mt={8} mb={16}>
                  <CardHeader pb={4}>
                    <Heading as="h2" fontSize={'1.25rem'} id={getSlug(changelogEntry.title)}>
                      <Link href={getChangelogEntryUrl(changelogEntry)} title={changelogEntry.title}>
                        {changelogEntry.title}
                      </Link>
                    </Heading>

                    <ChangelogItemMeta item={changelogEntry} mt={4} />
                  </CardHeader>
                  <CardBody py={0}>
                    {changelogEntry.image.length > 0 && (
                      <>
                        <Image src={`${changelogEntry.image[0].fileUrl}`} alt={changelogEntry.title || ''} borderRadius={'lg'} onClick={onOpen} cursor={'zoom-in'} mb={4} maxW={'full'} />

                        <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size={'6xl'}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>{changelogEntry.title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Center>
                                <Image src={`${changelogEntry.image[0].fileUrl}`} alt={changelogEntry.title || ''} />
                              </Center>
                            </ModalBody>

                            <ModalFooter>
                              <Button colorScheme="neutral" mr={3} onClick={onClose} variant={'outline'}>
                                Close
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                    )}
                    <Prose margin={0} padding={0} dangerouslySetInnerHTML={{ __html: changelogEntry.description }} />
                    {changelogEntry.fullArticle != null && <Prose margin={0} padding={0} dangerouslySetInnerHTML={{ __html: changelogEntry.fullArticle }} />}
                  </CardBody>
                  <CardFooter justifyContent={changelogEntry.readMoreLink ? 'space-between' : 'flex-end'}>
                    {changelogEntry.readMoreLink && <ButtonLink variant="text" href={changelogEntry.readMoreLink} text="Read more" title={`Read more about ${changelogEntry.title}`} margin={0} padding={0} />}
                    <SocialShare url={getChangelogEntryUrl(changelogEntry, true)} title={changelogEntry.title} />
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem colSpan={{ base: 2 }} hideBelow={'md'}>
                <ChangelogByMonth product={currentProduct} />
              </GridItem>
            </Grid>
          </CenteredContent>
        </VerticalGroup>
      </Layout>
    </TrackPageView>
  );
};

export default ChangelogProduct;
