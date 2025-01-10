import React from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

interface OrbitPopupProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedData: any) => void;
}

const StarLinkEditPopup: React.FC<OrbitPopupProps> = ({ data, isOpen, onClose, onSave }) => {
    const form = useForm({
        initialValues: {
            OBJECT_NAME: data?.spaceTrack?.OBJECT_NAME || '',
            LAUNCH_DATE: data?.spaceTrack?.LAUNCH_DATE || '',
            DECAY_DATE: data?.spaceTrack?.DECAY_DATE || '',
            INCLINATION: data?.spaceTrack?.INCLINATION || '',
            PERIAPSIS: data?.spaceTrack?.PERIAPSIS || '',
            APOAPSIS: data?.spaceTrack?.APOAPSIS || '',
            MEAN_MOTION: data?.spaceTrack?.MEAN_MOTION || '',
            MEAN_ANOMALY: data?.spaceTrack?.MEAN_ANOMALY || '',
            TLE_LINE1: data?.spaceTrack?.TLE_LINE1 || '',
            TLE_LINE2: data?.spaceTrack?.TLE_LINE2 || '',
        },
    });

    const handleSave = () => {
        const updatedData = {
            ...data,
            spaceTrack: {
                ...data.spaceTrack,
                ...form.values,
            },
        };
        onClose();
    };

    return (
        <Modal opened={isOpen} onClose={onClose} size="lg" centered>
            <div className="px-4">
                <h3 className="text-center mb-4">Edit Orbital Parameters</h3>
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Object Name"
                        {...form.getInputProps('OBJECT_NAME')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Launch Date"
                        {...form.getInputProps('LAUNCH_DATE')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Decay Date"
                        {...form.getInputProps('DECAY_DATE')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Inclination"
                        {...form.getInputProps('INCLINATION')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Periapsis (km)"
                        {...form.getInputProps('PERIAPSIS')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Apoapsis (km)"
                        {...form.getInputProps('APOAPSIS')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Mean Motion"
                        {...form.getInputProps('MEAN_MOTION')}
                        className="mb-4"
                    />
                    <TextInput
                        label="Mean Anomaly"
                        {...form.getInputProps('MEAN_ANOMALY')}
                        className="mb-4"
                    />
                    <TextInput
                        label="TLE Line 1"
                        {...form.getInputProps('TLE_LINE1')}
                        className="mb-4"
                    />
                    <TextInput
                        label="TLE Line 2"
                        {...form.getInputProps('TLE_LINE2')}
                        className="mb-4"
                    />
                    <Group position="right">
                        <Button variant="light" type="submit" color="violet">
                            Save
                        </Button>
                    </Group>
                </form>
            </div>
        </Modal>
    );
};

export default StarLinkEditPopup;
