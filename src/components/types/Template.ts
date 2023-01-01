export interface Template <T> {
    imgSrc: string
    description: string
    clipboardText: Record<string, T>
}
