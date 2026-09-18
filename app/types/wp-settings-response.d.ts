export type WpSettingsResponse = {
    title?: string
    description?: string
    backendUrl?: string
    frontendUrl?: string
    themeScreenshotUrl?: string
    // Installed fuxt-api plugin version, used to feature-detect optional fields (fuxt-api >= 0.1.5)
    fuxtApiVersion?: string
}
