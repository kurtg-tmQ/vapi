import React from "react";
import TranscriptPage from "../../ui/pages/TranscriptPage";
import InsightsPage from "../../ui/pages/InsightsPage";
import ConversationPage from "../../ui/pages/ConversationPage";
import Login from "../../ui/pages/Login";
import DiscoveryPage from "../../ui/pages/DiscoveryPage";

export const UNAUTHENTICATED_ROUTES = {
    LOGIN: {
        path: "/login",
        default: true,
        component: <Login />,
        isAuthenticated: false,
        excludeFromSidebar: true
    }
};

export const AUTHENTICATED_ROUTES = {
    HOME: {
        path: "/transcript",
        component: <TranscriptPage />,
        isAuthenticated: true,
        excludeFromSidebar: true
    },
    INSIGHTS: {
        path: "/topic-discovery-insights",
        component: <InsightsPage />,
        isAuthenticated: true,
        excludeFromSidebar: true
    },
    CONVERSATION: {
        path: "/topic-discovery-conversations",
        component: <ConversationPage />,
        isAuthenticated: true,
        excludeFromSidebar: true
    },
    DISCOVERY: {
        path: "/topic-discovery",
        component: <DiscoveryPage />,
        isAuthenticated: true,
        excludeFromSidebar: true
    }
};

export default {
    ...UNAUTHENTICATED_ROUTES,
    ...AUTHENTICATED_ROUTES
};
