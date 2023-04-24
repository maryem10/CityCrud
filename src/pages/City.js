import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const City = () => {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');
    const [cityId, setCityId] = useState('');
    // État pour stocker la liste des cities


    // Fonction pour récupérer la liste des cities depuis le backend
    const getCities = async () => {
        try {
            const response = await axios.get('/api/cities');
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getCities();
    }, []);



    const getCityById = async (id) => {
        try {
            const response = await axios.get(`/api/cities/${id}`);
            setCityId(response.data.id);
            setCityName(response.data.name);
        } catch (error) {
            console.error(error);
        }
    };

    const addCity = async () => {
        try {
            const response = await axios.post('/api/cities', { name: cityName });
            setCities([...cities, response.data]);
            setCityName('');
        } catch (error) {
            console.error(error);
        }
    };


    const updateCity = async () => {
        try {
            const response = await axios.put(`/api/cities/${cityId}`, { name: cityName });
            const updatedCities = cities.map((city) => {
                if (city.id === response.data.id) {
                    return response.data;
                }
                return city;
            });
            setCities(updatedCities);
            setCityId('');
            setCityName('');
        } catch (error) {
            console.error(error);
        }
    };



    const deleteCity = async (id) => {
        try {
            await axios.delete(`/api/cities/${id}`);
            const updatedCities = cities.filter((city) => city.id !== id);
            setCities(updatedCities);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Cities</h1>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">City Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((city, index) => (
                    <tr key={city.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{city.name}</td>
                        <td>
                            <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                getCityById(city.id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() =>
                                deleteCity(city.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control mr-2 d-inline-block"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                {cityId ? (
                    <button className="btn btn-success" onClick={updateCity}>
                        Update City
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={addCity}>
                        Add City
                    </button>
                )}
            </div>
        </div>
                    );
};

export default City;