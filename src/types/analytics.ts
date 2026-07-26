export type AnalyticsEventData = {
    page_view: {
        path: string;
        title: string;
    };

    button_click: {
        buttonId: string;
        section?: string;
        action?: string;
    };

    theme_toggle: {
        from: 'light' | 'dark';
        to: 'light' | 'dark';
        location?: string;
    };

    project_click: {
        projectId: string;
        projectTitle: string;
        action:
            'view_details' | 'visit_website' | 'visit_github' | 'play_video';
        location?: string;
    };

    form_submit: {
        formId: string;
        success: boolean;
    };

    form_error: {
        formId: string;
        errorType: string;
        field?: string;
    };

    content_view: {
        contentId: string;
        contentType: 'blog' | 'project' | 'experience';
        section: string;
    };

    chat_message_sent: {
        message: string;
        sender: 'user' | 'assistant';
    };

    external_link_click: {
        url: string;
        text: string;
        location: string;
    };
};

// Union of all valid event names
export type AnalyticsEventName = keyof AnalyticsEventData;

export type AnalyticsEvent = {
    [Name in AnalyticsEventName]: {
        name: Name;
        data: AnalyticsEventData[Name];
    };
}[AnalyticsEventName];
