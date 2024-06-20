import React from "react";
import TranscriptPage from "../../ui/pages/TranscriptPage";
import InsightsPage from "../../ui/pages/InsightsPage";
import ConversationPage from "../../ui/pages/ConversationPage";

export const UNAUTHENTICATED_ROUTES = {
    LOGIN: {
        path: "/",
        default: true,
        component: <TranscriptPage />,
        isAuthenticated: false,
        excludeFromSidebar: true
    },
    INSIGHTS: {
        path: "/topic-discovery-insights",
        default: true,
        component: <InsightsPage />,
        isAuthenticated: false,
        excludeFromSidebar: true
    },
    CONVERSATION: {
        path: "/topic-discovery-conversations",
        default: true,
        component: <ConversationPage />,
        isAuthenticated: false,
        excludeFromSidebar: true
    }
    
};

export const AUTHENTICATED_ROUTES = {};

export default {
    ...UNAUTHENTICATED_ROUTES,
    ...AUTHENTICATED_ROUTES
};
