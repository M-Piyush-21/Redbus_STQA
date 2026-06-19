/** Local sample data — no live API or MongoDB required when USE_SAMPLE_DATA is enabled. */

export const LOCAL_IMG = "/local/placeholder.svg";

const ROUTE_LUCKNOW_DELHI = {
  _id: "sample-route-lucknow-delhi",
  departureLocation: {
    name: "Lucknow",
    subLocations: ["Charbagh", "Alambagh", "Gomti Nagar"],
  },
  arrivalLocation: {
    name: "Delhi",
    subLocations: ["Kashmere Gate", "Anand Vihar", "Sarai Kale Khan"],
  },
  duration: 8,
};

const ROUTE_LUCKNOW_ALLAHABAD = {
  _id: "sample-route-lucknow-allahabad",
  departureLocation: {
    name: "Lucknow",
    subLocations: ["Charbagh"],
  },
  arrivalLocation: {
    name: "Allahabad",
    subLocations: ["Civil Lines"],
  },
  duration: 5,
};

const ROUTE_LUCKNOW_FAIZABAD = {
  _id: "sample-route-lucknow-faizabad",
  departureLocation: { name: "Lucknow", subLocations: ["Charbagh"] },
  arrivalLocation: { name: "Faizabad", subLocations: ["Station Road"] },
  duration: 2,
};

const SAMPLE_BUSES = [
  {
    _id: "sample-bus-1",
    operatorName: "UPSRTC Express",
    busType: 1,
    departureTime: 6,
    rating: [5, 12, 18, 25, 30],
    liveTracking: 1,
    reschedulable: 1,
    routes: ROUTE_LUCKNOW_DELHI._id,
  },
  {
    _id: "sample-bus-2",
    operatorName: "Rajdhani Travels",
    busType: 3,
    departureTime: 14,
    rating: [8, 15, 20, 22, 28],
    liveTracking: 1,
    reschedulable: 0,
    routes: ROUTE_LUCKNOW_DELHI._id,
  },
  {
    _id: "sample-bus-3",
    operatorName: "Royal Cruiser",
    busType: 2,
    departureTime: 22,
    rating: [10, 14, 16, 18, 20],
    liveTracking: 0,
    reschedulable: 1,
    routes: ROUTE_LUCKNOW_DELHI._id,
  },
];

const SAMPLE_BUSES_ALLAHABAD = [
  {
    _id: "sample-bus-4",
    operatorName: "Prayagraj Express",
    busType: 1,
    departureTime: 8,
    rating: [6, 10, 14, 18, 22],
    liveTracking: 1,
    reschedulable: 1,
    routes: ROUTE_LUCKNOW_ALLAHABAD._id,
  },
  {
    _id: "sample-bus-5",
    operatorName: "Ganga Travels",
    busType: 3,
    departureTime: 16,
    rating: [4, 8, 12, 16, 20],
    liveTracking: 1,
    reschedulable: 0,
    routes: ROUTE_LUCKNOW_ALLAHABAD._id,
  },
];

export const sampleRoutes = [
  ROUTE_LUCKNOW_DELHI,
  ROUTE_LUCKNOW_ALLAHABAD,
  ROUTE_LUCKNOW_FAIZABAD,
];

export const sampleBusServices = [
  {
    _id: "sample-hire-1",
    vehicle: "Tempo Traveller 12 Seater",
    img: LOCAL_IMG,
    total: 8500,
    price: 4913,
    available: true,
    seater: 12,
    music: true,
    charging: true,
  },
  {
    _id: "sample-hire-2",
    vehicle: "Mini Bus 20 Seater",
    img: LOCAL_IMG,
    total: 12000,
    price: 6500,
    available: true,
    seater: 20,
    music: true,
    charging: true,
  },
  {
    _id: "sample-hire-3",
    vehicle: "SUV Innova Crysta",
    img: LOCAL_IMG,
    total: 6000,
    price: 4200,
    available: true,
    seater: 7,
    music: true,
    charging: true,
  },
];

export const demoCustomer = {
  _id: "sample-customer-1",
  name: "Demo User",
  email: "demo@redbus.test",
  googleId: "demo-google-id",
  profilePicture: LOCAL_IMG,
  gender: "Male",
};

function normalizePath(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\/[^/]+/, "").split("?")[0].replace(/\/$/, "") || "/";
}

export function getSampleResponse(url, method = "GET", data) {
  const path = normalizePath(url);
  const m = method.toUpperCase();

  if (m === "GET" && path === "/v1/api/routes") {
    return sampleRoutes;
  }

  const routeMatch = path.match(/^\/v1\/api\/routes\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (m === "GET" && routeMatch) {
    const [, dep, arr] = routeMatch;
    const key = `${dep.toLowerCase()}/${arr.toLowerCase()}`;
    if (key === "lucknow/delhi") {
      return {
        route: ROUTE_LUCKNOW_DELHI,
        matchedBuses: SAMPLE_BUSES,
        busIdWithSeatsObj: {
          "sample-bus-1": [],
          "sample-bus-2": ["A1", "B2"],
          "sample-bus-3": [],
        },
      };
    }
    if (key === "lucknow/allahabad") {
      return {
        route: ROUTE_LUCKNOW_ALLAHABAD,
        matchedBuses: SAMPLE_BUSES_ALLAHABAD,
        busIdWithSeatsObj: {
          "sample-bus-4": [],
          "sample-bus-5": ["C1"],
        },
      };
    }
    if (key === "lucknow/faizabad") {
      return {
        route: ROUTE_LUCKNOW_FAIZABAD,
        matchedBuses: [SAMPLE_BUSES[0]],
        busIdWithSeatsObj: { "sample-bus-1": [] },
      };
    }
    return { route: null, matchedBuses: [], busIdWithSeatsObj: {} };
  }

  if (m === "GET" && path === "/v1/api/busservice") {
    return { data: sampleBusServices };
  }

  const hireMatch = path.match(/^\/v1\/api\/busservice\/([^/]+)$/);
  if (m === "GET" && hireMatch) {
    const bus = sampleBusServices.find((b) => b._id === hireMatch[1]);
    return bus || null;
  }

  if (m === "GET" && path.startsWith("/v1/api/bookingHire/")) {
    return [];
  }

  const bookingMatch = path.match(/^\/v1\/api\/booking\/([^/]+)$/);
  if (m === "GET" && bookingMatch) {
    return [];
  }

  if (m === "POST" && path === "/v1/api/customers") {
    return { ...demoCustomer, ...(typeof data === "object" ? data : {}) };
  }

  if (m === "POST" && path === "/v1/api/bookingHire") {
    return {
      _id: "sample-hire-booking-1",
      ...(typeof data === "object" ? data : {}),
    };
  }

  if (m === "POST" && path === "/v1/api/booking") {
    return { _id: "sample-booking-1", ...(typeof data === "object" ? data : {}) };
  }

  return null;
}
