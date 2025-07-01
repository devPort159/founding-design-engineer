import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock, MapPin, DollarSign, Zap } from "lucide-react";

const testSessions = {
    "data": [
      {
        "id": "66fe0c20-56d1-41c1-bc24-d7036a148075",
        "start_date_time": "2025-05-07T18:34:46Z",
        "end_date_time": "2025-05-07T18:36:47Z",
        "kwh": 0,
        "auth_id": "USCURC00000000",
        "auth_method": "WHITELIST",
        "location": {
          "id": "46e554ff-c93c-475b-a491-1d4c00644526",
          "city": "San Francisco",
          "type": "UNKNOWN",
          "evses": [
            {
              "uid": "e0c5e873-4285-40dd-901e-8372a8c80947",
              "images": [],
              "status": "AVAILABLE",
              "evse_id": "USCPIE15340421*1",
              "connectors": [
                {
                  "id": "6f5da870-112b-46f7-818e-cd5bd1c96f6f",
                  "format": "CABLE",
                  "voltage": 625,
                  "amperage": 100,
                  "standard": "IEC_62196_T1_COMBO",
                  "tariff_id": "57e13d90-e061-4bc1-82a3-f5b436e17ad7",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                },
                {
                  "id": "e68792c0-b14c-456f-99ab-2669b48de311",
                  "format": "CABLE",
                  "voltage": 625,
                  "amperage": 100,
                  "standard": "TESLA_S",
                  "tariff_id": "57e13d90-e061-4bc1-82a3-f5b436e17ad7",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                }
              ],
              "directions": [],
              "coordinates": {
                "latitude": 37.78981536712117,
                "longitude": -122.3898848957944
              },
              "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
              ],
              "last_updated": "2025-05-07T18:32:42Z",
              "status_schedule": [],
              "physical_reference": "HP EV 1",
              "parking_restrictions": []
            }
          ],
          "images": [],
          "address": "345 Spear St",
          "country": "USA",
          "operator": {
            "name": "ChargePoint Network"
          },
          "party_id": "CPI",
          "directions": [],
          "coordinates": {
            "latitude": "37.789775991365445",
            "longitude": "-122.38988230506057"
          },
          "postal_code": "00000",
          "country_code": "US",
          "last_updated": "2025-05-07T18:32:42Z",
          "related_locations": []
        },
        "currency": "USD",
        "total_cost": 0,
        "status": "INVALID",
        "last_updated": "2025-05-07T18:36:47Z"
      },
      {
        "id": "695aab4a-7d2f-4e16-a462-5acfd53007f6",
        "start_date_time": "2025-05-07T19:02:12Z",
        "end_date_time": "2025-05-07T19:04:13Z",
        "kwh": 0,
        "auth_id": "USCURC00000000",
        "auth_method": "WHITELIST",
        "location": {
          "id": "195ce6c3-1117-4762-ba1b-9948e8c93966",
          "city": "San Francisco",
          "type": "UNKNOWN",
          "evses": [
            {
              "uid": "06d91222-f5ac-48ea-9461-79551beb5d9d",
              "status": "AVAILABLE",
              "evse_id": "USCPIE12934121*1",
              "connectors": [
                {
                  "id": "73703dc3-7871-4e9c-8171-bcc9b2b78e90",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "IEC_62196_T1_COMBO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T19:00:44Z"
                },
                {
                  "id": "770c8e94-a4b2-49ea-a6e0-7fec824300e7",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "CHADEMO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T19:00:44Z"
                }
              ],
              "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
              ],
              "last_updated": "2025-05-07T19:00:44Z",
              "physical_reference": "STATION 2"
            }
          ],
          "address": "121 Spear St",
          "country": "USA",
          "operator": {
            "name": "Charge_Point"
          },
          "party_id": "CPI",
          "coordinates": {
            "latitude": 37.791885,
            "longitude": -122.393044
          },
          "postal_code": "00000",
          "country_code": "US",
          "last_updated": "2025-05-07T19:00:44Z",
          "opening_times": {
            "regular_hours": [],
            "twentyfourseven": true
          },
          "related_locations": []
        },
        "currency": "USD",
        "total_cost": 0,
        "status": "INVALID",
        "last_updated": "2025-05-07T19:04:13Z"
      },
      {
        "id": "8d6541cc-47db-47e5-b995-7946dcc42071",
        "start_date_time": "2025-05-07T18:34:36Z",
        "end_date_time": "2025-05-07T18:36:37Z",
        "kwh": 0,
        "auth_id": "USCURC00000000",
        "auth_method": "WHITELIST",
        "location": {
          "id": "195ce6c3-1117-4762-ba1b-9948e8c93966",
          "city": "San Francisco",
          "type": "UNKNOWN",
          "evses": [
            {
              "uid": "06d91222-f5ac-48ea-9461-79551beb5d9d",
              "status": "AVAILABLE",
              "evse_id": "USCPIE12934121*1",
              "connectors": [
                {
                  "id": "73703dc3-7871-4e9c-8171-bcc9b2b78e90",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "IEC_62196_T1_COMBO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                },
                {
                  "id": "770c8e94-a4b2-49ea-a6e0-7fec824300e7",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "CHADEMO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                }
              ],
              "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
              ],
              "last_updated": "2025-05-07T18:32:42Z",
              "physical_reference": "STATION 2"
            }
          ],
          "address": "121 Spear St",
          "country": "USA",
          "operator": {
            "name": "Charge_Point"
          },
          "party_id": "CPI",
          "coordinates": {
            "latitude": 37.791885,
            "longitude": -122.393044
          },
          "postal_code": "00000",
          "country_code": "US",
          "last_updated": "2025-05-07T18:32:42Z",
          "opening_times": {
            "regular_hours": [],
            "twentyfourseven": true
          },
          "related_locations": []
        },
        "currency": "USD",
        "total_cost": 0,
        "status": "INVALID",
        "last_updated": "2025-05-07T18:36:37Z"
      },
      {
        "id": "a620755b-69ec-47e1-82e1-88ea7186274d",
        "start_date_time": "2025-05-07T18:34:40Z",
        "end_date_time": "2025-05-07T18:36:41Z",
        "kwh": 0,
        "auth_id": "USCURC00000000",
        "auth_method": "WHITELIST",
        "location": {
          "id": "46e554ff-c93c-475b-a491-1d4c00644526",
          "city": "San Francisco",
          "type": "UNKNOWN",
          "evses": [
            {
              "uid": "cd358d18-f440-4961-936f-8bb0e15ab36a",
              "images": [],
              "status": "AVAILABLE",
              "evse_id": "USCPIE15340401*1",
              "connectors": [
                {
                  "id": "21edcae3-d553-4c61-b64f-a1b4e8b70282",
                  "format": "CABLE",
                  "voltage": 625,
                  "amperage": 100,
                  "standard": "IEC_62196_T1_COMBO",
                  "tariff_id": "57e13d90-e061-4bc1-82a3-f5b436e17ad7",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                },
                {
                  "id": "2be87bd0-6c75-493e-97da-312428a9866c",
                  "format": "CABLE",
                  "voltage": 625,
                  "amperage": 100,
                  "standard": "TESLA_S",
                  "tariff_id": "57e13d90-e061-4bc1-82a3-f5b436e17ad7",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T18:32:42Z"
                }
              ],
              "directions": [],
              "coordinates": {
                "latitude": "37.789775991365445",
                "longitude": "-122.38988230506057"
              },
              "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
              ],
              "last_updated": "2025-05-07T18:32:42Z",
              "status_schedule": [],
              "physical_reference": "HP EV 2",
              "parking_restrictions": []
            }
          ],
          "images": [],
          "address": "345 Spear St",
          "country": "USA",
          "operator": {
            "name": "ChargePoint Network"
          },
          "party_id": "CPI",
          "directions": [],
          "coordinates": {
            "latitude": "37.789775991365445",
            "longitude": "-122.38988230506057"
          },
          "postal_code": "00000",
          "country_code": "US",
          "last_updated": "2025-05-07T18:32:42Z",
          "related_locations": []
        },
        "currency": "USD",
        "total_cost": 0,
        "status": "INVALID",
        "last_updated": "2025-05-07T18:36:41Z"
      },
      {
        "id": "d2bbbc8c-7057-4832-9881-00246e1c0986",
        "start_date_time": "2025-05-07T19:06:17Z",
        "end_date_time": "2025-05-07T19:09:18Z",
        "kwh": 1.498,
        "auth_id": "USCURC00000000",
        "auth_method": "WHITELIST",
        "location": {
          "id": "195ce6c3-1117-4762-ba1b-9948e8c93966",
          "city": "San Francisco",
          "type": "UNKNOWN",
          "evses": [
            {
              "uid": "06d91222-f5ac-48ea-9461-79551beb5d9d",
              "status": "AVAILABLE",
              "evse_id": "USCPIE12934121*1",
              "connectors": [
                {
                  "id": "73703dc3-7871-4e9c-8171-bcc9b2b78e90",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "IEC_62196_T1_COMBO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T19:04:42Z"
                },
                {
                  "id": "770c8e94-a4b2-49ea-a6e0-7fec824300e7",
                  "format": "CABLE",
                  "voltage": 500,
                  "amperage": 125,
                  "standard": "CHADEMO",
                  "tariff_id": "f0edf0a5-f2b9-447e-8ccf-66db56e8fe66",
                  "power_type": "DC",
                  "last_updated": "2025-05-07T19:04:42Z"
                }
              ],
              "capabilities": [
                "REMOTE_START_STOP_CAPABLE"
              ],
              "last_updated": "2025-05-07T19:04:42Z",
              "physical_reference": "STATION 2"
            }
          ],
          "address": "121 Spear St",
          "country": "USA",
          "operator": {
            "name": "Charge_Point"
          },
          "party_id": "CPI",
          "coordinates": {
            "latitude": 37.791885,
            "longitude": -122.393044
          },
          "postal_code": "00000",
          "country_code": "US",
          "last_updated": "2025-05-07T19:04:42Z",
          "opening_times": {
            "regular_hours": [],
            "twentyfourseven": true
          },
          "related_locations": []
        },
        "currency": "USD",
        "total_cost": 0.48,
        "status": "COMPLETED",
        "last_updated": "2025-05-07T19:09:18Z"
      }
    ],
    "status_code": 1000,
    "status_message": "Success",
    "timestamp": "2025-06-09T20:47:49Z"
  }




interface SessionListProps {
    sessions: any[];
    isVisible: boolean;
    fetchSessions: (date_from: string, date_to: string, isPolling?: boolean) => Promise<void>;
    onClose: () => void;
}

export default function SessionList({ sessions, isVisible, fetchSessions, onClose }: SessionListProps) {
    const [chargingSessions, setChargingSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState<any | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        console.log('sessions prop updated: ', sessions);
        const sortedSessions = [...(sessions || [])].sort((a, b) => 
            new Date(b.start_date_time).getTime() - new Date(a.start_date_time).getTime()
        );
        setChargingSessions(sortedSessions);
    }, [sessions]);

    // Handle animation when visibility changes
    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [isVisible]);

    // Format datetime for display
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Format duration between start and end
    const formatDuration = (startDateTime: string, endDateTime: string) => {
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.round(diffMs / (1000 * 60));
        
        if (diffMins < 60) {
            return `${diffMins}m`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return `${hours}h ${mins}m`;
        }
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'completed': return 'bg-green-500';
            case 'active': return 'bg-blue-500';
            case 'invalid': return 'bg-red-500';
            case 'pending': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    // Handle session selection
    const handleSessionSelect = (session: any) => {
        setSelectedSession(session);
        setIsExpanded(true);
    };

    // Close session details
    const closeSessionDetails = () => {
        setSelectedSession(null);
        setIsExpanded(false);
    };

    if (!isVisible) return null;

    return (
        // <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out flex flex-shrink-0`}>
        <div className={`absolute left-0 right-0 transition-all duration-300 ease-in-out ${
            isAnimating ? 'bottom-0' : 'bottom-[-100%]'
        }`}>
            <div className="bg-white rounded-t-xl shadow-2xl border-t border-gray-200 max-h-[90vh] overflow-hidden">
                {!selectedSession ? (
                    // Sessions List View
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <p className="text-xl font-semibold">Charging Sessions</p>
                                    {/* <Button 
                                        onClick={async () => {
                                            setIsLoading(true);
                                            try {
                                                const today = new Date();
                                                const oneYearAgo = new Date();
                                                oneYearAgo.setFullYear(today.getFullYear() - 1);
                                                await fetchSessions(oneYearAgo.toISOString().split('T')[0], today.toISOString().split('T')[0], false);
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        }} 
                                        className='p-2'
                                        disabled={isLoading}
                                    >
                                        <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                                    </Button> */}
                                </div>
                                <button 
                                    className="text-lg text-destructive font-bold p-1"
                                    onClick={onClose}
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {chargingSessions.length} sessions found
                            </p>
                        </div>

                        {/* Sessions List */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-8">
                                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent mr-3"></div>
                                    <span>Loading sessions...</span>
                                </div>
                            ) : chargingSessions.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No charging sessions found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {chargingSessions.map((session) => (
                                        <div 
                                            key={session.id}
                                            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => handleSessionSelect(session)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-medium text-base leading-tight">
                                                    {session.location && session.location.evses && session.location.evses.length > 0 && session.location.evses[0].physical_reference} - {session.location.address} - {session.location.city}
                                                    </p>
                                                    <div className="mt-1 space-y-1">
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            <span>
                                                                {formatDateTime(session.start_date_time)} - {session.status === 'PENDING' || session.status === 'ACTIVE' ? 'Now' : formatDateTime(session.end_date_time)}
                                                            </span>
                                                            <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                                                {session.status === 'PENDING' || session.status === 'ACTIVE' ? formatDuration(session.start_date_time, session.last_updated) : formatDuration(session.start_date_time, session.end_date_time)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Badge className={getStatusColor(session.status)}>
                                                                {session.status}
                                                            </Badge>
                                                            {session.kwh > 0 && (
                                                                <span className="text-sm text-muted-foreground">
                                                                    {session.kwh} kWh
                                                                </span>
                                                            )}
                                                            {session.total_cost > 0 && (
                                                                <span className="text-sm text-green-600 font-medium">
                                                                    ${session.total_cost.toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // Session Details View
                    <>
                        {/* Collapsed Header - Always Visible */}
                        <div 
                            className="p-4 cursor-pointer border-b border-gray-100"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <p className="font-semibold text-lg leading-tight">
                                        {selectedSession.location.address} - {selectedSession.location.city}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDateTime(selectedSession.start_date_time)} - {formatDateTime(selectedSession.end_date_time)}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Badge className={getStatusColor(selectedSession.status)}>
                                            {selectedSession.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* Back Button */}
                                    <button 
                                        className="p-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            closeSessionDetails();
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    {/* Expand/Collapse Indicator */}
                                    <div className={`transform transition-transform duration-200 ${
                                        isExpanded ? 'rotate-180' : 'rotate-0'
                                    }`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    {/* Close Button */}
                                    <button 
                                        className="text-lg text-destructive font-bold ml-2 p-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClose();
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            
                            {/* Handle/Drag indicator */}
                            <div className="flex justify-center mt-2">
                                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="overflow-y-auto">
                                <Tabs defaultValue="overview" className="w-full">
                                    <div className="px-4 pt-2">
                                        <TabsList className="w-full">
                                            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                                            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <div className="p-4">
                                        <TabsContent value="overview" className="space-y-4 mt-0">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center mb-1">
                                                        <Zap className="h-4 w-4 mr-1 text-blue-500" />
                                                        <span className="text-sm font-medium">Energy</span>
                                                    </div>
                                                    <span className="text-lg font-bold">
                                                        {selectedSession.kwh > 0 ? `${selectedSession.kwh} kWh` : 'No energy transferred'}
                                                    </span>
                                                </div>
                                                
                                                {selectedSession.total_cost && selectedSession.total_cost > 0 && <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center mb-1">
                                                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                                                        <span className="text-sm font-medium">Cost</span>
                                                    </div>
                                                    <span className="text-lg font-bold">
                                                        ${selectedSession.total_cost.toFixed(2)} {selectedSession.currency}
                                                    </span>
                                                </div>}
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    Session Duration
                                                </h4>
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-sm text-muted-foreground">Total time</div>
                                                    <div className="text-lg font-bold">
                                                        {selectedSession.status === 'PENDING' || selectedSession.status === 'ACTIVE' ? formatDuration(selectedSession.start_date_time, selectedSession.last_updated) : formatDuration(selectedSession.start_date_time, selectedSession.end_date_time)}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    Location Details
                                                </h4>
                                                <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                                                    <div className="font-medium">{selectedSession.location.operator?.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {selectedSession.location.address}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {selectedSession.location.city}, {selectedSession.location.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="details" className="space-y-4 mt-0">
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-sm text-muted-foreground">Session ID</span>
                                                    <span className="text-sm font-mono">{selectedSession.id}</span>
                                                </div>
                                                
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-sm text-muted-foreground">Start Time</span>
                                                    <span className="text-sm">{formatDateTime(selectedSession.start_date_time)}</span>
                                                </div>
                                                
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-sm text-muted-foreground">End Time</span>
                                                    <span className="text-sm">{formatDateTime(selectedSession.end_date_time)}</span>
                                                </div>
                                                
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-sm text-muted-foreground">Status</span>
                                                    <Badge className={getStatusColor(selectedSession.status)}>
                                                        {selectedSession.status}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-sm text-muted-foreground">Last Updated</span>
                                                    <span className="text-sm">{formatDateTime(selectedSession.last_updated)}</span>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
        // </div>
    );
}