import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/Loader';
import { Button, Card, Container, Divider, Grid, Group, Text } from '@mantine/core';
import { FaRocket, FaCalendarAlt, FaSatellite, FaExclamationTriangle } from 'react-icons/fa';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { IoMdArrowBack } from "react-icons/io";
import OrbitPopup from '../../components/OrbitPopup';
import { useAppStore } from '../../store/app.store';

const Starlink = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const orbitDataFromState = useAppStore((state) => state.orbit)
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };


    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleSaveData = (updatedData: any) => {

        handleClosePopup();
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ['starlinkById'],
        queryFn: () =>
            fetch(`https://api.spacexdata.com/v4/starlink/${id}`).then((res) =>
                res.json(),
            ),
    });

    if (isLoading) return <LoadingComponent />;
    if (error) return <Text color="red">Error fetching data: {error?.message}</Text>;

    return (
        <div className="max-h-screen p-8">
            <Container size="xl">
                <Button
                    variant="light"
                    color="violet"
                    h={40}
                    w={40}
                    onClick={() => navigate(-1)}
                    className='rounded-full p-0 absolute'>
                    <IoMdArrowBack size={22} />
                </Button>

                {/* Header Section */}
                <header className="text-center text-black mb-8">
                    <h1 className="text-4xl font-extrabold">{data?.spaceTrack.OBJECT_NAME}</h1>
                    <p className="text-lg">{data?.spaceTrack.OBJECT_ID}</p>
                </header>

                {/* Starlink Info Section */}
                <Grid gutter="lg">
                    {/* Launch Information Card */}
                    <Grid.Col span={12} md={6} lg={4}>
                        <Card shadow="sm" padding="lg" radius="md" h={200} className="hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300">
                            <Group position="apart" className="mb-4">
                                <Text className="text-xl font-semibold text-darkblue flex items-center">
                                    <FaRocket className="mr-2 text-midpurple" /> Launch Information
                                </Text>
                                <Button
                                    variant="light"
                                    color="violet"
                                    size="sm"
                                    onClick={() => navigate(`/launch/${data.launch}`)}
                                >
                                    See More
                                </Button>
                            </Group>

                            <Text className="flex items-center">
                                <strong className="flex items-center mr-2">
                                    <FaCalendarAlt className="mr-2 text-darkPurple" />
                                    Launch Date:
                                </strong>
                                {new Date(data?.spaceTrack.LAUNCH_DATE).toLocaleDateString()}
                            </Text>

                            <Text className="flex items-center my-2">
                                <strong className="flex items-center mr-2">
                                    <FaCalendarAlt className="mr-2 text-darkPurple" />
                                    Decay Date:
                                </strong>
                                {data?.spaceTrack.DECAY_DATE ? new Date(data?.spaceTrack.DECAY_DATE).toLocaleDateString() : 'N/A'}
                            </Text>

                            <Text className="flex items-center">
                                <strong className="flex items-center mr-2">
                                    <BsFillCloudSunFill className="mr-2 text-darkPurple" />
                                    Status:
                                </strong>
                                {data?.spaceTrack.DECAYED ? 'Decayed' : 'Active'}
                            </Text>
                        </Card>
                    </Grid.Col>

                    {/* Orbital Parameters Card */}
                    <Grid.Col span={12} md={6} lg={4}>
                        <Card shadow="sm" padding="lg" radius="md" h={200} className="hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300">
                            <Group position="apart" className="mb-4">
                                <Text className="text-xl font-semibold text-darkblue flex items-center">
                                    <FaSatellite className="mr-2 text-midpurple" /> Orbital Parameters
                                </Text>
                                <Button
                                    variant="light"
                                    color="violet"
                                    size="sm"
                                    onClick={handleOpenPopup}>
                                    Edit
                                </Button>
                            </Group>

                            <Text>
                                <strong>Inclination: </strong>{orbitDataFromState?.inclination || data?.spaceTrack.INCLINATION}°
                            </Text>
                            <Text className="my-2">
                                <strong>Periapsis: </strong>{orbitDataFromState?.periapsis || data?.spaceTrack.PERIAPSIS} km
                            </Text>
                            <Text className="mb-2">
                                <strong>Apoapsis: </strong>{orbitDataFromState?.apoapsis || data?.spaceTrack.APOAPSIS} km
                            </Text>
                            <Text>
                                <strong>Mean Motion: </strong>{orbitDataFromState?.meanMotion || data?.spaceTrack.MEAN_MOTION}
                            </Text>
                        </Card>
                    </Grid.Col>

                    {/* TLE Data Card */}
                    <Grid.Col span={12} md={6} lg={4}>
                        <Card shadow="sm" padding="lg" radius="md" h={200} className="hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300">
                            <Text className="text-xl font-semibold text-darkblue mb-4 flex items-center">
                                <FaExclamationTriangle className="mr-2 text-midpurple" /> TLE Data
                            </Text>
                            <Text className="mb-2">
                                <strong>TLE Line 1: </strong>{data?.spaceTrack.TLE_LINE1}
                            </Text>
                            <Text>
                                <strong>TLE Line 2: </strong>{data?.spaceTrack.TLE_LINE2}
                            </Text>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Divider my="lg" />

                {/* Additional Info */}
                <Grid gutter="lg">
                    <Grid.Col span={12}>
                        <Card shadow="sm" padding="lg" radius="md" className="hover:shadow-xl transition-shadow">
                            <Text className="text-xl font-semibold text-darkblue mb-4">Additional Information</Text>
                            <Text className="text-gray-700">
                                <strong>COMMENT:</strong> {data?.spaceTrack.COMMENT}
                            </Text>

                            <Text className="text-gray-700 mt-4">
                                <strong>Originator:</strong> {data?.spaceTrack.ORIGINATOR}
                            </Text>
                            <Text className="text-gray-700 mt-4">
                                <strong>Country Code:</strong> {data?.spaceTrack.COUNTRY_CODE}
                            </Text>
                            <Text className="text-gray-700 mt-4">
                                <strong>Semimajor Axis:</strong> {data?.spaceTrack.SEMIMAJOR_AXIS} km
                            </Text>
                            <Text className="text-gray-700 mt-4">
                                <strong>Period:</strong> {data?.spaceTrack.PERIOD} minutes
                            </Text>
                        </Card>
                    </Grid.Col>
                </Grid>

                {/* Footer Section */}
                <footer className="text-center mt-8">
                    <Text size="sm" color="gray">Data from Space-Track API</Text>
                </footer>
            </Container>

            <OrbitPopup
                data={{
                    inclination: data.spaceTrack.INCLINATION,
                    periapsis: data.spaceTrack.PERIAPSIS,
                    apoapsis: data.spaceTrack.APOAPSIS,
                    meanMotion: data.spaceTrack.MEAN_MOTION,
                    id: data.id
                }}
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSave={handleSaveData}
            />
        </div>
    );

}

export default Starlink