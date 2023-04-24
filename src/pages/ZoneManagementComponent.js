import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Modal, Button, Form } from 'react-bootstrap';

const ZoneManagementComponent = () => {
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneCity, setZoneCity] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [show, setShow] = useState(false);





    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit1 = (event) => {
        event.preventDefault();
        // Add code to submit form data
    };

    useEffect(() => {
        fetchZones();
    }, []);
    const fetchZones = async () => {
        try {
            const response = await axios.get('/api/zones');
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('/api/cities');
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSelectChange = (event) => {
        setZones(event.target.value);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'zoneName') {
            setZoneName(value);
        } else if (name === 'zoneCity') {
            setZoneCity(value);
        }
    };
    const handleAddZone = async () => {
        try {
            const response = await axios.post('/api/zones/save', { name:
                zoneName, city: zoneCity });
            setZones([...zones, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditZone = async (id) => {
        try {
            const response = await axios.put(`/api/zones/${id}`, { name:
                zoneName, city: zoneCity });
            const updatedZones = zones.map((zone) => {
                if (zone.id === id) {
                    return response.data;
                }
                return zone;
            });
            setZones(updatedZones);
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteZone = async (id) => {
        try {
            await axios.delete(`/api/zones/${id}`);
            const updatedZones = zones.filter((zone) => zone.id !== id);
            setZones(updatedZones);
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpenModal = (zone) => {
        if (zone) {
            setZoneId(zone.id);
            setZoneName(zone.name);
            setZoneCity(zone.city);
        } else {
            setZoneId('');
            setZoneName('');
            setZoneCity('');
        }
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>

            <h1>Zone Management</h1>
            <button className="btn btn-primary mb-3" onClick={() =>
                handleOpenModal()}>
                Add Zone
            </button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Zone</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleAddZone}>
                        <Form.Group controlId="formZone">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="zone" />
                        </Form.Group>


                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <select className="form-select" value={cities} onChange={handleSubmit1}>
                                <option value="">Select an item</option>


                                {cities && cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}

                            </select>

                        </Form.Group>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddZone}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {zones.map((zone) => (
                    <tr key={zone.id}>
                        <td>{zone.name}</td>
                        <td>{zone.city.name}</td>
                        <td>
                            <button className="btn btn-secondary me-2"
                                    onClick={() => handleEditZone(zone)}>
                                Edit
                            </button>
                            <button className="btn btn-danger"
                                    onClick={() => handleDeleteZone(zone.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    )
};
export default ZoneManagementComponent;