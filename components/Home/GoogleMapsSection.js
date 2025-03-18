import React, { useEffect, useContext, useState, useCallback } from 'react';
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import LabeledMarker from './LabeledMarker'; 

function GoogleMapsSection() {
	const { source } = useContext(SourceContext);
	const { destination } = useContext(DestinationContext);

	// Responsive map container
	const [containerStyle, setContainerStyle] = useState({
		width: '100%',
		height: '500px',
	});

	const [map, setMap] = useState(null);
	const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

	// Adjust container size on mount
	useEffect(() => {
		const updateSize = () => {
			setContainerStyle({
				width: '100%',
				height: `${window.innerWidth * 0.5}px`,
			});
		};
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	// Dynamically set the map center
	const [center, setCenter] = useState({
		lat: -3.745,
		lng: -38.523,
	});

	useEffect(() => {
		if (source && source.lat && source.lng) {
			setCenter({
				lat: source.lat,
				lng: source.lng,
			});
		}
		if (source?.lat && source?.lng && destination?.lat && destination?.lng) {
			directionRoute();
		}
	}, [source, destination, map]);

	const directionRoute = () => {
		if (!source || !destination) return;

		const directionsService = new google.maps.DirectionsService();

		directionsService.route(
			{
				origin: { lat: source.lat, lng: source.lng },
				destination: { lat: destination.lat, lng: destination.lng },
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === 'OK') {
					setDirectionRoutePoints(result);
				} else {
					console.error(`Failed to fetch directions: ${status}`);
				}
			}
		);
	};

	const onLoad = useCallback((mapInstance) => {
		setMap(mapInstance);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries: ['places'],
	});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={{ mapId: 'd4125ccc5389435f' }}
		>
			{/* Source Marker */}
			{source?.lat && source?.lng && (
				<LabeledMarker position={{ lat: source.lat, lng: source.lng }} label={source.label} />
			)}

			{/* Destination Marker */}
			{destination?.lat && destination?.lng && (
				<LabeledMarker position={{ lat: destination.lat, lng: destination.lng }} label={destination.label} />
			)}

			{/* Render Directions if Available */}
			{directionRoutePoints && (
				<DirectionsRenderer directions={directionRoutePoints} />
			)}
		</GoogleMap>
	);
}

export default GoogleMapsSection;
