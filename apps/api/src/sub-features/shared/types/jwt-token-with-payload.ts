/**
 * Plain string which represents JWT token with payload of particular type.
 * Makes no sense in terms of type guarding, is used only to make types more self-expressive.
 */
export type JwtTokenWithPayload<Payload> = string;
