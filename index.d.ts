import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    OPENWEATHER_API_KEY: z.ZodOptional<z.ZodString>;
    ML_SERVICE_URL: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginRequest = z.infer<typeof loginSchema>;
export declare const authResponseSchema: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export declare const predictRequestSchema: z.ZodObject<{
    humidity: z.ZodNumber;
    pressure_mb: z.ZodNumber;
    wind_kph: z.ZodNumber;
    cloud: z.ZodNumber;
    visibility_km: z.ZodNumber;
    uv_index: z.ZodNumber;
    city: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type PredictRequest = z.infer<typeof predictRequestSchema>;
export declare const predictResponseSchema: z.ZodObject<{
    prediction: z.ZodString;
    insights: z.ZodArray<z.ZodObject<{
        category: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<{
            error: "error";
            success: "success";
            warning: "warning";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PredictResponse = z.infer<typeof predictResponseSchema>;
export declare const weatherQuerySchema: z.ZodObject<{
    city: z.ZodString;
    units: z.ZodOptional<z.ZodEnum<{
        standard: "standard";
        metric: "metric";
        imperial: "imperial";
    }>>;
}, z.core.$strip>;
export type WeatherQuery = z.infer<typeof weatherQuerySchema>;
export declare const weatherResponseSchema: z.ZodObject<{
    city: z.ZodString;
    country: z.ZodOptional<z.ZodString>;
    temp: z.ZodNullable<z.ZodNumber>;
    humidity: z.ZodNullable<z.ZodNumber>;
    pressure_mb: z.ZodNullable<z.ZodNumber>;
    wind_kph: z.ZodNullable<z.ZodNumber>;
    cloud: z.ZodNullable<z.ZodNumber>;
    visibility_km: z.ZodNullable<z.ZodNumber>;
    description: z.ZodNullable<z.ZodString>;
    raw: z.ZodUnknown;
}, z.core.$strip>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
export declare const savedCitySchema: z.ZodObject<{
    id: z.ZodString;
    city: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type SavedCity = z.infer<typeof savedCitySchema>;
export declare const predictionHistoryItemSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    city: z.ZodNullable<z.ZodString>;
    input: z.ZodObject<{
        humidity: z.ZodNumber;
        pressure_mb: z.ZodNumber;
        wind_kph: z.ZodNumber;
        cloud: z.ZodNumber;
        visibility_km: z.ZodNumber;
        uv_index: z.ZodNumber;
    }, z.core.$strip>;
    prediction: z.ZodString;
}, z.core.$strip>;
export type PredictionHistoryItem = z.infer<typeof predictionHistoryItemSchema>;
export declare const apiErrorSchema: z.ZodObject<{
    error: z.ZodString;
    details: z.ZodOptional<z.ZodUnknown>;
}, z.core.$strip>;
export type ApiError = z.infer<typeof apiErrorSchema>;
//# sourceMappingURL=index.d.ts.map