import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacyLocator = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [searchMedicine, setSearchMedicine] = useState('');
    const [selectedPharmacy, setSelectedPharmacy] = useState('');
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        loadPharmacies();
        getUserLocation();
    }, []);

    useEffect(() => {
        if (searchMedicine) {
            searchMedicines();
        } else {
            setMedicines([]);
        }
    }, [searchMedicine, selectedPharmacy]);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Location access denied');
                }
            );
        }
    };

    const loadPharmacies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/patients/pharmacies', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error loading pharmacies:', error);
        }
    };

    const searchMedicines = async () => {
        if (!searchMedicine.trim()) return;
        
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({
                name: searchMedicine
            });
            
            if (selectedPharmacy) {
                params.append('pharmacy', selectedPharmacy);
            }

            const response = await axios.get(`/api/patients/medicines/search?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedicines(response.data);
        } catch (error) {
            console.error('Error searching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDirections = (pharmacy) => {
        if (userLocation) {
            const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${pharmacy.address}`;
            window.open(url, '_blank');
        } else {
            alert('Location access required for directions');
        }
    };

    return (
        <div className="pharmacy-locator">
            <div className="locator-header">
                <h3>Find Nearby Pharmacies</h3>
                <p>Locate pharmacies and check medicine availability</p>
            </div>

            <div className="search-section">
                <div className="medicine-search">
                    <h4>Search for Medicine</h4>
                    <div className="search-controls">
                        <input
                            type="text"
                            placeholder="Enter medicine name..."
                            value={searchMedicine}
                            onChange={(e) => setSearchMedicine(e.target.value)}
                            className="medicine-input"
                        />
                        <select
                            value={selectedPharmacy}
                            onChange={(e) => setSelectedPharmacy(e.target.value)}
                            className="pharmacy-filter"
                        >
                            <option value="">All Pharmacies</option>
                            {pharmacies.map(pharmacy => (
                                <option key={pharmacy._id} value={pharmacy._id}>
                                    {pharmacy.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {medicines.length > 0 && (
                    <div className="medicines-results">
                        <h4>Available Medicines</h4>
                        <div className="medicines-grid">
                            {medicines.map(medicine => (
                                <div key={medicine._id} className="medicine-card">
                                    <div className="medicine-info">
                                        <h5>{medicine.name}</h5>
                                        <p className="price">RWF {medicine.price}</p>
                                        <p className="stock">Stock: {medicine.stock} units</p>
                                        <span className={`category ${medicine.category}`}>
                                            {medicine.category}
                                        </span>
                                    </div>
                                    <div className="pharmacy-info">
                                        <h6>{medicine.pharmacy.name}</h6>
                                        <p>{medicine.pharmacy.phone}</p>
                                        <button 
                                            onClick={() => getDirections(medicine.pharmacy)}
                                            className="directions-btn"
                                        >
                                            <i className="fas fa-directions"></i>
                                            Get Directions
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="pharmacies-section">
                <h4>All Nearby Pharmacies</h4>
                <div className="pharmacies-grid">
                    {pharmacies.map(pharmacy => (
                        <div key={pharmacy._id} className="pharmacy-card">
                            <div className="pharmacy-header">
                                <div className="pharmacy-icon">
                                    <i className="fas fa-pills"></i>
                                </div>
                                <div className="pharmacy-details">
                                    <h5>{pharmacy.name}</h5>
                                    <p>{pharmacy.address}</p>
                                </div>
                            </div>
                            
                            <div className="pharmacy-contact">
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <span>{pharmacy.phone}</span>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <span>{pharmacy.email}</span>
                                </div>
                            </div>

                            <div className="pharmacy-actions">
                                <button 
                                    onClick={() => getDirections(pharmacy)}
                                    className="action-btn directions"
                                >
                                    <i className="fas fa-map-marker-alt"></i>
                                    Directions
                                </button>
                                <button 
                                    onClick={() => window.open(`tel:${pharmacy.phone}`, '_self')}
                                    className="action-btn call"
                                >
                                    <i className="fas fa-phone"></i>
                                    Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Searching medicines...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyLocator;