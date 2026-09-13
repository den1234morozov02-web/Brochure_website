import type { APIRoute } from "astro";
import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import { islands } from "../../lib/tina/islands";

// Единственный серверный маршрут: нужен только редактору Tina, посетители его не видят.
export const prerender = false;

export const ALL: APIRoute = experimental_createIslandRoute(islands);
