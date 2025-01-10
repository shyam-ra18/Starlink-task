import { Button, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSort } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/Loader';
import Pagination from '../components/Pagination';
import { useAppStore } from '../store/app.store';
import { IoMdLogOut } from "react-icons/io";
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [CurrentPage, setCurrentPage] = useState(1);
    const [PerPage, setPerPage] = useState(10);
    const [SelectedStarLink, setSelectedStarLink] = useState<any>(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const deleteStarLink = useAppStore((state: any) => state.deleteStarLink);
    const removedIds = useAppStore((state: any) => state.removedIds);
    const navigate = useNavigate();
    const { isLoading, error, data } = useQuery({
        queryKey: ['starlink'],
        queryFn: () =>
            fetch('https://api.spacexdata.com/v4/starlink').then((res) =>
                res.json(),
            ),
    });

    const startIndex = (CurrentPage - 1) * PerPage;
    const FinalData = useMemo(() => {
        return (data || [])
            ?.filter((s: any) => !removedIds?.includes(s.id))
            .sort((a, b) => {
                if (sortConfig.key) {
                    const aValue = a.spaceTrack[sortConfig.key];
                    const bValue = b.spaceTrack[sortConfig.key];

                    if (sortConfig.direction === 'asc') {
                        return aValue > bValue ? 1 : -1;
                    } else {
                        return aValue < bValue ? 1 : -1;
                    }
                }
                return 0;
            });
    }, [data, removedIds, sortConfig]);

    const paginatedData = FinalData.slice(startIndex, startIndex + PerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteStarLink = (id: string) => {
        deleteStarLink(id);
        toast.success('Starlink Deleted Successfully');
    };

    const handleSortColumns = (key: string, type: string) => {
        setSortConfig((prevSortConfig) => {
            const direction =
                prevSortConfig.key === key && prevSortConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc';
            return { key, direction };
        });
    };

    if (isLoading) return <LoadingComponent />;
    if (error) return <Text color="red">Error fetching data: {error?.message}</Text>;

    return (
        <div className="h-full p-10 pt-6 relative">
            {/* Header Section */}
            <header className="text-center text-black mb-4">
                <h1 className="text-4xl font-extrabold">Starlink Dashboard 🚀</h1>
            </header>
            <Button
                variant="light"
                color="violet"
                onClick={() => {
                    Cookies.remove('auth_token');
                    localStorage.clear();
                    navigate('/');
                }}
                className='rounded-md absolute top-8 right-10 z-40'>
                Logout
            </Button>

            <div className="max-h-[75vh] overflow-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead className="sticky top-0 bg-darkblue text-white">
                        <tr className="text-sm">
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('OBJECT_NAME', 'string')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Object Name
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('LAUNCH_DATE', 'date')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Launch Date
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('DECAY_DATE', 'date')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Decay Date
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('INCLINATION', 'number')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Inclination
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('PERIAPSIS', 'number')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Periapsis (km)
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('APOAPSIS', 'number')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Apoapsis (km)
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('MEAN_MOTION', 'number')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Mean Motion
                                    <FaSort />
                                </div>
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSortColumns('MEAN_ANOMALY', 'number')}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    Mean Anomaly
                                    <FaSort />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left">TLE Line 1</th>
                            <th className="px-4 py-2 text-left">TLE Line 2</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {paginatedData.map((starlink: any, index: number) => (
                            <tr key={index} className="border-b hover:bg-gray-100 text-sm">
                                <td className="px-4 py-2 hover:text-darkPurple text-nowrap">
                                    <Link to={`/starlink/${starlink.id}`} className="flex items-center gap-1">
                                        {starlink.spaceTrack.OBJECT_NAME}
                                        <GoLinkExternal className="text-xs" />
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(starlink.spaceTrack.LAUNCH_DATE).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    {starlink.spaceTrack.DECAY_DATE
                                        ? new Date(starlink.spaceTrack.DECAY_DATE).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td className="px-4 py-2">{starlink.spaceTrack.INCLINATION}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.PERIAPSIS}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.APOAPSIS}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.MEAN_MOTION}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.MEAN_ANOMALY}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.TLE_LINE1}</td>
                                <td className="px-4 py-2">{starlink.spaceTrack.TLE_LINE2}</td>
                                <td className="px-4 py-4 flex justify-center items-center gap-2">
                                    <RiDeleteBin6Fill
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={() => handleDeleteStarLink(starlink.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-darkblue">
                    <span>{`Showing ${(CurrentPage - 1) * PerPage + 1} to ${(CurrentPage * PerPage)} of ${FinalData.length} records`}</span>
                </div>
                <Pagination
                    totalRecord={FinalData?.length}
                    currentPage={CurrentPage}
                    perPageData={PerPage}
                    onPageChange={(page) => handlePageChange(page)}
                />
            </div>

        </div>
    );
};

export default Dashboard;
