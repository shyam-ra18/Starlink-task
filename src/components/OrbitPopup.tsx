import React, { useEffect } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppStore } from '../store/app.store';
import toast from 'react-hot-toast';

interface OrbitData {
    inclination: number;
    id: number;
    periapsis: number;
    apoapsis: number;
    meanMotion: number;
}

interface OrbitPopupProps {
    data: OrbitData;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedData: OrbitData) => void;
}

const OrbitPopup: React.FC<OrbitPopupProps> = ({ data, isOpen, onClose }) => {

    const setOrbitData = useAppStore((state) => state.setOrbitData);

    const form = useForm({
        initialValues: {
            inclination: data.inclination,
            periapsis: data.periapsis,
            apoapsis: data.apoapsis,
            meanMotion: data.meanMotion,
        },
    });

    useEffect(() => {
        form.setValues({
            inclination: data.inclination,
            periapsis: data.periapsis,
            apoapsis: data.apoapsis,
            meanMotion: data.meanMotion,
        });
    }, [data]);

    const handleChange = (field: keyof OrbitData, value: string) => {
        form.setFieldValue(field, value);
    };

    const handleSave = () => {
        setOrbitData({ ...form.values, id: data.id });
        toast.success("Orbit data update successfully");
        onClose();
    };

    return (
        <Modal opened={isOpen} onClose={onClose} size={'lg'} centered>
            <div className="px-4">
                <h3 className="text-center mb-4">Edit Orbital Parameters</h3>
                <form>
                    <TextInput
                        label="Inclination (°)"
                        value={form.values.inclination || ''}
                        onChange={(e) => handleChange('inclination', e.target.value)}
                        className="mb-4"
                    />
                    <TextInput
                        label="Periapsis (km)"
                        value={form.values.periapsis || ''}
                        onChange={(e) => handleChange('periapsis', e.target.value)}
                        className="mb-4"
                    />
                    <TextInput
                        label="Apoapsis (km)"
                        value={form.values.apoapsis || ''}
                        onChange={(e) => handleChange('apoapsis', e.target.value)}
                        className="mb-4"
                    />
                    <TextInput
                        label="Mean Motion"
                        value={form.values.meanMotion || ''}
                        onChange={(e) => handleChange('meanMotion', e.target.value)}
                        className="mb-4"
                    />

                    <Group position="right">
                        <Button
                            variant="light"
                            onClick={handleSave}
                            color="violet"
                        >
                            Save
                        </Button>
                    </Group>
                </form>
            </div>
        </Modal>
    );
};

export default OrbitPopup;
