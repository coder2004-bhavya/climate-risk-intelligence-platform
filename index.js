import { z } from "zod";
export const envSchema = z.object({
    OPENWEATHER_API_KEY: z.string().min(1).optional(),
    ML_SERVICE_URL: z.string().url().optional(),
});
export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1).max(80).optional(),
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const authResponseSchema = z.object({
    token: z.string().min(1),
    user: z.object({
        id: z.string().min(1),
        email: z.string().email(),
        name: z.string().nullable().optional(),
    }),
});
export const predictRequestSchema = z.object({
    humidity: z.number().finite(),
    pressure_mb: z.number().finite(),
    wind_kph: z.number().finite(),
    cloud: z.number().finite(),
    visibility_km: z.number().finite(),
    uv_index: z.number().finite(),
    city: z.string().min(1).max(80).optional(),
});
export const predictResponseSchema = z.object({
    prediction: z.string(),
    insights: z.array(z.object({
        category: z.string(),
        message: z.string(),
        type: z.enum(["success", "warning", "error"]),
    })),
});
export const weatherQuerySchema = z.object({
    city: z.string().min(1).max(80),
    units: z.enum(["standard", "metric", "imperial"]).optional(),
});
export const weatherResponseSchema = z.object({
    city: z.string(),
    country: z.string().optional(),
    temp: z.number().nullable(),
    humidity: z.number().nullable(),
    pressure_mb: z.number().nullable(),
    wind_kph: z.number().nullable(),
    cloud: z.number().nullable(),
    visibility_km: z.number().nullable(),
    description: z.string().nullable(),
    raw: z.unknown(),
});
export const savedCitySchema = z.object({
    id: z.string(),
    city: z.string(),
    createdAt: z.string(),
});
export const predictionHistoryItemSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    city: z.string().nullable(),
    input: predictRequestSchema.omit({ city: true }),
    prediction: z.string(),
});
export const apiErrorSchema = z.object({
    error: z.string(),
    details: z.unknown().optional(),
});
//# sourceMappingURL=index.js.map