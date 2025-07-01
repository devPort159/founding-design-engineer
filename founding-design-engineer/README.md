# Curo EV Charging Platform - Design Engineer Interview

Welcome! This is a Next.js application for the Curo EV charging platform. This codebase serves as the foundation for design engineer interview exercises, where you'll be asked to identify issues, implement improvements, and demonstrate your technical and design skills.

## 🚗 What is Curo?

Curo is an EV charging platform that helps electric vehicle drivers find, access, and manage charging sessions at various charging stations. The application provides real-time information about charger availability, different charging speeds, and session management.

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Radix UI primitives with custom styling
- **Maps**: Google Maps API with Advanced Markers
- **Real-time**: Server-Sent Events (SSE) for live updates
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Maps API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd founding-design-engineer
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 Application Flow

### 1. **Activation Screen** (`/`)
- Users enter an activation code to access the platform
- **Demo Mode**: Any passcode works (this is intentional for the demo)
- Includes accessibility features and responsive design

### 2. **Discover Screen** (`/discover`)
- **Interactive Map**: Shows EV charging locations with Google Maps
- **Pin Types**: 
  - 🟢 **Green**: Available fast chargers
  - 🔵 **Blue**: Currently charging  
  - 🟠 **Orange**: Occupied chargers
  - ⚫ **Gray**: Unknown status or slow chargers
- **Grouping**: Multiple chargers at the same location are grouped
- **Real-time Updates**: Live status updates via Server-Sent Events

### 3. **Location Details**
- **Bottom Sheet UI**: Swipeable panel showing location information
- **Tabs**: Overview, individual chargers, and charging history
- **Charger Selection**: Choose specific EVSE units for charging
- **Session Management**: Start and monitor charging sessions

## 🏗 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── discover/                 # Main map and discovery features
│   │   ├── page.tsx             # Main discover page component
│   │   └── ChargersMap.tsx      # Google Maps integration
│   ├── home/                    # Activation/home page
│   │   ├── page.tsx            # Route handler
│   │   └── Home.tsx            # Home page component
│   ├── history/                 # Charging session history
│   ├── scan/                    # QR code scanning
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles and design tokens
│   └── page.tsx                # Root page redirect
├── components/
│   ├── ui/                     # Radix UI component library
│   └── GoogleMapsLoader.ts     # Maps API utility
├── hooks/
│   └── use-mobile.tsx          # Mobile detection hook
└── lib/
    └── utils.ts                # Utility functions
```

## 🎨 Design System

### Color Palette
The application uses a custom color palette defined in `globals.css`:

- **Primary**: `#181e2c` (Curo Deep Blue)
- **Accent**: `#e1fe8d` (Curo Green)  
- **Background**: `#fefdfb` (Curo Tan)
- **Text**: `#181e2c` (Curo Font)

### Typography
- **Headings**: Clash Grotesk (custom font)
- **Body**: Public Sans
- **Responsive**: Scales from mobile to desktop

### Components
- Built on Radix UI primitives
- Custom styled with Tailwind CSS
- Consistent spacing and interaction patterns
- Full dark mode support (toggle available)

## 🗺 Map Features

### Advanced Markers
- **Custom SVG pins** with dynamic colors based on charger status
- **Grouped locations** show aggregated charger counts
- **Individual chargers** display when zoomed in or selected
- **User location** with accuracy circle

### Charger Status Colors
```typescript
const statusColors = {
  available: '#4FE115',    // Green
  charging: '#2196F3',     // Blue  
  occupied: '#FF9800',     // Orange
  faulted: '#F44336',      // Red
  unknown: '#9E9E9E'       // Gray
}
```

### Pin Types
- **Location Pins**: Circular pins with charger count
- **EVSE Pins**: Square pins for individual chargers
- **Grouped Pins**: Larger pins representing multiple locations

## 🔌 Charging Session Flow

1. **Select Location**: Tap a pin on the map
2. **View Details**: Bottom sheet opens with location info
3. **Choose Charger**: Switch to "Chargers" tab, select specific EVSE
4. **Start Session**: Tap "Start Session" button
5. **Monitor Progress**: Real-time updates via SSE (in production)

## 📊 Demo Mode Features

**Important**: This application runs in demo mode with mock data:

- ✅ **Simulated API responses** with realistic delays
- ✅ **Sample charging locations** in San Francisco
- ✅ **Mock charging session data**
- ✅ **Fake real-time updates** 
- ❌ **No actual API calls** to real charging networks
- ❌ **No real payment processing**

## 🧪 For Interview Candidates

### What You Might Be Asked To Do

1. **🐛 Bug Identification**: Find and fix issues in the codebase
2. **🎨 UI/UX Improvements**: Enhance the user experience
3. **♿ Accessibility**: Improve accessibility compliance
4. **📱 Responsive Design**: Fix mobile/desktop layout issues  
5. **⚡ Performance**: Optimize rendering and API calls
6. **🛡 TypeScript**: Add proper type definitions
7. **🧹 Code Quality**: Refactor and clean up code

### Key Areas to Explore

- **Map Integration**: `src/app/discover/ChargersMap.tsx`
- **Main Application Logic**: `src/app/discover/page.tsx`
- **Design System**: `src/app/globals.css`
- **UI Components**: `src/components/ui/`
- **State Management**: React hooks and state in discover page

### Common Issues to Look For

- Console logs in production code
- Missing TypeScript types (`any` usage)
- Accessibility issues (missing ARIA labels, focus management)
- Performance problems (unnecessary re-renders, missing memoization)
- Error handling gaps
- Responsive design breaks
- Inconsistent spacing/styling

## 🛡 TypeScript Notes

**Current State**: The codebase uses `any` types extensively, which is intentional for the interview exercise. In a production application, you would want proper type definitions for:

```typescript
// Example of what proper types might look like
interface ChargingLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  evse: EVSE[];
}

interface EVSE {
  uid: string;
  status: 'AVAILABLE' | 'CHARGING' | 'OCCUPIED' | 'FAULTED' | 'UNKNOWN';
  connectors: Connector[];
  physical_reference: string;
}
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server  
npm run lint         # Run ESLint
```

## 🎯 Success Criteria

During the interview, you'll be evaluated on:

- **Problem-solving approach**: How you identify and tackle issues
- **Code quality**: Clean, readable, maintainable solutions
- **User experience thinking**: Considering end-user needs
- **Technical skills**: React, TypeScript, CSS, accessibility
- **Communication**: Explaining your thought process
- **Attention to detail**: Catching subtle issues

## 📞 Need Help?

During the interview, feel free to:
- ✅ Ask questions about requirements or expected behavior
- ✅ Explain your thought process out loud
- ✅ Look up documentation (this is encouraged!)
- ✅ Take time to understand the codebase before diving in

---

**Good luck! We're excited to see how you approach improving this codebase.** 🚀
