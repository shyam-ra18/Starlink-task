import { Container, Card, Text, Grid, Group, Badge, Button, Divider, Image, Title, Stack } from '@mantine/core';
import { FaRocket, FaCalendarAlt, FaRegCheckCircle, FaExclamationCircle, FaLink } from 'react-icons/fa';
import { BsFillCloudSunFill, BsYoutube, BsReddit } from 'react-icons/bs';
import { MdLaunch } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/Loader';
import { IoMdArrowBack } from 'react-icons/io';
const Launch = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, error, data } = useQuery({
        queryKey: ['launchById'],
        queryFn: () =>
            fetch(`https://api.spacexdata.com/v4/launches/${id}`).then((res) =>
                res.json(),
            ),
    });

    if (isLoading) return <LoadingComponent />;
    if (error) return <Text color="red">Error fetching data: {error?.message}</Text>;

    const launchDate = new Date(data.date_utc).toLocaleString();
    const missionSuccessIcon = data.success ? <FaRegCheckCircle color="green" /> : <FaExclamationCircle color="red" />;

    return (

        <div className="launch-page">
            <Container size="xl" my="lg">
                <Button
                    variant="light"
                    color="violet"
                    h={40}
                    w={40}
                    onClick={() => navigate(-1)}
                    className='rounded-full p-0 absolute'>
                    <IoMdArrowBack size={22} />
                </Button>

                <Title order={2} align="center" mb="md">
                    Launch Information
                </Title>
                <div className="video-container mb-10">
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${data.links.youtube_id}`}
                        title="YouTube video"
                        allowFullScreen
                        className='rounded-md'
                    />
                </div>

                {/* Launch Details */}
                <Grid gutter="lg">
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md">
                            <Text size="lg" weight={600}><FaRocket className="mr-2" /> Rocket Information</Text>
                            <Text>Rocket ID: {data.rocket}</Text>
                            <Text>Launchpad ID: {data.launchpad}</Text>
                        </Card>
                    </Grid.Col>

                    {/* Fairings Info */}
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md">
                            <Text size="lg" weight={600}><BsFillCloudSunFill className="mr-2" /> Fairings Information</Text>
                            <Group position="apart" mb="sm">
                                <Text><strong>Reused:</strong> {data.fairings.reused ? 'Yes' : 'No'}</Text>
                                <Text><strong>Recovered:</strong> {data.fairings.recovered ? 'Yes' : 'No'}</Text>
                            </Group>
                            <Text><strong>Recovery Attempt:</strong> {data.fairings.recovery_attempt ? 'Yes' : 'No'}</Text>
                        </Card>
                    </Grid.Col>
                </Grid>

                {/* Launchpad and Rocket Information */}
                <Grid gutter="lg">
                    {/* Launch Date and Success */}
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md">
                            <Group position="apart" mb="sm">
                                <Text size="lg" weight={600}><FaCalendarAlt className="mr-2" /> Launch Date</Text>
                                <Text>{launchDate}</Text>
                            </Group>
                            <Group position="apart" mb="sm">
                                <Text size="lg" weight={600}><MdLaunch className="mr-2" /> Launch Status</Text>
                                <Badge color={data.success ? 'green' : 'red'} variant="filled">
                                    {data.success ? 'Success' : 'Failure'}
                                </Badge>
                            </Group>
                            <Text>{data.details}</Text>
                        </Card>
                    </Grid.Col>

                    {/* Mission Patch */}
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md">
                            <Text size="lg" weight={600}>Mission Patch</Text>
                            <Image src={data.links.patch.large} alt="Mission Patch" radius="md" />
                        </Card>
                    </Grid.Col>
                </Grid>

                {/* Links Section */}
                <Divider my="lg" />
                <Stack spacing="md">
                    <Title order={3}>Related Links</Title>
                    <Group spacing="sm">
                        <Button variant="outline" leftIcon={<BsReddit />}>
                            <a href={data.links.reddit.launch} target="_blank" rel="noopener noreferrer">
                                Launch Discussion
                            </a>
                        </Button>
                        <Button variant="outline" leftIcon={<BsReddit />}>
                            <a href={data.links.reddit.media} target="_blank" rel="noopener noreferrer">
                                Media Thread
                            </a>
                        </Button>
                        <Button variant="outline" leftIcon={<BsYoutube />}>
                            <a href={`https://www.youtube.com/watch?v=${data.links.youtube_id}`} target="_blank" rel="noopener noreferrer">
                                Watch Webcast
                            </a>
                        </Button>
                        <Button variant="outline" leftIcon={<FaLink />}>
                            <a href={data.links.article} target="_blank" rel="noopener noreferrer">
                                Article
                            </a>
                        </Button>
                        <Button variant="outline" leftIcon={<FaLink />}>
                            <a href={data.links.wikipedia} target="_blank" rel="noopener noreferrer">
                                Wikipedia
                            </a>
                        </Button>
                        <Button variant="outline" leftIcon={<FaLink />}>
                            <a href={data.links.presskit} target="_blank" rel="noopener noreferrer">
                                Press Kit
                            </a>
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </div>
    )
}

export default Launch